import { Controller, Post, Body, Get, Param  } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
      return this.usersService.createUser(body.email, body.password);
    }
    
    @Get(':email')
    async getUser(@Param('email') email: string) {
      return this.usersService.findOneByEmail(email);
    }
}
