import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserServiceInputPort } from '../../../application/input/UserServiceInputPort';
import { User } from 'src/application/domain/models/User';

@Controller('api/users')
export class UserController {
  constructor(
    @Inject('UserServiceInputPort')
    private readonly userServiceInputPort: UserServiceInputPort,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: User): Promise<User> {
    return await this.userServiceInputPort.create(body);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id')
    id: string,
    @Body() body: User,
  ): Promise<void> {
    await this.userServiceInputPort.update(id, body);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id')
    id: string,
  ): Promise<User> {
    return await this.userServiceInputPort.findOne(id);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return await this.userServiceInputPort.findAll();
  }
}
