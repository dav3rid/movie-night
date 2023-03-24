const db = require('../db/connection');

exports.selectCertificates = async () => {
  const { rows: certificates } = await db.query(`
  SELECT * FROM certificates;
  `);
  return certificates;
};
