import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import Conducteur from './conducteur.entity';
import ConsommationCarburant from './consommation_carburant.entity';
import VehiculeAttachement from './vehiculeAttch.entity';
import DemandeInterventionSysteme from './di_system.entity';
import DemandeInterventionsPersonnele from './di_personnele.entity';
import CarteGrise from './carte_grise.entity';
import Vignette from './vignette.entity';
import Assurance from './assurance.entity';
import VehiculeIT from './vehiculeIT.entity';
import Maintenance from './plan_maintenance.entity';
import PlanMaintenance from './plan_maintenance.entity';

@Entity({ name: 'vehicules' })
@Unique(['vehicule_id'])
class Vehicule {
  @PrimaryColumn()
  public vehicule_id: string;

  @Column()
  public immatriculation: string;

  @Column()
  public num_chassis: string;

  @Column()
  public status: string;

  @ManyToMany(() => Conducteur, (conducteur) => conducteur.vehicules, {
    cascade: true,
  })
  @JoinTable({
    name: 'CVA',
    joinColumn: {
      name: 'vehicule',
      referencedColumnName: 'vehicule_id',
    },
    inverseJoinColumn: {
      name: 'conducteur',
      referencedColumnName: 'conducteur_id',
    },
  })
  public conducteurs: Conducteur[];

  @Column()
  public type: string;

  @Column()
  public service: string;

  @Column()
  public benne: boolean;

  @OneToMany(() => ConsommationCarburant, (cc) => cc.vehicule)
  public ccs: ConsommationCarburant[];

  @OneToMany(() => VehiculeAttachement, (attachement) => attachement.vehicule, {
    cascade: true,
    eager: true,
  })
  public attachements: VehiculeAttachement[];

  @OneToMany(() => DemandeInterventionSysteme, (dis) => dis.vehicule, {
    eager: true,
  })
  public dis: DemandeInterventionSysteme[];

  @OneToMany(() => DemandeInterventionsPersonnele, (disp) => disp.vehicule, {
    cascade: true,
    eager: true,
  })
  public disp: DemandeInterventionsPersonnele[];

  @OneToOne(() => CarteGrise, (carte_grise) => carte_grise.vehicule, {
    eager: true,
  })
  carte_grise: CarteGrise;

  @OneToOne(() => Vignette, (vignette) => vignette.vehicule, { eager: true })
  vignette: Vignette;

  @OneToOne(() => Assurance, (assurance) => assurance.vehicule, { eager: true })
  assurance: Assurance;

  @OneToOne(() => VehiculeIT, (vehicule_it) => vehicule_it.vehicule, {
    eager: true,
  })
  vehicule_it: VehiculeIT;

  @OneToMany(() => PlanMaintenance, plan_maintenance => plan_maintenance.vehicule,{eager:true})
  public maintenances: PlanMaintenance[];
}

export default Vehicule;
