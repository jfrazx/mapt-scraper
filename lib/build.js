var parseUrl = require('./parse-url');
var find = require('./shim').find;

module.exports = {
  course: function(course, url) {
    var parsed = parseUrl(url);

    return {
      url: url,
      courseID: parsed[1],
      title: course.title,
      author: course.author,
      style: course.style,
      publishedAt: course.publishedAt,
      description: course.description,
    };
  },

  chapter: function(chapter, sectionID) {
    var parsed = parseUrl(chapter.address);

    return {
      section: sectionID,
      title: chapter.title,
      chapterIndex: chapter.chapterIndex,
      chapterID: parsed[3],
      url: chapter.address,
      description: chapter.description,
      video: chapter.video,
    };
  },

  section: function(section, courseID) {
    return {
      course: courseID,
      title: section.title,
      sectionIndex: section.sectionIndex,
      sectionID: determineSectionID(section),
    };
  },
};

function determineSectionID(section) {
  for (var index = 0; index < section.chapters.length; index++) {
    var chapter = section.chapters[index];
    var parsed = parseUrl(chapter.address);

    if (parsed[2]) {
      return parsed[2];
    }
  }

  throw new Error('Unable to determine Section ID');
}
