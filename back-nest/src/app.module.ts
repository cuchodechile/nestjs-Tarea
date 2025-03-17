import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// ejemplo rio de fue agregado con  nest generate module users
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';

//Entidades
import { User } from './users/user.entity';
import { Note } from './notes/notes.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule,  // UsersModules:agregado como ejemplo con nest generate module users

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postdb',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'notes_db',
      entities: [User, Note],
      autoLoadEntities: true,
      synchronize: true,
    }), 
    NotesModule, 
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
