import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my-secret-key', // 🔑 Cámbialo en producción
    });
  }

  async validate(payload: any): Promise<User> {
    console.log("JwtStrategy:validate",payload);
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user; // Devuelve el usuario completo
  }

  /*   Error de perdida de objeto user, solo entregaba id y email y no la entidad
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
    */
}
