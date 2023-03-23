const { dropTables, createTables } = require('./utils/manage-tables');

const seed = async () => {
  await dropTables();
  await createTables();
};

module.exports = seed;
