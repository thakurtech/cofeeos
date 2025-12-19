import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  // ============ PUBLIC ROUTES ============

  @Get()
  findAll(@Query('shop') shopSlug: string = 'demo-cafe') {
    return this.menuService.findAll(shopSlug);
  }

  @Get('public/:slug')
  getPublicMenu(@Param('slug') slug: string) {
    return this.menuService.getPublicMenu(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  // ============ CATEGORIES ============

  @Get('categories/shop/:shopId')
  @UseGuards(JwtAuthGuard)
  getCategories(@Param('shopId') shopId: string) {
    return this.menuService.getCategories(shopId);
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() data: { shopId: string; name: string }) {
    return this.menuService.createCategory(data.shopId, data.name);
  }

  @Patch('categories/:id')
  @UseGuards(JwtAuthGuard)
  updateCategory(
    @Param('id') id: string,
    @Body() data: { name?: string; sortOrder?: number }
  ) {
    return this.menuService.updateCategory(id, data);
  }

  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard)
  deleteCategory(@Param('id') id: string) {
    return this.menuService.deleteCategory(id);
  }

  // ============ MENU ITEMS ============

  @Get('items/category/:categoryId')
  getItems(@Param('categoryId') categoryId: string) {
    return this.menuService.getItems(categoryId);
  }

  @Post('items')
  @UseGuards(JwtAuthGuard)
  createItem(@Body() data: {
    categoryId: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
  }) {
    return this.menuService.createItem(data);
  }

  @Patch('items/:id')
  @UseGuards(JwtAuthGuard)
  updateItem(
    @Param('id') id: string,
    @Body() data: {
      name?: string;
      description?: string;
      price?: number;
      image?: string;
      isAvailable?: boolean;
    }
  ) {
    return this.menuService.updateItem(id, data);
  }

  @Delete('items/:id')
  @UseGuards(JwtAuthGuard)
  deleteItem(@Param('id') id: string) {
    return this.menuService.deleteItem(id);
  }

  // ============ MODIFIER GROUPS ============

  @Get('modifiers/:menuItemId')
  getModifierGroups(@Param('menuItemId') menuItemId: string) {
    return this.menuService.getModifierGroups(menuItemId);
  }

  @Post('modifiers')
  @UseGuards(JwtAuthGuard)
  createModifierGroup(@Body() data: {
    name: string;
    menuItemId: string;
    minSelect?: number;
    maxSelect?: number;
  }) {
    return this.menuService.createModifierGroup(data);
  }

  @Patch('modifiers/:id')
  @UseGuards(JwtAuthGuard)
  updateModifierGroup(
    @Param('id') id: string,
    @Body() data: {
      name?: string;
      minSelect?: number;
      maxSelect?: number;
    }
  ) {
    return this.menuService.updateModifierGroup(id, data);
  }

  @Delete('modifiers/:id')
  @UseGuards(JwtAuthGuard)
  deleteModifierGroup(@Param('id') id: string) {
    return this.menuService.deleteModifierGroup(id);
  }

  // ============ MODIFIER OPTIONS ============

  @Post('modifiers/:groupId/options')
  @UseGuards(JwtAuthGuard)
  createModifierOption(
    @Param('groupId') modifierGroupId: string,
    @Body() data: { name: string; price: number }
  ) {
    return this.menuService.createModifierOption({ ...data, modifierGroupId });
  }

  @Patch('options/:id')
  @UseGuards(JwtAuthGuard)
  updateModifierOption(
    @Param('id') id: string,
    @Body() data: { name?: string; price?: number }
  ) {
    return this.menuService.updateModifierOption(id, data);
  }

  @Delete('options/:id')
  @UseGuards(JwtAuthGuard)
  deleteModifierOption(@Param('id') id: string) {
    return this.menuService.deleteModifierOption(id);
  }
}
