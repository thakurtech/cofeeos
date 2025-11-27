import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create Default Shop
  const shop = await prisma.shop.upsert({
    where: { slug: 'cafe-noir' },
    update: {},
    create: {
      name: 'Café Noir',
      slug: 'cafe-noir',
      address: '123, Coffee Street, Indiranagar, Bangalore',
      phone: '+91 98765 43210',
      currency: '₹',
      themeColor: '#D4A373', // Gold/Coffee
    },
  });

  console.log(`✅ Shop created: ${shop.name}`);

  // 2. Create Categories
  const categories = [
    { name: 'Signature Coffee', sortOrder: 1 },
    { name: 'Iced Classics', sortOrder: 2 },
    { name: 'Artisan Bakery', sortOrder: 3 },
    { name: 'Savory Bites', sortOrder: 4 },
  ];

  for (const cat of categories) {
    await prisma.menuCategory.create({
      data: {
        name: cat.name,
        sortOrder: cat.sortOrder,
        shopId: shop.id,
        items: {
          create: getItemsForCategory(cat.name),
        },
      },
    });
  }

  console.log('✅ Menu seeded successfully');
}

function getItemsForCategory(categoryName: string) {
  switch (categoryName) {
    case 'Signature Coffee':
      return [
        { name: 'Espresso Romano', price: 180, description: 'Single shot with a twist of lemon zest.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=300&q=80', popularityScore: 85 },
        { name: 'Hazelnut Cappuccino', price: 240, description: 'Rich espresso with steamed milk and hazelnut syrup.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80', popularityScore: 95 },
        { name: 'Flat White', price: 220, description: 'Smooth microfoam over a double shot of espresso.', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=300&q=80', popularityScore: 90 },
      ];
    case 'Iced Classics':
      return [
        { name: 'Vietnamese Cold Brew', price: 260, description: 'Slow-dripped coffee with sweetened condensed milk.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b5c7fa69?auto=format&fit=crop&w=300&q=80', popularityScore: 92 },
        { name: 'Iced Americano', price: 190, description: 'Espresso shots topped with cold water and ice.', image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=300&q=80', popularityScore: 80 },
        { name: 'Caramel Frappé', price: 290, description: 'Blended ice, coffee, milk, and caramel drizzle.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80', popularityScore: 98 },
      ];
    case 'Artisan Bakery':
      return [
        { name: 'Almond Croissant', price: 210, description: 'Buttery pastry filled with almond cream.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80', popularityScore: 88 },
        { name: 'Blueberry Muffin', price: 160, description: 'Freshly baked with organic blueberries.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80', popularityScore: 75 },
      ];
    case 'Savory Bites':
      return [
        { name: 'Avocado Toast', price: 320, description: 'Sourdough toast topped with smashed avocado and chili flakes.', image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=300&q=80', popularityScore: 94 },
        { name: 'Grilled Cheese Panini', price: 280, description: 'Three-cheese blend with herbs on ciabatta.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80', popularityScore: 89 },
      ];
    default:
      return [];
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
