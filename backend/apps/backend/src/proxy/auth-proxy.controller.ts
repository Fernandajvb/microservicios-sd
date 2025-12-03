import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('api/auth')
export class AuthProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('register')
  register(@Body() data: any) {
    return this.proxyService.proxyRequest('auth', 'POST', '/auth/register', data);
  }

  @Post('login')
  login(@Body() data: any) {
    return this.proxyService.proxyRequest('auth', 'POST', '/auth/login', data);
  }

  @Get('validate/:id')
  validateUser(@Param('id', ParseIntPipe) id: number) {
    return this.proxyService.proxyRequest('auth', 'GET', `/auth/validate/${id}`);
  }
}

