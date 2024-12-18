import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import { CustomerService } from 'src/customer/customer.service';
import { comparePassword, hashPassword } from 'src/utils/bcrypt_util';
import { AuthDto } from './dto/auth.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/types';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    //1. Check email has been registered
    const user = await this.authRepository.findUserByEmail(registerDto.email);
    if (user) {
      throw new Error('Email already registered');
    }

    //2. Create user
    const customerDto: CreateCustomerDto = {
      name: registerDto.name,
      phone: registerDto.phone,
    };
    const customer = await this.customerService.create(customerDto);
    console.log(customer);
    if (!customer) {
      throw new Error('Fail to create customer');
    }

    //3. Create account
    registerDto.password = hashPassword(registerDto.password);
    const account: AuthDto = {
      email: registerDto.email,
      password: registerDto.password,
      customer_id: customer.id,
    };
    const result = await this.authRepository.register(account);
    if (!result) {
      throw new Error('Fail to create account');
    }
    const payload = {
      customer_id: result.customer_id,
      email: result.email,
    };

    delete result.password;
    const token = await this.getTokens(payload.customer_id, payload.email);
    return {
      result,
      ...token,
    };
  }

  async getTokens(customer_id: number, email: string): Promise<Tokens> {
    const at = await this.jwtService.signAsync(
      { sub: customer_id, email },
      { expiresIn: '7d', secret: process.env.AT_SECRET },
    );
    return {
      access_token: at,
    };
  }

  async login(loginDto: AuthDto) {
    const user = await this.authRepository.findUserByEmail(loginDto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const result = await this.authRepository.login(loginDto);
    if (!result) {
      throw new Error('Fail to login');
    }
    const isMatch = comparePassword(loginDto.password, result.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    const payload = {
      customer_id: result.customer_id,
      email: result.email,
    };
    delete result.password;
    const token = await this.getTokens(payload.customer_id, payload.email);
    return {
      ...result,
      ...token,
    };
  }
}
