export interface CreateReminderDto {
    re_id: string;
    start_date: Date;
    finish_date: Date;
    importance: string;
    declarable: boolean;
    pm_id: string;
}