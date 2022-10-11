import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfigModule } from './config/config.module';
import { typeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [GlobalConfigModule], //TypeOrmModule.forRootAsync(typeOrmConfigAsync)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
