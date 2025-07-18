import { Module } from '@nestjs/common';
import { FavoritosController } from './favoritos.controller';
import { FavoritosService } from './favoritos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FavoritosController],
  providers: [FavoritosService],
  exports: [FavoritosService],
})
export class FavoritosModule {}
