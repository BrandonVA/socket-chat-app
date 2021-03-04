const formatMessage = (username, text) => {
  // const  time = new Date().toLocaleTimeString()
  return {
    username,
    text,
    time: new Date().toLocaleTimeString(),
  };
};

module.exports = formatMessage;
