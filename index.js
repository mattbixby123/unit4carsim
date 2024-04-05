// This index.js is for Prisma Client - use to manipulate the db and schema 
const { PrismaClient } = require('@prisma/client');
// const faker = require('faker'); //faker import and user are removed b/c i am no longer generating fake data,

const prisma = new PrismaClient();


async function main() {
  
  // extra students or instructors can be added here and then call 'node index.js' in terminal

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
