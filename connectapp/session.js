module.exports = function () {
  const listSession = {};
  function getSession(name) {
    return listSession[name];
  }
  function createSession({ username }) {
    listSession[username] = {};
  }
  return {
    listSession,
    getSession,
    createSession,
  };
};
