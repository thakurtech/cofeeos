const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://neondb_owner:npg_c8JD1ilzjVyS@ep-muddy-truth-a1w2qvbx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function listAll() {
    console.log('Listing all database objects...\n');

    try {
        // List all tables
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        console.log('Tables:', tables.map(t => t.table_name));

        // List all types (enums)
        const types = await sql`
            SELECT typname 
            FROM pg_type 
            WHERE typnamespace = 'public'::regnamespace AND typtype = 'e'
        `;
        console.log('\nEnums:', types.map(t => t.typname));

        // Test simple insert
        console.log('\nTesting simple insert into Shop...');
        const result = await sql`
            INSERT INTO "Shop" ("id", "name", "slug", "currency")
            VALUES ('test-123', 'Test Shop', 'test-shop-123', 'INR')
            RETURNING *
        `;
        console.log('Insert result:', result);

    } catch (error) {
        console.error('Error:', error.message);
        console.error('Full error:', error);
    }
}

listAll();
