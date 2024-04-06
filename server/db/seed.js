const { prisma } = require('../db');
const { faker } = require("@faker-js/faker");
const bcrypt = require('bcrypt');

async function seed() {
  console.log("Seeding the database.");
  try {
    // Seed 10 users
    const users = await Promise.all(Array.from({ length: 10 }).map(async () => {
      const passwordHash = await bcrypt.hash(faker.internet.password(), Number(process.env.SALT_ROUNDS));
      return prisma.users.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: passwordHash,
        },
      });
    }));

    console.log('Users created:', users);

    // Seed 1000 random items with product names
    const items = await Promise.all(Array.from({ length: 1000 }).map(async () => {
      return prisma.items.create({
        data: {
          name: faker.commerce.productName(), // Use random product names
          description: faker.lorem.sentences(),
        },
      });
    }));

    // console.log('Items created:', items);

    
    // Map to keep track of reviewed items for each user
    const reviewedItemsMap = new Map();

    // Seed 100 reviews for each user
    await Promise.all(users.map(async (user) => {
      const reviewedItems = new Set();
      await Promise.all(Array.from({ length: 100 }).map(async () => {
        let itemId;
        do {
          itemId = items[Math.floor(Math.random() * items.length)].id;
        } while (reviewedItems.has(itemId) || (reviewedItemsMap.get(user.id) || []).includes(itemId));

        reviewedItems.add(itemId);
        reviewedItemsMap.set(user.id, Array.from(reviewedItems));

        const rating = faker.number.int({ min: 1, max: 5 });
        const review = await prisma.reviews.create({
          data: {
            text: faker.lorem.paragraph(),
            userId: user.id,
            itemId: itemId,
            rating: rating,
          },
        });

        // Seed one comment for each review
        const commenter = users.filter(u => u.id !== user.id)[Math.floor(Math.random() * (users.length - 1))];
        await prisma.comments.create({
          data: {
            text: faker.lorem.sentence(),
            userId: commenter.id,
            itemId: itemId,
            reviewId: review.id,
          },
        });
      }));
    }));


  console.log("Database is seeded.");
} catch (err) {
  console.error("Error seeding database:", err);
} finally {
  await prisma.$disconnect(); // close db connection
}
};

// Seed the database if we are running this file directly.
if (require.main === module) {
seed();
}

module.exports = seed;
