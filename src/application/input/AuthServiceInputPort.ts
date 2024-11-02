import { HttpException } from '@nestjs/common';
import { OutputAuthUserDto } from '../dto/OutputAuthUserDto';

export interface AuthServiceInputPort {
  login(
    email: string,
    password: string,
  ): Promise<OutputAuthUserDto | HttpException>;
}
