import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Logger  } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard/jwt-auth.guard';
//import { UsersService } from '../users/users.service';


@Controller('notes')
@UseGuards(JwtAuthGuard) //  Protege todas las rutas con JWT
export class NotesController {
  private readonly logger = new Logger(NotesController.name);  
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: { title: string; content: string }, @Request() req) {
    this.logger.log(` Creando nota para usuario ID: ${req.user.userId} mail ${req.user.email}`); 
    console.log("USER: ", req.user);
    console.log("title:", body.title, "content", body.content);
  
    return this.notesService.create(body.title, body.content, req.user, req.user.userId );
  }

  // Trae todas las notas del usuario
  @Get()
  findAll(@Request() req) {
    //console.log("Lista de notas:" , req);
    this.logger.log(` Listando todas las notas para usuario ID: ${req.user.id}`);

    return this.notesService.findAllByUser(req.user.id);
  }

  // trae una nota por id, si es del usuario
  @Get(':id')
  findOne(@Param('id') id: number, @Request() req) {
    this.logger.log(` Buscando nota ID: ${id} para usuario ID: ${req.user.id}`); 
    return this.notesService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { title: string; content: string }, @Request() req) {
    this.logger.log(` Actualizando nota ID: ${id} para usuario ID: ${req.user.id}`); 
    return this.notesService.update(id, req.user.id, body.title, body.content);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    this.logger.log(` Borrando nota ID: ${id} para usuario ID: ${req.user.id}`); 
    return this.notesService.remove(id, req.user.id);
  }
}
