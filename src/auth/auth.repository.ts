import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { hashPassword } from 'src/utils/bcrypt_util';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async register(params: AuthDto) {
    try {
      const result = await this.prismaService.accounts.create({
        data: {
          email: params.email,
          password: params.password,
          customer_id: params.customer_id,
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const result = await this.prismaService.accounts.findUnique({
        where: {
          email: email,
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }

  async login(params: LoginDto) {
    try {
      const result = await this.prismaService.accounts.findUnique({
        where: {
          email: params.email,
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }
}
