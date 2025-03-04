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
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Kathmandu, Nepal',
            speciality: 'Cardiologist',
            createdAt: '2025-01-03 12:12:34'
        },
        {
            name: 'Dr. Rajesh Sharma',
            email: 'rajesh.sharma@example.com',
            contact: '9812345678',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Kathmandu, Nepal',
            speciality: 'Cardiologist',
            featured: true,
        },
        {
            name: 'Dr. Sita Adhikari',
            email: 'sita.adhikari@example.com',
            contact: '9807654321',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Lalitpur, Nepal',
            speciality: 'Dermatologist',
            featured: false,
        },
        {
            name: 'Dr. Prakash Thapa',
            email: 'prakash.thapa@example.com',
            contact: '9841122334',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Pokhara, Nepal',
            speciality: 'Neurologist',
            featured: true,
        },
        {
            name: 'Dr. Anjali Karki',
            email: 'anjali.karki@example.com',
            contact: '9811223344',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Bhaktapur, Nepal',
            speciality: 'Pediatrician',
            featured: false,
        },
        {
            name: 'Dr. Bijay Gurung',
            email: 'bijay.gurung@example.com',
            contact: '9856677889',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Chitwan, Nepal',
            speciality: 'Orthopedic Surgeon',
            featured: true,
        },
        {
            name: 'Dr. Sunita Lama',
            email: 'sunita.lama@example.com',
            contact: '9867788990',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Dharan, Nepal',
            speciality: 'Gynecologist',
            featured: false,
        },
        {
            name: 'Dr. Manoj Bhandari',
            email: 'manoj.bhandari@example.com',
            contact: '9844455667',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Butwal, Nepal',
            speciality: 'ENT Specialist',
            featured: true,
        },
        {
            name: 'Dr. Kriti Shrestha',
            email: 'kriti.shrestha@example.com',
            contact: '9803344556',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Biratnagar, Nepal',
            speciality: 'Ophthalmologist',
            featured: false,
        },
        {
            name: 'Dr. Nirajan Joshi',
            email: 'nirajan.joshi@example.com',
            contact: '9812233445',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Janakpur, Nepal',
            speciality: 'Psychiatrist',
            featured: true,
        },
        {
            name: 'Dr. Alisha Tamang',
            email: 'alisha.tamang@example.com',
            contact: '9823344556',
            password:userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Dhangadhi, Nepal',
            speciality: 'General Physician',
            featured: false,
        }
    ]);

    console.log('Seeding completed!');
}

module.exports = seed;
