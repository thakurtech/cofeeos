import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const products = [
    {
        name: 'Cappuccino',
        description: 'Rich espresso with steamed milk foam',
        price: 180,
        category: 'Coffee',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80',
        available: true
    },
    {
        name: 'Latte',
        description: 'Espresso with steamed milk and a light layer of foam',
        price: 200,
        category: 'Coffee',
        image: 'https://images.unsplash.com/photo-1570968992193-96a781894568?w=500&q=80',
        available: true
    },
    {
        name: 'Espresso',
        description: 'Strong, concentrated coffee',
        price: 120,
        category: 'Coffee',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=80',
        available: true
    },
    {
        name: 'Mocha',
        description: 'Espresso with chocolate and steamed milk',
        price: 220,
        category: 'Coffee',
        image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&q=80',
        available: true
    },
    {
        name: 'Croissant',
        description: 'Buttery, flaky pastry',
        price: 150,
        category: 'Snack',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80',
        available: true
    },
    {
        name: 'Blueberry Muffin',
        description: 'Freshly baked muffin with blueberries',
        price: 140,
        category: 'Snack',
        image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&q=80',
        available: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coffeeshop-os');
        console.log('MongoDB Connected');

        await Product.deleteMany({});
        await Order.deleteMany({});
        console.log('Cleared existing data');

        await Product.insertMany(products);
        console.log('Added demo products');

        // Add a dummy order
        const demoOrder = new Order({
            customerName: 'Alice',
            items: [
                { name: 'Cappuccino', price: 180, quantity: 1 },
                { name: 'Croissant', price: 150, quantity: 2 }
            ],
            total: 480,
            status: 'preparing'
        });
        await demoOrder.save();
        console.log('Added demo order');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
