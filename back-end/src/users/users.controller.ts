import { Body, Controller, Post, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Valida os dados
    if (!email || !password) {
      throw new BadRequestException('Email e senha são obrigatórios.');
    }

    // Valida o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Formato de email inválido.');
    }

    // Valida o tamanho do email
    if (email.length > 255) {
      throw new BadRequestException('O email é muito longo.');
    }

    // Valida o tamanho da senha
    if (password.length < 6 || password.length > 128) {
      throw new BadRequestException('A senha deve ter entre 6 e 128 caracteres.');
    }

    return this.usersService.createUser(email, password);
  }

  @Get('login')
  async loginUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.usersService.findUserByEmailAndPassword(email, password);
    if (!user) {
      throw new NotFoundException('Usuário ou senha inválidos');
    }
    return { message: 'Login bem-sucedido' };
  }

  // Rota para adicionar uma Subscription a um usuário
  @Post(':userId/subscription')
  async addSubscription(
    @Param('userId') userId: string, // Recebe como string
    @Body() subscriptionData: { type: string; startDate: Date; endDate: Date; status: boolean },
  ) {
    try {
      // Converte o ID para número e chama o serviço
      return await this.usersService.addSubscriptionToUser(Number(userId), subscriptionData); // Converte para número
    } catch (error) {
      // Lança uma exceção HTTP com a mensagem de erro
      throw new NotFoundException(error.message);
    }
  }

  // Rota para verificar se um usuário já possui uma Subscription
  @Get(':userId/subscription')
  async getUserSubscription(@Param('userId') userId: string) {
    try {
      // Converte o ID para número e chama o serviço
      const subscription = await this.usersService.getUserSubscription(Number(userId));
      return subscription;
    } catch (error) {
      // Lança uma exceção HTTP com a mensagem de erro
      throw new NotFoundException(error.message);
    }
  }
}