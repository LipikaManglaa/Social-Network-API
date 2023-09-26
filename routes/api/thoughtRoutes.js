const router = require('express').Router();
const {getThoughts,getSingleThought,createThought}= require('../../controllers/thoughtController');

  // getSingleThought,
  // createThought,
  // updateThought,
  // deleteThought,
  // addThoughtResponse,
  // removeThoughtResponses,
 
// /api/videos
router.route('/').get(getThoughts)
.post(createThought);

// /api/videos/:videoId
router
  .route('/:thoughtId')
  .get(getSingleThought)
//   .put(updateThought)
//   .delete(deleteThought);

// /api/videos/:videoId/responses
// router.route('/:thoughtId/responses').post(addThoughtResponse);

// /api/videos/:videoId/responses/:responseId
// router.route('/:thoughtId/responses/:responseId').delete(removeThoughtResponses);

module.exports = router;
