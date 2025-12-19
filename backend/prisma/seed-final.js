const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const HASHED_PASSWORD = '$2b$10$EpRnTzVlqHNP0.fUbXUwSOal5wAllaRpTp.1x3/EnsPawL.9v.que';

async function main() {
    console.log('🌱 Seeding database...');

    // 1. Create Shop first
    console.log('\n1. Creating Shop...');
    const shop = await prisma.shop.upsert({
        where: { slug: 'cafe-noir' },
        update: {},
        create: {
            name: 'Café Noir',
            slug: 'cafe-noir',
            currency: '₹',
            themeColor: '#BF5700',
        }
    });
    console.log('✓ Shop:', shop.name);

    // 2. Create Owner
    console.log('\n2. Creating Owner...');
    const owner = await prisma.user.upsert({
        where: { phone: '+919876543210' },
        update: {},
        create: {
            phone: '+919876543210',
            email: 'owner@cafenoir.com',
            name: 'Raj Kumar',
            password: HASHED_PASSWORD,
            role: 'CAFE_OWNER',
            shopId: shop.id
        }
    });
    console.log('✓ Owner:', owner.email);

    // 3. Create Categories
    console.log('\n3. Creating Categories...');
    const existingCats = await prisma.menuCategory.count({ where: { shopId: shop.id } });

    if (existingCats === 0) {
        const coffee = await prisma.menuCategory.create({
            data: { name: 'Coffee', shopId: shop.id, sortOrder: 1 }
        });
        const food = await prisma.menuCategory.create({
            data: { name: 'Food', shopId: shop.id, sortOrder: 2 }
        });
        console.log('✓ Categories created');

        // 4. Create Menu Items
        console.log('\n4. Creating Menu Items...');
        const coffeeItems = [
            { name: 'Espresso', price: 150, description: 'Strong Italian coffee' },
            { name: 'Cappuccino', price: 200, description: 'Espresso with foamed milk' },
            { name: 'Latte', price: 220, description: 'Smooth espresso with steamed milk' },
            { name: 'Americano', price: 180, description: 'Espresso with hot water' },
            { name: 'Mocha', price: 250, description: 'Chocolate espresso drink' },
        ];
        const foodItems = [
            { name: 'Croissant', price: 120, description: 'Buttery French pastry' },
            { name: 'Sandwich', price: 180, description: 'Grilled veggie sandwich' },
            { name: 'Muffin', price: 100, description: 'Blueberry muffin' },
            { name: 'Brownie', price: 150, description: 'Chocolate brownie' },
        ];

        for (const item of coffeeItems) {
            await prisma.menuItem.create({ data: { ...item, categoryId: coffee.id } });
        }
        for (const item of foodItems) {
            await prisma.menuItem.create({ data: { ...item, categoryId: food.id } });
        }
        console.log(`✓ ${coffeeItems.length + foodItems.length} menu items created`);
    } else {
        console.log('✓ Menu already exists');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@cafeos.com / password');
    console.log('   Owner: owner@cafenoir.com / password');
}

main()
    .catch(e => console.error('Error:', e.message))
    .finally(() => prisma.$disconnect());
