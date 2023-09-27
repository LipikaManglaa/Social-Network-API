const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
  
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
          if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
        } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
    
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


//update user
 async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
    
      res.status(500).json(err);
    }
  },

  // delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'user successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Add a friend

  async addFriend(req, res) {
  
      try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        {  runValidators: true,new: true }
      );
   
      if (!user) {
              return res.status(404).json({ message: 'user created, but found no user with that ID', });
            }

      
        res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
        },

//delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } } ,
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}