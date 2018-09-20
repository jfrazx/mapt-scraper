function find(array, callback) {
  for (var index = 0; index < array.length; index++) {
    if (callback(array[index], index)) {
      return array[index];
    }
  }
}

module.exports = {
  find: find,
};
