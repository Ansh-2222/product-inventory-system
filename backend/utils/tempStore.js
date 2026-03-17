const tempUsers = new Map();

export const saveTempUser = (email, data) => {
  tempUsers.set(email, data);

  // auto delete after 5 mins
  setTimeout(() => {
    tempUsers.delete(email);
  }, 5 * 60 * 1000);
};

export const getTempUser = (email) => {
  return tempUsers.get(email);
};

export const deleteTempUser = (email) => {
  tempUsers.delete(email);
};