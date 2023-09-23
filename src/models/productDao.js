const { myDataSource } = require("./dataSource");

const findProducts = async (userId, categoryQuery, sortQuery, page) => {
  return await myDataSource.query(
    `
    SELECT 
      p.id,
      p.name,
      p.price,
      i1.image_url AS mainImageUrl,
      i2.image_url AS subImageUrl, 
      d.rate AS discountRate,
      CAST (p.price - d.rate * p.price / 100 AS SIGNED) AS discountPrice,
      EXISTS (SELECT id FROM likes WHERE user_id = ? AND product_id = p.id) AS isLiked,
      (SELECT COUNT(*) FROM likes WHERE product_id = p.id) AS likeCount,
      (SELECT COUNT(*) FROM reviews WHERE product_id = p.id) AS reviewCount
    FROM
      products p
    LEFT JOIN 
      discounts d ON d.id = p.discount_id
    LEFT JOIN 
      images i1 ON i1.product_id = p.id AND i1.sort = 1
    LEFT JOIN 
      images i2 ON i2.product_id = p.id AND i2.sort = 2
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
      products p
    ${categoryQuery}
    `,
  );

  return result["COUNT(*)"];
};

module.exports = {
  findProducts,
  countProducts,
};
