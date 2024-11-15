import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Receivable } from 'src/application/domain/models/Receivable';
import { ReceivableServiceInputPort } from 'src/application/input/ReceivableServiceInputPort';

@Controller('api/receivables')
export class ReceivableController {
  constructor(
    @Inject('ReceivableServiceInputPort')
    private readonly receivableServiceInputPort: ReceivableServiceInputPort,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: Receivable): Promise<Receivable> {
    return await this.receivableServiceInputPort.create(body);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id')
    id: string,
    @Body() body: Receivable,
  ): Promise<void> {
    await this.receivableServiceInputPort.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.receivableServiceInputPort.delete(id);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id')
    id: string,
  ): Promise<Receivable> {
    return await this.receivableServiceInputPort.findOne(id);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Receivable[]> {
    return await this.receivableServiceInputPort.findAll();
  }
}
