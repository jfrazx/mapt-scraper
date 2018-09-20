var PACKT = /https?\S+\/video\/\w+\/(\w+)\/?(\w+)?\/?(\w+)?/i;

function parseUrl(url) {
  return PACKT.exec(url);
}

module.exports = parseUrl;
