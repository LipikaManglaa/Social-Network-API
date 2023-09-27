const router = require('express').Router();
const {getThoughts,getSingleThought,createThought,updateThought,deleteThought,addReaction,removeReaction}= require('../../controllers/thoughtController');



 
// /api/thought
router.route('/').get(getThoughts)
.post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)

// add reaction
router.route('/:thoughtId/reactions').post(addReaction);

// remove reaction
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
