const { myDataSource } = require("./dataSource");

const findProducts = async (userId, page, category, sort) => {
  let query = `
  SELECT 
    products.id,
    products.name,
    products.price,
    (SELECT image_url FROM images WHERE images.product_id = products.id AND sort = 1) AS mainImageUrl,
    (SELECT image_url FROM images WHERE images.product_id = products.id AND sort = 2) AS subImageUrl, 
    discounts.rate AS discountRate,
    CAST (products.price - discounts.rate * products.price / 100 AS SIGNED) AS discountPrice,
    EXISTS (SELECT id FROM likes WHERE user_id = ? AND product_id = products.id) AS isLiked,
    (SELECT COUNT(*) FROM likes WHERE product_id = products.id) AS likeCount,
    (SELECT COUNT(*) FROM reviews WHERE product_id = products.id) AS reviewCount
  FROM
    products
  LEFT JOIN 
    discounts
  ON discounts.id = products.discount_id
  `;

  const parameters = [userId];

  if (category) {
    query += ` WHERE products.category_id = ?`;
    parameters.push(category);
  }

  switch (sort) {
    case "1":
      query += ` ORDER BY reviewCount DESC`;
      break;
    case "2":
      query += ` ORDER BY (SELECT COUNT(*) FROM order_details WHERE product_id = products.id) DESC`;
      break;
    case "3":
      query += ` ORDER BY products.created_at DESC`;
      break;
    case "4":
      query += ` ORDER BY products.price DESC`;
      break;
    case "5":
      query += ` ORDER BY products.price ASC`;
      break;
    default:
      query += ` ORDER BY products.id DESC`;
  }

  if (page) {
    query += ` LIMIT 20 OFFSET ?`;
    parameters.push((page - 1) * 20);
  }

  return await myDataSource.query(query, parameters);
};

const countProducts = async (category) => {
  let query = `
    SELECT 
      COUNT(*)
    FROM
      products
    `;

  const parameters = [];
  if (category) {
    query += ` WHERE products.category_id = ?`;
    parameters.push(category);
  }
  const [result] = await myDataSource.query(query, parameters);

  return result["COUNT(*)"];
};

module.exports = {
  findProducts,
  countProducts,
};
