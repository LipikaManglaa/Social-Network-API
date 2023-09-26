const names = [
    '@gmail..com',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem'
]
const emails = [
    'Aaran@gmail.com',
    'Aaren@gmail.com',
    'Aarez@gmail.com',
    'Aarman@gmail.com',
    'Aaron@gmail.com',
    'Aaron-James@gmail.com',
    'Aarron@gmail.com',
    'Aaryan@gmail.com',
    'Aaryn@gmail.com',
    'Aayan@gmail.com',
    'Aazaan@gmail.com',
    'Abaan@gmail.com',
    'Abbas@gmail.com',
    'Abdallah@gmail.com',
    'Abdalroof@gmail.com',
    'Abdihakim@gmail.com',
    'Abdirahman@gmail.com',
    'Abdisalam@gmail.com',
    'Abdul@gmail.com',
    'Abdul-Aziz@gmail.com',
    'Abdulbasir@gmail.com',
    'Abdulkadir@gmail.com',
    'Abdulkarem@gmail.com'
]


const descriptionsThoughtText = [
    'How to disagree with someone',
    'iPhone review',
    'how-to video',
    'video essay on the history of video games',
    'How to make money on the App Store',
    'Learn NextJS in five minutes (Not clickbate)',
    'Movie trailer',
    'Hello world',
    'Another possible solution to the algorithm',
    'Apology video',
    'Submission for startup pitch',
  ];

  const possibleReaction = [
    'I disagree!',
    'I tried your algorithm, here were the results',
    'This was awesome',
    'Thank you for the great content',
    'Please check out my video response',
    'Like and subscribe to my channel please',
    'Reply: The side effects of in app purchases on digital marketplaces',
  ];
  
// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

  // Gets a random full name
const getRandomEmail = () =>
`${getRandomArrItem(emails)} `;

  const users = [];




  // Function to generate random videos that we can add to the database. Includes video responses.
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(descriptionsThoughtText),
        reactions: [...getThoughtResponses(3)],
      });
    }
    return results;
  };
  
  // Create the responses that will be added to each video
  const getThoughtResponses = (int) => {
    if (int === 1) {
      return getRandomArrItem(possibleReaction);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(possibleReaction),
        username: getRandomName(),
      });
    }
    return results;
  };
  module.exports = { getRandomName,getRandomEmail ,getThoughtResponses,getRandomThoughts};
