import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBonTravailDto } from '../../utils/dtos/bon_travail.dto';
import { Repository } from 'typeorm';
import BonTravail from '../../models/bon_travail.entity';
import Mecancien from '../../models/mecancien.entity';
import DemandeInterventionsPersonnele from '../../models/di_personnele.entity';
import { BonTravailPageOptionsDto } from '../../utils/interfaces/Pagination/bt_page.options.dto';
import { BonTravailPageDto } from '../../utils/interfaces/Pagination/bt_page.dto';
import { BonTravailPageMetaDto } from '../../utils/interfaces/Pagination/bt_page.meta.dto';

@Injectable()
export class BonTravailService {

    constructor(
        @InjectRepository(BonTravail)
        private bon_travailRepository: Repository<BonTravail>,
        @InjectRepository(Mecancien)
        private mecanicienRepository: Repository<Mecancien>,
        @InjectRepository(DemandeInterventionsPersonnele)
        private di_personneleRepository: Repository<DemandeInterventionsPersonnele>
        ){}
    
    async getBonsTravail(bt_pageOptionsDto: BonTravailPageOptionsDto): Promise<BonTravailPageDto<BonTravail>> {
        const queryBuilder = this.bon_travailRepository.createQueryBuilder("bon_travail");
        queryBuilder
        .leftJoinAndSelect("bon_travail.ouvries","ouvries")
        .leftJoinAndSelect("bon_travail.demandes","demandes")
        .leftJoinAndSelect("bon_travail.rapport_intervention","rapport_intervention")
        .orderBy("bon_travail.date", bt_pageOptionsDto.order)
        .take(bt_pageOptionsDto.take)
        
        if(bt_pageOptionsDto.status.length !== 0) {
            queryBuilder.andWhere("bon_travail.status = :status",{status: bt_pageOptionsDto.status});
        }

    if (bt_pageOptionsDto.status.length !== 0) {
      queryBuilder.andWhere('bon_travail.status = :status', {
        status: bt_pageOptionsDto.status,
      });
    }

    if (bt_pageOptionsDto.vehicule_id.length !== 0) {
      queryBuilder.andWhere('bon_travail.equipement = :equipement', {
        equipement: bt_pageOptionsDto.vehicule_id,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const btPageMetaDto = new BonTravailPageMetaDto({
      itemCount,
      bt_pageOptionsDto,
    });
    return new BonTravailPageDto(entities, btPageMetaDto);
  }

  async getBonTravailById(bt_id: string): Promise<BonTravail> {
    const bn_check = await this.bon_travailRepository.findOne({ bt_id: bt_id });

    if (!bn_check) {
      throw new HttpException(
        `Bon de Travail avec l'id : ${bt_id} n'existe pas `,
        HttpStatus.NOT_FOUND,
      );
    }

    return bn_check;
  }

  async CreateBonTravail(bon_travail: CreateBonTravailDto) {
    const bon_travail_check = await this.bon_travailRepository.findOne({
      bt_id: bon_travail.bt_id,
    });
    if (bon_travail_check) {
      throw new HttpException(
        `Bon de Travail avec l'id : ${bon_travail.bt_id} existe déja `,
        HttpStatus.FOUND,
      );
    }
    bon_travail.ouvriers.forEach((mecanicien, index) => {
      if (mecanicien.mecancien_id.length === 0) {
        bon_travail.ouvriers.splice(index, 1);
      }
    });
    const new_bon_travail = await this.bon_travailRepository.save(
      this.bon_travailRepository.create(bon_travail),
    );
    const mecaniciens = await this.mecanicienRepository.findByIds(
      bon_travail.ouvriers,
      { relations: ['bn_travails'] },
    );
    for (const mecanicien of mecaniciens) {
      mecanicien.bn_travails.push(new_bon_travail);
    }
    await this.mecanicienRepository.save(mecaniciens);

    return new_bon_travail;
  }
}
