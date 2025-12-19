const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://neondb_owner:npg_c8JD1ilzjVyS@ep-muddy-truth-a1w2qvbx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function checkTables() {
    console.log('Checking table structures...\n');

    try {
        // Check Shop table columns
        const shopCols = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = 'Shop'
            ORDER BY ordinal_position
        `;
        console.log('Shop columns:');
        shopCols.forEach(c => console.log(`  - ${c.column_name}: ${c.data_type} ${c.is_nullable === 'YES' ? '(nullable)' : '(required)'} ${c.column_default ? `DEFAULT ${c.column_default}` : ''}`));

        // Check any constraints on Shop
        console.log('\nShop constraints:');
        const constraints = await sql`
            SELECT constraint_name, constraint_type
            FROM information_schema.table_constraints
            WHERE table_name = 'Shop'
        `;
        constraints.forEach(c => console.log(`  - ${c.constraint_name}: ${c.constraint_type}`));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkTables();
