import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])], //  Agregar aquí  -- para jwt rio add
  providers: [NotesService],
  controllers: [NotesController],
  exports: [NotesService], // Exportar si otro módulo necesita este servicio  -- add rio
})
export class NotesModule {}
