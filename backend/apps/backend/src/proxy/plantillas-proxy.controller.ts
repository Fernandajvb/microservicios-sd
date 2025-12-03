import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('api/plantillas')
export class PlantillasProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  findAll() {
    return this.proxyService.proxyRequest('plantillas', 'GET', '/plantillas');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proxyService.proxyRequest('plantillas', 'GET', `/plantillas/${id}`);
  }

  @Get('user/:idUsuario')
  findByUser(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.proxyService.proxyRequest('plantillas', 'GET', `/plantillas/user/${idUsuario}`);
  }

  @Post()
  create(@Body() data: any) {
    return this.proxyService.proxyRequest('plantillas', 'POST', '/plantillas', data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.proxyService.proxyRequest('plantillas', 'PUT', `/plantillas/${id}`, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proxyService.proxyRequest('plantillas', 'DELETE', `/plantillas/${id}`);
  }
}

