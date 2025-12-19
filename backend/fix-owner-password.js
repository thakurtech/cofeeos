const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function fixOwnerPassword() {
    console.log('Fixing owner password...\n');

    const hashedPassword = await bcrypt.hash('password', 10);

    // Find and update all users with CAFE_OWNER role who have no password
    const owners = await prisma.user.findMany({
        where: { role: 'CAFE_OWNER' }
    });

    console.log(`Found ${owners.length} cafe owners`);

    for (const owner of owners) {
        await prisma.user.update({
            where: { id: owner.id },
            data: { password: hashedPassword }
        });
        console.log(`✓ Set password for: ${owner.email || owner.phone}`);
    }

    console.log('\n✅ All owner passwords set to: password');
}

fixOwnerPassword()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
