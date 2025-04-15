import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * @Author: Dev-Ricas & Luanplays11
 * @Date: 30/03/2025
 * @Description: Serviço para gerenciar componentes CSS.
 */
@Injectable()
export class ComponentsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Cria um novo componente CSS no banco de dados.
   * @param name - O nome do componente.
   * @param cssContent - O conteúdo CSS do componente.
   * @param category - A categoria do componente (opcional).
   * @param color - A cor representativa do componente (opcional).
   * @returns O componente recém-criado com seus detalhes.
   */
  async createComponent(name: string, cssContent: string, category?: string, color?: string) {
    return this.prisma.component.create({
      data: {
        name,
        cssContent,
        category: category || 'Outros',
        color: color || '#6366F1', // Cor padrão se não for fornecida
      },
    });
  }  /**
   * Busca um componente específico pelo ID.
   * @param id - O ID único do componente (esperado como string e convertido para número).
   * @returns O componente correspondente ou lança um erro caso não seja encontrado.
   * @throws NotFoundException em caso de componente não encontrado.
   */
  async getComponentById(id: string) {
    try {
      const numericId = parseInt(id, 10);
      const component = await this.prisma.component.findUnique({
        where: {
          id: numericId,
        }
      });

      if (!component) {
        throw new NotFoundException(`Componente com ID ${id} não encontrado`);
      }

      return component;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Erro ao buscar componente com o ID ${id}: ${error.message}`);
    }
  }

  /**
   * Retorna a lista de todos os componentes armazenados no banco de dados.
   * @returns Um array de objetos representando os componentes.
   */
  async getAllComponents() {
    return this.prisma.component.findMany();
  }
  /**
   * Exclui um componente específico pelo ID.
   * @param id - O ID único do componente (esperado como string e convertido para número).
   * @returns O componente excluído ou lança um erro caso não seja encontrado.
   * @throws NotFoundException em caso de componente não encontrado.
   */
  async deleteComponent(id: string) {
    try {
      const numericId = parseInt(id, 10);
      
      // Verificar se o componente existe antes de excluir
      const componentExists = await this.prisma.component.findUnique({
        where: {
          id: numericId,
        },
      });
      
      if (!componentExists) {
        throw new NotFoundException(`Componente com ID ${id} não encontrado`);
      }
      
      // Excluir o componente
      return await this.prisma.component.delete({
        where: {
          id: numericId,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Erro ao excluir o componente com o ID ${id}: ${error.message}`);
    }
  }
  
  /**
   * Atualiza um componente existente pelo ID.
   * @param id - O ID único do componente (esperado como string e convertido para número).
   * @param data - Os dados a serem atualizados no componente.
   * @returns O componente atualizado.
   * @throws NotFoundException em caso de componente não encontrado.
   */
  async updateComponent(id: string, data: {
    name?: string;
    cssContent?: string;
    category?: string;
    color?: string;
  }) {
    try {
      const numericId = parseInt(id, 10);
      
      // Verificar se o componente existe antes de atualizar
      const componentExists = await this.prisma.component.findUnique({
        where: {
          id: numericId,
        },
      });
      
      if (!componentExists) {
        throw new NotFoundException(`Componente com ID ${id} não encontrado`);
      }
      
      // Atualizar o componente
      return await this.prisma.component.update({
        where: {
          id: numericId,
        },
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Erro ao atualizar o componente com o ID ${id}: ${error.message}`);
    }
  }
}