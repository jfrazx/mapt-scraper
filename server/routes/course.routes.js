const router = require('express').Router();
const courses = require('../controllers').courses;
const { wrapper } = require('./middleware');

router
  .get('/', wrapper(courses.index))
  .get('/:courseID', wrapper(courses.show))
  .post('/', wrapper(courses.create))
  .put('/:courseID', wrapper(courses.update))
  .delete('/:courseID', wrapper(courses.destroy));

module.exports = router;
