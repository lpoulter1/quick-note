import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  await prisma.todo.create({
    data: {
      title: 'New Todo',
      description: 'Todo Description',
      done: false,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'Take out bins',
      description: 'they stink',
      done: true,
    },
  });
}
