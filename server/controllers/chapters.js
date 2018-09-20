const { Chapter, Section } = require('../models');
const { debug } = require('../utils');

class Chapters {
  async index(request, response) {
    response.json(await Chapter.find({}));
  }
  async show(request, response) {
    response.json(await Chapter.findById(request.params.chapterID));
  }
  async update(request, response) {
    response.json(
      await Chapter.findByIdAndUpdate(request.params.chapterID, request.body)
    );
  }
  async create(request, response) {
    debug('chapter data', request.body);

    const chapter = await Chapter.create(request.body);

    await Section.findByIdAndUpdate(chapter.section, {
      $push: { chapters: chapter },
    });

    response.json(chapter);
  }
  async destroy(request, response) {
    const chapter = await Chapter.findByIdAndRemove(request.params.chapterID);

    await Section.findByIdAndUpdate(chapter.section, {
      $pull: { chapters: chapter },
    });

    response.json(chapter);
  }
}

module.exports = new Chapters();
