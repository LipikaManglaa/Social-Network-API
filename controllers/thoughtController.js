const { Thought, User } = require('../models');

module.exports = {


  async getThoughts(req,res) {
    await Thought.find({})
    // .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    // .sort({_id: -1})
    .then(dbThoughtsData => res.json(dbThoughtsData))
   
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
 
 
  async getSingleThought(req, res) {
    console.log(req.params.thoughtId)
    try {   
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
console.log(thought)
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

    res.json(thought);
      
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new video
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

      res.json('Created the thought🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // async updateThought(req, res) {
  //   try {
  //     const thought = await Thought.findOneAndUpdate(
  //       { _id: req.params.thoughtId },
  //       { $set: req.body },
  //       { runValidators: true, new: true }
  //     );

  //     if (!thought) {
  //       return res.status(404).json({ message: 'No thought with this id!' });
  //     }

  //     res.json(thought);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // },

  // async deleteThought(req, res) {
  //   try {
  //     const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

  //     if (!thought) {
  //       return res.status(404).json({ message: 'No thought with this id!' });
  //     }

  //     const user = await User.findOneAndUpdate(
  //       { thoughts: req.params.thoughtId },
  //       { $pull: { thoughts: req.params.thoughtId } },
  //       { new: true }
  //     );

  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ message: 'Thought created but no user with this id!' });
  //     }

  //     res.json({ message: 'Thought successfully deleted!' });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // Add a video response
  // async addThoughtResponse(req, res) {
  //   try {
  //     const thought = await Thought.findOneAndUpdate(
  //       { _id: req.params.thoughtId },
  //       { $addToSet: { responses: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!thought) {
  //       return res.status(404).json({ message: 'No thought with this id!' });
  //     }

  //     res.json(thought);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // Remove video response
  // async removeThoughtResponses(req, res) {
  //   try {
  //     const thought = await Thought.findOneAndUpdate(
  //       { _id: req.params.thoughtId },
  //       { $pull: { reactions: { responseId: req.params.responseId } } },
  //       { runValidators: true, new: true }
  //     )

  //     if (!thought) {
  //       return res.status(404).json({ message: 'No thought with this id!' });
  //     }

  //     res.json(thought);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
};
