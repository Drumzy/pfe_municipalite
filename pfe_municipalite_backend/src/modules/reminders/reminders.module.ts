import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlanMaintenance from '../../models/plan_maintenance.entity';
import Reminder from '../../models/reminder.entity';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder,PlanMaintenance])],
  controllers: [RemindersController],
  providers: [RemindersService]
})
export class RemindersModule {}
