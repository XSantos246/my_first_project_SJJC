import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordOk = await bcrypt.compare(
      loginDto.password,
      foundUser.password,
    );
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}