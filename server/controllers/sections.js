const { Chapter, Course, Section } = require('../models');
const { debug } = require('../utils');

class Sections {
  async index(request, response) {
    response.json(await Section.find({}));
  }
  async show(request, response) {
    response.json(await Section.findById(request.params.sectionID));
  }
  async update(request, response) {
    response.json(
      await Section.findByIdAndUpdate(request.params.sectionID, request.body)
    );
  }
  async create(request, response) {
    debug('section data', request.body);
    const section = await Section.findOneAndUpdate(
      { sectionID: request.body.sectionID },
      request.body,
      { new: true, upsert: true }
    );

    await Course.findByIdAndUpdate(section.course, {
      $push: { sections: section },
    });

    response.json(section);
  }
  async destroy(request, response) {
    const section = await Section.findByIdAndRemove(request.params.sectionID);

    await Chapter.remove({ _id: { $in: section.chapters } });

    response.json(section);
  }
}

module.exports = new Sections();
