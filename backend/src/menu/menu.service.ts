import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  // Legacy method for compatibility
  async findAll(shopSlug: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { slug: shopSlug },
      include: {
        menuCategories: {
          include: {
            items: {
              where: { isAvailable: true },
              include: {
                modifiers: {
                  include: { options: true },
                },
              },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!shop) {
      return [];
    }

    return shop.menuCategories;
  }

  async findOne(id: string) {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        modifiers: { include: { options: true } },
        category: true,
      },
    });
  }

  // ============ CATEGORIES ============

  async getCategories(shopId: string) {
    return this.prisma.menuCategory.findMany({
      where: { shopId },
      include: { items: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async createCategory(shopId: string, name: string) {
    const maxOrder = await this.prisma.menuCategory.aggregate({
      where: { shopId },
      _max: { sortOrder: true },
    });

    return this.prisma.menuCategory.create({
      data: {
        name,
        shopId,
        sortOrder: (maxOrder._max.sortOrder || 0) + 1,
      },
      include: { items: true },
    });
  }

  async updateCategory(id: string, data: { name?: string; sortOrder?: number }) {
    return this.prisma.menuCategory.update({
      where: { id },
      data,
      include: { items: true },
    });
  }

  async deleteCategory(id: string) {
    return this.prisma.menuCategory.delete({ where: { id } });
  }

  // ============ MENU ITEMS ============

  async getItems(categoryId: string) {
    return this.prisma.menuItem.findMany({
      where: { categoryId },
      include: { modifiers: { include: { options: true } } },
    });
  }

  async createItem(data: {
    categoryId: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
  }) {
    return this.prisma.menuItem.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        categoryId: data.categoryId,
      },
      include: { modifiers: { include: { options: true } } },
    });
  }

  async updateItem(id: string, data: {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    isAvailable?: boolean;
  }) {
    return this.prisma.menuItem.update({
      where: { id },
      data,
      include: { modifiers: { include: { options: true } } },
    });
  }

  async deleteItem(id: string) {
    return this.prisma.menuItem.delete({ where: { id } });
  }

  // ============ MODIFIER GROUPS ============

  async getModifierGroups(menuItemId: string) {
    return this.prisma.modifierGroup.findMany({
      where: { menuItemId },
      include: { options: true },
    });
  }

  async createModifierGroup(data: {
    name: string;
    menuItemId: string;
    minSelect?: number;
    maxSelect?: number;
  }) {
    return this.prisma.modifierGroup.create({
      data: {
        name: data.name,
        menuItemId: data.menuItemId,
        minSelect: data.minSelect || 0,
        maxSelect: data.maxSelect || 1,
      },
      include: { options: true },
    });
  }

  async updateModifierGroup(id: string, data: {
    name?: string;
    minSelect?: number;
    maxSelect?: number;
  }) {
    return this.prisma.modifierGroup.update({
      where: { id },
      data,
      include: { options: true },
    });
  }

  async deleteModifierGroup(id: string) {
    return this.prisma.modifierGroup.delete({ where: { id } });
  }

  // ============ MODIFIER OPTIONS ============

  async createModifierOption(data: {
    modifierGroupId: string;
    name: string;
    price: number;
  }) {
    return this.prisma.modifierOption.create({
      data: {
        name: data.name,
        price: data.price,
        modifierGroupId: data.modifierGroupId,
      },
    });
  }

  async updateModifierOption(id: string, data: {
    name?: string;
    price?: number;
  }) {
    return this.prisma.modifierOption.update({
      where: { id },
      data,
    });
  }

  async deleteModifierOption(id: string) {
    return this.prisma.modifierOption.delete({ where: { id } });
  }

  // ============ PUBLIC MENU ============

  async getPublicMenu(shopSlug: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { slug: shopSlug },
      include: {
        menuCategories: {
          include: {
            items: {
              where: { isAvailable: true },
              include: {
                modifiers: {
                  include: { options: true },
                },
              },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    return shop;
  }
}
