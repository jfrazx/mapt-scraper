const router = require('express').Router();
const chapters = require('../controllers').chapters;
const { wrapper } = require('./middleware');

router
  .get('/', wrapper(chapters.index))
  .get('/:chapterID', wrapper(chapters.show))
  .post('/', wrapper(chapters.create))
  .put('/:chapterID', wrapper(chapters.update))
  .delete('/:chapterID', wrapper(chapters.destroy));

module.exports = router;
