let users = [];

// Join user to chat

const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

// Get the current user
const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

const userLeave = (id) => {
  users = users.filter((user) => user.id === id);
};

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
