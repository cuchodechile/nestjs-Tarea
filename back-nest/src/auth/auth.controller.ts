import { Controller, Post, Body, Request, UseGuards, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard/jwt-auth.guard';
import { CreateUserDto } from './create-user.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);  

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto }) 
  async create(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.register(CreateUserDto.email, CreateUserDto.password);
  }
 /* async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }
*/
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    this.logger.log(` AUTH::LOGIN usuario email: ${body.email}`); 

    return this.authService.validateUser(body.email, body.password).then(user => {
      return this.authService.login(user);
    });
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
