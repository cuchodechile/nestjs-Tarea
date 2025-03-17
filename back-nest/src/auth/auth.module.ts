import { Module } from '@nestjs/common';

// -- dependencias para JWT
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';


@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: 'my-secret-key', // 🔑 Cámbialo en producción
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
})
export class AuthModule {}
