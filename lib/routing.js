function routing(port) {
  var host = 'http://localhost:' + port;
  var courses = host + '/courses/';
  var sections = host + '/sections/';
  var chapters = host + '/chapters/';
  var login = 'https://www.packtpub.com/mapt/login';

  return {
    host: host,
    courses: courses,
    sections: sections,
    chapters: chapters,
    login: login,
  };
}

module.exports = routing;
