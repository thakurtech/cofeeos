const { neon } = require('@neondatabase/serverless');
const { execSync } = require('child_process');

const sql = neon('postgresql://neondb_owner:npg_c8JD1ilzjVyS@ep-muddy-truth-a1w2qvbx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function runMigration() {
    console.log('🚀 Generating migration SQL...');

    // Generate migration SQL directly from Prisma (with PowerShell shell for Windows)
    const migrationSQL = execSync('npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script', {
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
        shell: 'powershell.exe'
    });

    console.log(`Generated ${migrationSQL.length} bytes of SQL`);

    // Split into individual statements
    const statements = migrationSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements`);
    console.log('Executing migration via HTTPS (Neon Serverless)...\n');

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        try {
            if (!statement || statement.startsWith('--')) continue;

            await sql.unsafe(statement + ';');
            successCount++;
            process.stdout.write('✓');
        } catch (error) {
            if (error.message.includes('already exists')) {
                skippedCount++;
                process.stdout.write('s');
            } else {
                console.error(`\n❌ Error on statement ${i + 1}: ${error.message}`);
                console.error(`Statement: ${statement.substring(0, 80)}...`);
                errorCount++;
            }
        }
    }

    console.log(`\n\n✅ Migration complete!`);
    console.log(`   ✓ Success: ${successCount}`);
    console.log(`   s Skipped (exists): ${skippedCount}`);
    console.log(`   ✗ Errors: ${errorCount}`);
}

runMigration().catch(console.error);
