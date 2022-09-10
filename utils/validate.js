module.exports.validateParams = (id) => {
  if (/^-?\d+$/.test(id)) return true;
};

module.exports.validateUser = (id, users) => {
  const findUser = users.find((user) => user.id == id);
  return findUser;
};
