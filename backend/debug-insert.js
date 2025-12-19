const { neon } = require('@neondatabase/serverless');
const crypto = require('crypto');

const DATABASE_URL = 'postgresql://neondb_owner:npg_c8JD1ilzjVyS@ep-muddy-truth-a1w2qvbx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

async function insertData() {
    console.log('🌱 Inserting Shop and Menu...\n');

    const shopId = crypto.randomUUID();
    const coffeeId = crypto.randomUUID();
    const foodId = crypto.randomUUID();

    try {
        // Insert Shop
        console.log('1. Inserting Shop...');
        const shopResult = await sql`
            INSERT INTO "Shop" ("id", "name", "slug", "address", "currency", "themeColor")
            VALUES (${shopId}, 'Café Noir', 'cafe-noir-demo', '123 Coffee St, Bangalore', '₹', '#BF5700')
            RETURNING *
        `;
        console.log('   Shop inserted:', shopResult);

        // Insert Categories
        console.log('2. Inserting Categories...');
        const cat1 = await sql`
            INSERT INTO "MenuCategory" ("id", "name", "shopId", "sortOrder")
            VALUES (${coffeeId}, 'Coffee', ${shopId}, 1)
            RETURNING *
        `;
        console.log('   Coffee category:', cat1);

        const cat2 = await sql`
            INSERT INTO "MenuCategory" ("id", "name", "shopId", "sortOrder")
            VALUES (${foodId}, 'Food', ${shopId}, 2)
            RETURNING *
        `;
        console.log('   Food category:', cat2);

        // Insert Menu Items
        console.log('3. Inserting Menu Items...');
        const item1 = await sql`
            INSERT INTO "MenuItem" ("id", "name", "description", "price", "categoryId", "isAvailable", "popularityScore", "margin")
            VALUES (${crypto.randomUUID()}, 'Espresso', 'Strong Italian coffee', 150, ${coffeeId}, true, 0, 0)
            RETURNING *
        `;
        console.log('   Espresso:', item1);

        console.log('\n✅ All data inserted successfully!');

        // Verify
        console.log('\n4. Verifying...');
        const shops = await sql`SELECT * FROM "Shop"`;
        console.log('   Shops count:', shops.length);

    } catch (error) {
        console.error('\n❌ Error:', error);
    }
}

insertData();
