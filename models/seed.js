const { Users, Blog } = require('./index');
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
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
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Dhangadhi, Nepal',
            speciality: 'General Physician',
            featured: false,
        },
        {
            name: 'Dr. Ramesh Bhatta',
            email: 'ramesh.bhatta@example.com',
            contact: '9801122334',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Kathmandu, Nepal',
            speciality: 'Internal Medicine Specialist',
            featured: true,
        },
        {
            name: 'Dr. Sanjay Shrestha',
            email: 'sanjay.shrestha@example.com',
            contact: '9812233444',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Lalitpur, Nepal',
            speciality: 'General Physician',
            featured: false,
        },
        {
            name: 'Dr. Anita Thapa',
            email: 'anita.thapa@example.com',
            contact: '9803344555',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Pokhara, Nepal',
            speciality: 'Dermatologist',
            featured: true,
        },
        {
            name: 'Dr. Suraj Tamang',
            email: 'suraj.tamang@example.com',
            contact: '9845566778',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Bhaktapur, Nepal',
            speciality: 'Ophthalmologist',
            featured: false,
        },
        {
            name: 'Dr. Binod Acharya',
            email: 'binod.acharya@example.com',
            contact: '9856677888',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Chitwan, Nepal',
            speciality: 'ENT Specialist',
            featured: true,
        },
        {
            name: 'Dr. Sunita Pokhrel',
            email: 'sunita.pokhrel@example.com',
            contact: '9867788991',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Dharan, Nepal',
            speciality: 'Gynecologist/Obstetrician',
            featured: false,
        },
        {
            name: 'Dr. Rajendra Basnet',
            email: 'rajendra.basnet@example.com',
            contact: '9844455668',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Butwal, Nepal',
            speciality: 'Oncologist',
            featured: true,
        },
        {
            name: 'Dr. Kriti Rana',
            email: 'kriti.rana@example.com',
            contact: '9803344557',
            password: userPassword,
            role: 'doctor',
            image: 'https://cdn3.vectorstock.com/i/1000x1000/89/82/handsome-cheerful-male-doctor-vector-35138982.jpg',
            address: 'Biratnagar, Nepal',
            speciality: 'Hepatologist',
            featured: false,
        }
    ]);

    // Create 10 blogs with some published and others in draft
    await Blog.bulkCreate([
        {
            title: 'How to Stay Healthy During Winter',
            content: 'Winter is the season when people are most susceptible to cold and flu. Here are some tips to keep you healthy...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Health, Winter, Tips',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Benefits of Regular Exercise',
            content: 'Exercise is essential for maintaining a healthy body. It has numerous benefits for both the body and mind...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Exercise, Health, Fitness',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Top 10 Nutrients for a Balanced Diet',
            content: 'Nutrition plays a key role in maintaining good health. These top 10 nutrients are essential for your diet...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Diet, Nutrition, Health',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'The Importance of Mental Health',
            content: 'Mental health is as important as physical health. Let’s look at the ways to maintain mental health...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Mental Health, Well-being, Self-care',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Managing Stress Effectively',
            content: 'Stress is a part of life, but learning how to manage it can improve your overall health...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Stress, Health, Self-care',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Healthy Eating for Kids',
            content: 'Teaching children to eat healthy from a young age is crucial for their growth and development...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Healthy Eating, Kids, Nutrition',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'How to Improve Sleep Quality',
            content: 'Sleep is vital for your health. These tips can help you get better and more restful sleep...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Sleep, Health, Tips',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: '5 Tips for Managing Weight Effectively',
            content: 'Managing your weight is important for overall health. Here are 5 tips that can help...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Weight Management, Health, Fitness',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'The Benefits of Drinking Water',
            content: 'Water is essential for life. Here are some benefits of staying hydrated...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Hydration, Health, Wellness',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'How to Prevent Common Illnesses',
            content: 'Preventing illness is better than curing it. Here are some tips on how to stay healthy...',
            image: 'https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg',
            tags: 'Health, Prevention, Tips',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);


    console.log('Seeding completed!');
}

module.exports = seed;
