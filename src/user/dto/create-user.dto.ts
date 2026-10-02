import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'nuevo@correo.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiPropertyOptional({ example: 'Santos' })
  name?: string;

  @ApiPropertyOptional({ example: '88888888' })
  telephone?: string;

  @ApiPropertyOptional({ example: 'USER' })
  role?: string;

  @ApiPropertyOptional({ example: 1 })
  tenantId?: number;
}