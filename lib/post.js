function post(content) {
  return {
    method: 'POST',
    data: JSON.stringify(content),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
}

module.exports = post;
