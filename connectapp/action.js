module.exports = function ({ ws, session }) {
  function createUser({ username, password, otd, tokenfa }) {
    const sessionCurent = session.getSession(username);
    if (sessionCurent) ws.send(sessionCurent.sessionId);
    session.createSession({ username });
  }
  return {
    1: createUser,
  };
};
