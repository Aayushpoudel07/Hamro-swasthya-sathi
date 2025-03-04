const db = require('./index'); // Import/index.js
const seed = require('./seed'); // Import the seeding function

async function runMigrationsAndSeed() {
    try {
        console.log('Starting migrations...');
        await db.syncModels(); // Run migrations

        console.log('Running seed data...');
        await seed(); // Run seed function

        console.log('Migrations and seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error running migrations and seeding:', error);
        process.exit(1);
    }
}

runMigrationsAndSeed();
