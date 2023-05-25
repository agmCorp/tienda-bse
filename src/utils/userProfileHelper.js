const getName = (tokenParsed) => {
  return tokenParsed?.name;
};

const getEmail = (tokenParsed) => {
  return tokenParsed?.email;
};

const getDocumentType = (tokenParsed) => {
  return tokenParsed?.preferred_username.split("#")[0].toUpperCase();
};

const getDocument = (tokenParsed) => {
  return tokenParsed?.preferred_username.split("#")[1];
};

export { getName, getEmail, getDocumentType, getDocument };
