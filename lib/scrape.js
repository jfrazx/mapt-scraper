#!/usr/bin/env casperjs

var casper = require('casper').create({
  'web-security': 'no',
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
    loadImages: false,
    loadPlugins: true,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36',
  },
});

var isInvalid = require('./is-invalid');
var dump = require('utils').dump;

var PORT = isInvalid(casper.cli.options.port) ? 8000 : casper.cli.options.port;
var PASSWORD = casper.cli.options.password;
var EMAIL = casper.cli.options.email;
var COURSE_SELECTOR = '#item-two';
var CHAPTER_SELECTOR = 'video';

var url = isInvalid(casper.cli.options.url)
  ? 'https://www.packtpub.com/mapt/video/application_development/9781789344851'
  : casper.cli.options.url;

if (isInvalid(PASSWORD, EMAIL, url)) {
  casper.echo('ERROR: you must supply your login credentials and a url');
  casper.exit();
}

var signIn = require('./sign-in');
var route = require('./routing')(PORT);

var retrieve = require('./retrieve');
var build = require('./build');
var post = require('./post');

var course;

casper.start(route.login, login());

casper.on('page.error', function(msg, trace) {
  this.echo('Page Error: ' + msg, 'ERROR');
});

casper.waitForSelector('#learning-learning', function() {
  console.log('taking picture');
  this.capture('images/loggedIn.png');
});

casper.waitFor(function() {
  return this.open(url);
});

casper.waitForSelector(COURSE_SELECTOR, function() {
  var sectionIndex = 0;
  course = this.evaluate(retrieve.course);

  this.capture('images/getCourse.png');

  this.eachThen(course.sections, function(response) {
    var section = response.data;
    var chapterIndex = 0;

    console.log('section index');
    console.log(section === course.sections[sectionIndex]);
    section.sectionIndex = ++sectionIndex;

    this.eachThen(section.chapters, function(response) {
      var chapter = response.data;
      console.log('chapter index');
      console.log(chapter === section.chapters[chapterIndex]);

      this.thenOpen(chapter.address, function() {
        this.waitForSelector(CHAPTER_SELECTOR, function() {
          this.capture(
            'images/chapter-' + sectionIndex + '-' + chapterIndex + '.png'
          );

          chapter.video = this.evaluate(retrieve.video);
          chapter.description = this.evaluate(retrieve.chapterDescription);
          chapter.chapterIndex = ++chapterIndex;
        });
      });
    });
  });
});

casper.then(function() {
  var content = build.course(course, url);

  this.thenOpen(route.courses, post(content), function() {
    console.log('posted courses');
    var result = JSON.parse(this.getPageContent());
    course._id = result._id;

    console.log('courseID', course._id);

    this.eachThen(course.sections, handleSection(course));
  });
});

function handleSection(course) {
  return function(response) {
    var section = response.data;
    var content = build.section(section, course._id);

    casper.thenOpen(route.sections, post(content), function() {
      var result = JSON.parse(this.getPageContent());
      section._id = result._id;

      casper.eachThen(section.chapters, handleChapter(section));
    });
  };
}

function handleChapter(section) {
  return function(response) {
    var chapter = response.data;
    var content = build.chapter(chapter, section._id);

    casper.thenOpen(route.chapters, post(content), function() {
      var result = JSON.parse(this.getPageContent());

      console.log('Result posting chapter ', result);

      chapter._id = result._id;
    });
  };
}

function login() {
  var args = Array.prototype.slice.call(arguments);

  return function() {
    this.waitForSelector('#login-form').then(function() {
      this.evaluate(signIn, EMAIL, PASSWORD);

      console.log('evaluating login form');

      // this.fill(
      //   'form#form-login',
      //   {
      //     email: EMAIL,
      //     password: PASSWORD,
      //   },
      //   true
      // );

      if (args.length) {
        next.apply(casper, args);
      }
    });
  };
}

function next(callback, content, fail) {
  callback.call(this, content);
}

casper.run(function() {
  console.log('Course title ' + course.title);
  course.sections.forEach(function(section, _index) {
    console.log('Section title' + section.title);
    section.chapters.forEach(function(chapter, _index) {
      console.log(chapter.title + ' === ' + chapter.address);
    });
  });
});
