import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReminderDto } from '../../utils/dtos/reminder.dto';
import { Repository } from 'typeorm';
import Reminder from '../../models/reminder.entity';
import PlanMaintenance from 'src/models/plan_maintenance.entity';

@Injectable()
export class RemindersService {

    constructor(
       @InjectRepository(Reminder)
       private reminderRepository: Repository<Reminder>,
       @InjectRepository(PlanMaintenance)
       private planRepository: Repository<PlanMaintenance>
    ){}

    async getAllRemidners () {
        const reminders: Array<Reminder> = await this.reminderRepository.find();

        return reminders;
    }

    async SetReminder(reminderDto: CreateReminderDto) {
        const pm_check = await this.planRepository.findOne({pm_id: reminderDto.pm_id});
        if(!pm_check){
            throw new HttpException(`Plan de maintenance avec id : ${reminderDto.pm_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }
        const payload = {
            re_id: reminderDto.re_id,
            start_date: reminderDto.start_date,
            finish_date: reminderDto.finish_date,
            importance: reminderDto.importance,
            declarable: reminderDto.declarable,
            maintenance: pm_check,
        }
        const reminder_insert = await this.reminderRepository.save(payload);

        if(!reminder_insert){
            throw new HttpException(`Erreur lors d'insertion d'un nouveau rappel`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {message: `Rappel avec id: ${reminderDto.re_id} a été ajouté`};
    }
    async DeleteRemidner (reminder_id: string){
        const reminder_check = await this.reminderRepository.findOne({re_id: reminder_id});
        if(!reminder_check){
            throw new HttpException(`Rappel avec id: ${reminder_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }

        const reminder_remove = await this.reminderRepository.remove(reminder_check);

        if(!reminder_remove){
            throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {message: `Rappel avec id: ${reminder_id} a été supprimé`};
    }
}
