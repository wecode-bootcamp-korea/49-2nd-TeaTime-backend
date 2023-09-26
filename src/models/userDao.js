const { myDataSource } = require("./dataSource");

const findById = async (id) => {
  const [user] = await myDataSource.query(
    `
    SELECT 
      *
    FROM 
      users
    WHERE 
      id = ?
    `,
    [id],
  );

  return user;
};

module.exports = { findById };
