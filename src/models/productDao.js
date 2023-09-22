const { myDataSource } = require("./dataSource");

const findProducts = async (userId, categoryQuery, sortQuery, page) => {
  return await myDataSource.query(
    `
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
    ${categoryQuery}
    ${sortQuery}
    LIMIT 20 OFFSET ?
    `,
    [userId, (page - 1) * 20],
  );
};

const countProducts = async (categoryQuery) => {
  const [result] = await myDataSource.query(
    `
    SELECT 
      COUNT(*)
    FROM
      products
    ${categoryQuery}
    `,
  );

  return result["COUNT(*)"];
};

module.exports = {
  findProducts,
  countProducts,
};
