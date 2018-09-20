const router = require('express').Router();

const chapterRouter = require('./chapter.routes');
const courseRouter = require('./course.routes');
const sectionRouter = require('./section.routes');

router
  .use('/courses', courseRouter)
  .use('/sections', sectionRouter)
  .use('/chapters', chapterRouter);

module.exports = router;
