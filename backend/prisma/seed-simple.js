const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Hash password
    const hash = await bcrypt.hash('password', 10);

    // Create Admin
    const admin = await prisma.user.upsert({
        where: { phone: '+919999999999' },
        update: {},
        create: {
            phone: '+919999999999',
            email: 'admin@cafeos.com',
            password: hash,
            name: 'Super Admin',
            role: 'SUPER_ADMIN'
        }
    });
    console.log('✅ Admin created:', admin.email);

    // Create Shop
    const shop = await prisma.shop.upsert({
        where: { slug: 'cafe-noir' },
        update: {},
        create: {
            name: 'Café Noir',
            slug: 'cafe-noir',
            currency: '₹',
            themeColor: '#BF5700',
            upiId: 'cafenoir@upi'
        }
    });
    console.log('✅ Shop created:', shop.name);

    // Create Owner for this shop
    const owner = await prisma.user.upsert({
        where: { phone: '+919876543210' },
        update: {},
        create: {
            phone: '+919876543210',
            email: 'owner@cafenoir.com',
            password: hash,
            name: 'Raj Kumar',
            role: 'OWNER',
            shopId: shop.id
        }
    });
    console.log('✅ Owner created:', owner.email);

    // Create menu categories
    const existingCats = await prisma.menuCategory.count({ where: { shopId: shop.id } });

    if (existingCats === 0) {
        // Coffee category
        await prisma.menuCategory.create({
            data: {
                name: 'Coffee',
                sortOrder: 1,
                shopId: shop.id,
                items: {
                    create: [
                        { name: 'Espresso', price: 150, description: 'Strong black coffee' },
                        { name: 'Cappuccino', price: 200, description: 'Espresso with steamed milk foam' },
                        { name: 'Latte', price: 220, description: 'Espresso with smooth steamed milk' },
                        { name: 'Americano', price: 180, description: 'Espresso diluted with hot water' }
                    ]
                }
            }
        });

        // Food category
        await prisma.menuCategory.create({
            data: {
                name: 'Food',
                sortOrder: 2,
                shopId: shop.id,
                items: {
                    create: [
                        { name: 'Croissant', price: 120, description: 'Buttery French pastry' },
                        { name: 'Sandwich', price: 180, description: 'Grilled veggie sandwich' },
                        { name: 'Muffin', price: 100, description: 'Blueberry muffin' }
                    ]
                }
            }
        });

        console.log('✅ Menu created');
    }

    console.log('\\n🎉 Seed complete!');
    console.log('\\n📝 Login: admin@cafeos.com / password');
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
