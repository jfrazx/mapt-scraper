const router = require('express').Router();
const sections = require('../controllers').sections;
const { wrapper } = require('./middleware');

router
  .get('/', wrapper(sections.index))
  .get('/:sectionID', wrapper(sections.show))
  .post('/', wrapper(sections.create))
  .put('/:sectionID', wrapper(sections.update))
  .delete('/:sectionID', wrapper(sections.destroy));

module.exports = router;
