import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}
    
      async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
      }
    
      async createUser(email: string, password: string): Promise<User> {
        const user = new User();
        user.email = email;
        user.password = password;
        await user.hashPassword();
        return this.usersRepository.save(user);
      }

      async findOneById(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
      }
}
