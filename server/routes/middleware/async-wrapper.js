function wrapper(callback) {
  return (request, response, next) => {
    callback(request, response, next).catch(error => {
      console.log(
        `An error occured processing request from ${request.url} ===>`,
        error
      );

      next(error);
    });
  };
}

module.exports = wrapper;
