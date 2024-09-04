import { PrismaClient } from '@prisma/client';
import * as Chance from 'chance';

const prisma = new PrismaClient();
const chance = new Chance();

async function main() {
  const generateUser = () => {
    return {
      firstName: chance.first(),
      lastName: chance.last(),
      age: chance.age(),
      problems: chance.bool(),
    };
  };

  const userArray = Array.from({ length: 1_000_000 }, generateUser);

  await prisma.user.createMany({ data: userArray });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
