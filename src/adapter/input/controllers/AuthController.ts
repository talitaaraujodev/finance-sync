import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthServiceInputPort } from '../../../application/input/AuthServiceInputPort';
import { OutputAuthUserDto } from 'src/application/dto/OutputAuthUserDto';

@Controller('api/login')
export class AuthController {
  constructor(
    @Inject('AuthServiceInputPort')
    private readonly authServiceInputPort: AuthServiceInputPort,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<OutputAuthUserDto | HttpException> {
    return await this.authServiceInputPort.login(body.email, body.password);
  }
}
