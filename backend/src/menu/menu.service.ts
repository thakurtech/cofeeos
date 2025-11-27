import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async findAll(shopSlug: string) {
    const categories = await this.prisma.menuCategory.findMany({
      where: { shop: { slug: shopSlug } },
      include: {
        items: {
          where: { isAvailable: true },
          orderBy: { popularityScore: 'desc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
    return categories;
  }

  async findOne(id: string) {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        modifiers: {
          include: { options: true },
        },
      },
    });
  }
}
