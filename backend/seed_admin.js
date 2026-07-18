const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@iti.edu';
  const password = 'admin';

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log(`Admin account already exists: ${email}`);
  } else {
    // Create new admin
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password
      }
    });
    console.log(`Created default admin account: ${newAdmin.email} with password: ${newAdmin.password}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
