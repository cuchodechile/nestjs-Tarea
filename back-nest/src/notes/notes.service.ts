import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './notes.entity';
import { User } from '../users/user.entity';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);  

  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async create(title: string, content: string, user: User, userId: number ): Promise<Note> {
    this.logger.log(` Notes::Services Creando nota para usuario ID: ${user.id}`); 
    console.log("notes:serv id:", userId, " user ", user);

    const note = this.notesRepository.create({ title, content, user });
    return this.notesRepository.save(note);
   

   /* const note = new Note();
    note.title = title;
    note.content = content;
    note.user=user;

    //this.logger.log(` Notes::Services Nota nota ${note.id} ${note.title} ${note.created_at} para usuario ID: ${user.id}`); 

    */
    //return this.notesRepository.update(note.id, title, content, note.created_at , user );
  }

  async findAllByUser(userId: number): Promise<Note[]> {
    return this.notesRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number, userId: number): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!note) throw new NotFoundException('Nota no encontrada');
    return note;
  }

  async update(id: number, userId: number, title: string, content: string): Promise<Note> {
    const note = await this.findOne(id, userId);
    note.title = title;
    note.content = content;
    return this.notesRepository.save(note);
  }

  async remove(id: number, userId: number): Promise<void> {
    const note = await this.findOne(id, userId);
    await this.notesRepository.remove(note);
  }
}


