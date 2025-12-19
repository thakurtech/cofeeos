const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://neondb_owner:npg_c8JD1ilzjVyS@ep-muddy-truth-a1w2qvbx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function test() {
    try {
        const result = await sql`SELECT 1 as test`;
        console.log('SUCCESS! Connected to Neon:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

test();
