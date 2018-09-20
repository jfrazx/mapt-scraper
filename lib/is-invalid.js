function isInvalid() {
  return Array.prototype.slice.call(arguments).reduce(function(memo, value) {
    return memo || isUndef(value);
  }, false);
}

function isUndef(value) {
  return isUndefined(value) || undefinedString(value);
}

function isUndefined(value) {
  return value === undefined;
}

function undefinedString(value) {
  return value === 'undefined';
}

module.exports = isInvalid;
