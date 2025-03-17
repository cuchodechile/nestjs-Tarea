import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'lolo@eldominio.com', description: 'Email de usuario' })
  email: string;

  @ApiProperty({ example: '1234567', description: 'Clave' })
  password: string;
}
