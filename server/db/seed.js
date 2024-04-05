const { prisma } = require('../db');
const { faker } = require("@faker-js/faker");
const bcrypt = require('bcrypt');

async function seed() {
  console.log("Seeding the database.");
  try {
    // Add 5 instructors.
    // const data = Array.from({ length: 5}).map(() => ({
    //   username: faker.internet.userName(),
    //   password: bcrypt.hashSync(faker.internet.password(), Number(process.env.SALT_ROUNDS))
    // }));
    // await prisma.instructor.createMany({data});
    // const instructors = await prisma.instructor.findMany();
    // console.log('INSTRUCTORS ARE .... ', instructors);

    
    // Add 4 students for each instructor.
    // instructors.forEach(async (instructor) => {
    //   await prisma.instructor.update({
    //     where: {
    //       id: instructor.id
    //     },
    //     data: {
    //       students: {
    //         createMany: {
    //           data: Array.from({ length: 4 }).map(() => ({
    //             name: faker.person.fullName(),
    //             cohort: String(faker.number.int({ min: 2000, max: 3000 }))
    //           }))
    //         }
    //       }
    //     }
    //   });
    // });
   

console.log("Database is seeded.");
} catch (err) {
  console.error(err);
}
};

// Seed the database if we are running this file directly.
if (require.main === module) {
seed();
}

module.exports = seed;
