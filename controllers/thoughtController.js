const { Thought, User } = require('../models');

module.exports = {

  //get all thoughts
  async getThoughts(req,res) {
    await Thought.find({})
   
    .select('-__v')
  
    .then(dbThoughtsData => res.json(dbThoughtsData))
   
    .catch(err => {
        
        res.status(500).json(err);
    });
},
 
 //get single thought
  async getSingleThought(req, res) {
   
    try {   
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

    res.json(thought);
      
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }

      res.json({
        message:'Created the thought🎉',
        user
    
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  ///delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought deleted ' ,user});
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a reaction
  async addReaction(req, res) {
    
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {  $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      console.log(thought)
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json("reaction deleted sucessfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
