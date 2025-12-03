import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('api/memes')
export class MemesProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  findAll() {
    return this.proxyService.proxyRequest('memes', 'GET', '/memes');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proxyService.proxyRequest('memes', 'GET', `/memes/${id}`);
  }

  @Get('user/:idUsuario')
  findByUser(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.proxyService.proxyRequest('memes', 'GET', `/memes/user/${idUsuario}`);
  }

  @Get('likes/:idUsuario')
  getUserLikes(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.proxyService.proxyRequest('memes', 'GET', `/memes/likes/${idUsuario}`);
  }

  @Post()
  create(@Body() data: any) {
    return this.proxyService.proxyRequest('memes', 'POST', '/memes', data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.proxyService.proxyRequest('memes', 'PUT', `/memes/${id}`, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proxyService.proxyRequest('memes', 'DELETE', `/memes/${id}`);
  }

  @Post(':id/like')
  toggleLike(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.proxyService.proxyRequest('memes', 'POST', `/memes/${id}/like`, data);
  }
}

