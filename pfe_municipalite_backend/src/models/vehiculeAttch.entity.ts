import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Vehicule from './vehicule.entity';

@Entity({ name: 'vehicules_attchamenets' })
class VehiculeAttachement {
  @PrimaryColumn()
  public vha_id: string;

  @Column()
  public file_name: string;

  @CreateDateColumn()
  public creer_le: Date;

  @UpdateDateColumn()
  public maj_le: Date;

  @Column()
  public type: string;

  @Column()
  public categories: string;

  @ManyToOne(() => Vehicule, (vehicule) => vehicule.attachements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicule_id' })
  public  vehicule: Vehicule;
  
}

export default VehiculeAttachement;
