const { myDataSource } = require("./dataSource");

const save = async (userId, productId) => {
  await myDataSource.query(
    `
    INSERT INTO likes (
      user_id,
      product_id
    )
    VALUES (?, ?)
    `,
    [userId, productId],
  );
};

const findByIds = async (userId, productId) => {
  const [likes] = await myDataSource.query(
    `
    SELECT 
      user_id
    FROM 
      likes
    WHERE 
      user_id = ?
    AND
      product_id = ?
    LIMIT 1
    `,
    [userId, productId],
  );

  return likes;
};

const deleteByIds = async (userId, productId) => {
  await myDataSource.query(
    `
    DELETE FROM likes 
    WHERE 
      user_id = ?
    AND
      product_id = ?
    `,
    [userId, productId],
  );
};

const count = async (productId) => {
  const [result] = await myDataSource.query(
    `
    SELECT 
      COUNT(*) 
    FROM 
      likes
    WHERE
      product_id = ?
    `,
    [productId],
  );

  return result["COUNT(*)"];
};

module.exports = { save, findByIds, deleteByIds, count };
