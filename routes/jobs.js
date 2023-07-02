const express = require('express');
const checkTestUser = require("../middleware/checkTestUser")

const router = express.Router()
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats
} = require('../controllers/jobs')

router.route('/').post(checkTestUser , createJob).get(getAllJobs);
router.route('/stats').get(showStats)

router.route('/:id').get(getJob).delete(checkTestUser , deleteJob).patch(checkTestUser , updateJob)

module.exports = router
