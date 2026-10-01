import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { name: 'Empresa Demo' },
    update: {},
    create: { name: 'Empresa Demo' },
  });

  const password = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@correo.com' },
    update: {},
    create: {
      email: 'admin@correo.com',
      name: 'Admin',
      password,
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'usuario@correo.com' },
    update: {},
    create: {
      email: 'usuario@correo.com',
      name: 'Usuario Demo',
      password,
      role: 'USER',
      tenantId: tenant.id,
    },
  });

  console.log('Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());