import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import DemandeInterventionsPersonnele from "./di_personnele.entity";

@Entity({name: 'interventions_attachements'})
class InterventionAttachement {
    @PrimaryColumn()
    public ia_id: string;

    @Column()
    public file_name: string;
    
    @CreateDateColumn()
    public creer_le: Date;

    @UpdateDateColumn()
    public maj_le: Date;

    @Column()
    public type: string;

    @ManyToOne(() => DemandeInterventionsPersonnele, (d_intervention) => d_intervention.d_intervention_attachements)
    @JoinColumn({name: "di_id"})
    demande_intervention: DemandeInterventionsPersonnele;
}

export default InterventionAttachement;