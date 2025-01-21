import { prisma } from '../config/database';

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

afterEach(async () => {
  const tables = ['User'];
  await Promise.all(
    tables.map(table => prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`))
  );
});
