import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { prisma } from '../src/db';

dotenv.config();

async function seedAdmin() {
  const name = process.env.ADMIN_NAME || 'Admin';
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user ${email} already exists — skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, passwordHash, role: 'ADMIN' },
  });
  console.log(`Created admin user: ${email}`);
}

async function seedPackages() {
  const count = await prisma.bookingPackage.count();
  if (count > 0) {
    console.log('Packages already exist — skipping.');
    return;
  }

  await prisma.bookingPackage.createMany({
    data: [
      {
        title: 'Silver Package',
        price: 5000,
        description: 'A relaxed mocktail bar for your event, served in elegant glassware.',
        features: ['Mocktails', 'Glass setup', 'Professional service'],
        featured: false,
        order: 0,
      },
      {
        title: 'Golden Package',
        price: 7000,
        description:
          'Mocktails and cocktails together, with a signature ring-sip and champagne wall.',
        features: ['Mocktails + cocktails', 'Ring sip setup', 'Champagne wall'],
        featured: true,
        order: 1,
      },
      {
        title: 'Premium Package',
        price: 9000,
        description:
          'Full creative control — build your own cocktail or mocktail menu, any setup style.',
        features: [
          'Choose your own cocktail or mocktail',
          'All setup styles included',
          'Modify your own setup',
        ],
        featured: false,
        order: 2,
      },
    ],
  });
  console.log('Seeded 3 packages.');
}

async function seedMenu() {
  const alcoholic = [
    ['Idios Amigo', 'Blue curaçao, gin, rum, tequila, lemon, triple sec'],
    ['Long Island', 'Gin, rum, tequila, vodka, simple syrup, lemon'],
    ['Mojito (All Flavours)', 'Mint, simple syrup, rum, lemon, ice'],
    ['Green Paradise', 'Blue curaçao, mango, vodka, gin, rum, lemon'],
    ['Trouble Maker', 'Coke, dark rum, lemon, simple syrup'],
    ['Sex on the Beach', 'Orange juice, vodka, peach schnapps, rum, cranberry juice'],
  ];

  const nonAlcoholic = [
    ['Blessed Palm', 'Simple syrup, lemon juice, watermelon juice, sparkling water, mint'],
    ['Honey Orangeade', 'Honey, orange juice, lemon juice, sprite, ice'],
    ['Mango Breeze', 'Mango, strawberry juice, sparkling water, lemon, simple syrup'],
    ['Virgin Mojito', 'Mint, sparkling water, choice of flavor, lemon, simple syrup'],
    ['Strawberry Breeze', 'Strawberry juice, lemon, simple syrup, pineapple juice'],
  ];

  // Per-item check (not an all-or-nothing count check) so this is safe to run
  // even when other cocktails already exist in the table, and safe to re-run
  // without creating duplicates.
  const items = [
    ...alcoholic.map(([name, description], i) => ({
      name,
      description,
      category: 'ALCOHOLIC' as const,
      order: i,
    })),
    ...nonAlcoholic.map(([name, description], i) => ({
      name,
      description,
      category: 'NON_ALCOHOLIC' as const,
      order: i,
    })),
  ];

  let created = 0;
  for (const item of items) {
    const existing = await prisma.cocktailItem.findFirst({ where: { name: item.name } });
    if (existing) continue;
    await prisma.cocktailItem.create({ data: item });
    created++;
  }
  console.log(`Seeded ${created} new menu item(s) (${items.length - created} already existed).`);
}

async function main() {
  await seedAdmin();
  await seedPackages();
  await seedMenu();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
