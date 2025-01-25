const { Users } = require('./index');
const bcrypt = require('bcrypt');

async function seed() {
    const adminPassword = await bcrypt.hash('password', 10);
    const userPassword = await bcrypt.hash('password', 10);

    await Users.bulkCreate([
        {
            name: 'Admin User',
            email: 'admin@example.com',
            contact: '9999999999',
            password: adminPassword,
            role: 'admin',
            createdAt: '2024-11-11 12:12:34'
        },
        {
            name: 'User',
            email: 'user@example.com',
            contact: '9999999999',
            password: userPassword,
            role: 'user',
            createdAt: '2024-12-21 12:12:34'
        },
        {
            name: 'Hospital',
            email: 'hospital@example.com',
            contact: '9999999999',
            password: userPassword,
            role: 'hospital',
            createdAt: '2025-01-03 12:12:34'
        },
        {
            name: 'Doctor',
            email: 'doctor@example.com',
            contact: '9999999999',
            password: userPassword,
            role: 'doctor',
            hospitalId: 3,
            createdAt: '2025-01-03 12:12:34'
        },
    ]);

    console.log('Seeding completed!');
}

seed().catch(console.error);
