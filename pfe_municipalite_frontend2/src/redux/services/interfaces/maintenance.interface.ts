export interface CreatePlanDto {
    pm_id: string;
    type: string;
    concerned_equipement: string;
    mots_cle: string;
    assigned_to: string;
    nbr_repetition: number;
    periodicite: string;
}

export interface CreateReminderDto {
    pm_id: string;
    re_id: string;
    start_date: Date;
    finish_date: Date;
    importance: string;
    declarable: boolean;
}