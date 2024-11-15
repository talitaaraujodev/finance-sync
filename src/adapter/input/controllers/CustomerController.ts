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
import { Customer } from 'src/application/domain/models/Customer';
import { CustomerServiceInputPort } from 'src/application/input/CustomerServiceInputPort';

@Controller('api/customers')
export class CustomerController {
  constructor(
    @Inject('CustomerServiceInputPort')
    private readonly customerServiceInputPort: CustomerServiceInputPort,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: Customer): Promise<Customer> {
    return await this.customerServiceInputPort.create(body);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id')
    id: string,
    @Body() body: Customer,
  ): Promise<void> {
    await this.customerServiceInputPort.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.customerServiceInputPort.delete(id);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id')
    id: string,
  ): Promise<Customer> {
    return await this.customerServiceInputPort.findOne(id);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Customer[]> {
    return await this.customerServiceInputPort.findAll();
  }
}
