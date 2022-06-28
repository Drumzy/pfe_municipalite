import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { VehiculesModule } from './modules/vehicules/vehicules.module';
import { AssurancesModule } from './modules/assurances/assurances.module';
import { VehiculesItsModule } from './modules/vehicules_its/vehicules_its.module';
import { CartesGriseModule } from './modules/cartes_grise/cartes_grise.module';
import { VignettesModule } from './modules/vignettes/vignettes.module';
import { GestionnaireParcModule } from './modules/gestionnaire_parc/gestionnaire_parc.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeeRolesModule } from './modules/employee_roles/employee_roles.module';
import { VehiculeAttachementsModule } from './modules/vehicule_attachements/vehicule_attachements.module';
import {ServeStaticModule} from "@nestjs/serve-static"
import { InterventionPersonneleModule } from './modules/intervention_personnele/intervention_personnele.module';
import { MecanicienModule } from './modules/mecanicien/mecanicien.module';
import { BonTravailModule } from './modules/bon_travail/bon_travail.module';
import { RapportInterventionModule } from './modules/rapport_intervention/rapport_intervention.module';
import { PlanMaintenanceModule } from './modules/plan_maintenance/plan_maintenance.module';
import { RemindersModule } from './modules/reminders/reminders.module';
import { ConducteurModule } from './modules/conducteur/conducteur.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        VEHICULES_ATTACHEMENTS_DESTINATION: Joi.string().required()
      })
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/files_api/v1/vehicule/attachements",
      rootPath: process.env.VEHICULES_ATTACHEMENTS_DESTINATION,
      exclude: ['/api/*'],
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/files_api/v1/probelems_attachements",
      rootPath: process.env.PROBLEMS_ATTACHEMETNS_DESTINATION,
      exclude: ['/api/*'],
    }),
    DatabaseModule,
    VehiculesModule,
    AssurancesModule,
    VehiculesItsModule,
    CartesGriseModule,
    VignettesModule,
    GestionnaireParcModule,
    MecanicienModule,
    AuthModule,
    EmployeeRolesModule,
    VehiculeAttachementsModule,
    InterventionPersonneleModule,
    BonTravailModule,
    RapportInterventionModule,
    PlanMaintenanceModule,
    RemindersModule,
    ConducteurModule,
    StatisticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
