const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName ,getRandomEmail,getRandomThoughts} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

  
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    const users = [];
    const thoughts = getRandomThoughts(10);
    for (let i = 0; i < 20; i++) {
        const fullName = getRandomName();
        const email=getRandomEmail();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];
    
        users.push({
          first,
          last,
          email
        
        });
      }
    
      await User.collection.insertMany(users);
      await Thought.collection.insertMany(thoughts);

      console.table(users);
      console.table(thoughts);
      console.info('Seeding complete! 🌱');
      process.exit(0);
})