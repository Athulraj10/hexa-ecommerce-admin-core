import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { GeneralSettings } from './entities/generalSettings.entity';
import * as crypto from 'crypto';
(global as any).crypto = crypto;

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          'Database Config:',
          configService.get<string>('DB_HOST'),
          configService.get<string>('DB_PORT'),
          configService.get<string>('DB_USERNAME'),
          configService.get<string>('DB_PASSWORD'),
          configService.get<string>('DB_NAME'),
        );

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [GeneralSettings],
          // migrations: ["src/database/migrations/*.ts"],
          migrations: [__dirname + '/migrations/*.{js}'],
        };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
