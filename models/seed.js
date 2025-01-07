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
        },
        {
            name: 'User',
            email: 'user@example.com',
            contact: '9999999999',
            password: userPassword,
            role: 'user',
        },
        {
            name: 'Hospital',
            email: 'hospital@example.com',
            contact: '9999999999',
            password: userPassword,
            role: 'hospital',
        },
        {
            name: 'Doctor',
            email: 'doctor@example.com',
            contact: '9999999999',
            password: userPassword,
            role: 'doctor',
            hospitalId: 3,
        },
    ]);

    console.log('Seeding completed!');
}

seed().catch(console.error);
