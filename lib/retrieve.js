function id() {
  var element = document.getElementById('packt-parser');
  var id = element.innerText;

  element.remove();
  return id;
}

function video() {
  return document.querySelector('video').src;
}

function chapterDescription() {
  return document
    .getElementById('video-content')
    .nextElementSibling.querySelector('p').innerText;
}

function course() {
  function Base(element) {
    this.element = element;

    this.title = this.element.getElementsByClassName(
      'section-name'
    )[0].innerText;
  }

  function Section(element) {
    var header = element.children[0];
    var chapters = element.children[1];

    Base.call(this, header);

    this.chapters = Array.from(chapters.getElementsByTagName('li')).map(
      function(el) {
        return new Chapter(el);
      }
    );
  }

  function Chapter(element) {
    Base.call(this, element);

    this.address = this.element.getElementsByTagName('a')[0].href;
  }

  function Course() {
    this.sections = Array.from(this.elements).map(function(el) {
      return new Section(el);
    });

    this.title = this.heading;
    this.description = this.desc;
    this.publishedAt = this.date;
    this.author = this.creator;
    this.style = this.approach;
  }

  Object.defineProperties(Course.prototype, {
    elements: {
      get: function() {
        return document
          .getElementsByClassName('tab-pane')[0]
          .getElementsByTagName('ng-repeat');
      },
    },
    attributes: {
      get: function() {
        return Array.from(
          document.getElementById('book-wrapper').getElementsByTagName('h6')
        ).filter(function(el) {
          return /ng-bind/g.test(el.className);
        });
      },
    },
    desc: {
      get: function() {
        return this.about[0].innerText;
      },
    },
    creator: {
      get: function() {
        return this.attributes[0].innerText.replace('By', '').trim();
      },
    },
    date: {
      get: function() {
        return this.attributes[1].innerText;
      },
    },
    approach: {
      get: function() {
        return this.about[1].innerText;
      },
    },
    about: {
      get: function() {
        return Array.from(
          document.getElementById('item-two').getElementsByTagName('h6')
        )
          .find(function(e) {
            return e.innerText === 'About';
          })
          .nextElementSibling.getElementsByTagName('p');
      },
    },
    heading: {
      get: function() {
        return document
          .querySelector('title')
          .innerText.replace('[Video]', '')
          .trim();
      },
    },
  });

  return new Course();
}

module.exports = {
  id: id,
  course: course,
  video: video,
  chapterDescription: chapterDescription,
};
