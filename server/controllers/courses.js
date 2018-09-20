const { Course } = require('../models');
const { debug } = require('../utils');

class Courses {
  async index(request, response) {
    response.json(await Course.find({}));
  }
  async show(request, response) {
    response.json(await Course.findById(request.params.courseID));
  }
  async update(request, response) {
    response.json(
      await Course.findByIdAndUpdate(request.params.courseID, request.body)
    );
  }
  async create(request, response) {
    const { courseID } = request.body;

    debug('request');
    debug(request.body);

    response.json(
      await Course.findOneAndUpdate({ courseID }, request.body, {
        new: true,
        upsert: true,
      })
    );
  }
  async destroy(request, response) {
    response.json(await Course.findByIdAndRemove(request.params.courseID));
  }
}

module.exports = new Courses();
