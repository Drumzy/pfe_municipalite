import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateReminderDto } from '../../utils/dtos/reminder.dto';
import { RemindersService } from './reminders.service';

@Controller('reminders')
export class RemindersController {

    constructor(private readonly reminderSerivce: RemindersService){}

    @Get('/all')
    async GetAllReminders(){
        return this.reminderSerivce.getAllRemidners();
    }

    @Post('/set_reminder')
    async SetReminder(@Body() reminderDto: CreateReminderDto){
        return this.reminderSerivce.SetReminder(reminderDto);
    }

    @Delete('/remove_reminder')
    async RemoveReminder(@Body() reminder_id:string){
        return this.reminderSerivce.DeleteRemidner(reminder_id);
    }
}
