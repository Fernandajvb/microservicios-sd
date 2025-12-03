import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('api/users')
export class UsersProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  findAll() {
    return this.proxyService.proxyRequest('users', 'GET', '/users');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proxyService.proxyRequest('users', 'GET', `/users/${id}`);
  }

  @Post()
  create(@Body() data: any) {
    return this.proxyService.proxyRequest('users', 'POST', '/users', data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.proxyService.proxyRequest('users', 'PUT', `/users/${id}`, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proxyService.proxyRequest('users', 'DELETE', `/users/${id}`);
  }
}

