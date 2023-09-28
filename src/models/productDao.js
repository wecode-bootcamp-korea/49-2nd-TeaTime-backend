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
    LIMIT 8 OFFSET ?
    `,
    [userId, (page - 1) * 8],
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

const findProductByIdWithOther = async (userId, productId) => {
  const [result] = await myDataSource.query(
    `
    SELECT 
      p.id,
      p.name,
      p.price,
      i1.image_url AS mainImageUrl,
      i2.image_url AS subImageUrl, 
      i3.image_urls AS contentImageUrls, 
      d.rate AS discountRate,
      CAST (p.price - d.rate * p.price / 100 AS SIGNED) AS discountPrice,
      EXISTS (SELECT id FROM likes WHERE user_id = ? AND product_id = p.id) AS isLiked,
      (SELECT COUNT(*) FROM reviews WHERE product_id = p.id) AS reviewCount,
      CAST (ROUND ((SELECT AVG(grade) FROM reviews WHERE product_id = p.id), 0) AS SIGNED) AS reviewGradeAvg,
      o.region
    FROM
      products p
    LEFT JOIN 
      discounts d ON d.id = p.discount_id
    LEFT JOIN 
      images i1 ON i1.product_id = p.id AND i1.sort = 1
    LEFT JOIN 
      images i2 ON i2.product_id = p.id AND i2.sort = 2
    LEFT JOIN 
    (
      SELECT 
        product_id,
        JSON_ARRAYAGG(image_url) AS image_urls
      FROM 
        images
      WHERE sort > 2
      GROUP BY product_id
    ) i3 ON i3.product_id = p.id
    LEFT JOIN
      origins o ON o.id = p.origin_id
    WHERE p.id = ?
    LIMIT 1
    `,
    [userId, productId],
  );
  return result;
};

const findProductById = async (productId) => {
  const [result] = await myDataSource.query(
    `
    SELECT
      id
    FROM
      products
    WHERE id = ?
    LIMIT 1
    `,
    [productId],
  );

  return result;
};

const findProductsBest = async (sortQuery) => {
  return await myDataSource.query(
    `
    SELECT 
      p.id,
      p.name,
      p.price,
      i1.image_url AS mainImageUrl,
      i2.image_url AS subImageUrl, 
      d.rate AS discountRate,
      CAST (p.price - d.rate * p.price / 100 AS SIGNED) AS discountPrice
    FROM
      products p
    LEFT JOIN 
      discounts d ON d.id = p.discount_id
    LEFT JOIN 
      images i1 ON i1.product_id = p.id AND i1.sort = 1
    LEFT JOIN 
      images i2 ON i2.product_id = p.id AND i2.sort = 2
    ${sortQuery}
    LIMIT 12
    `,
  );
};

module.exports = {
  findProducts,
  countProducts,
  findProductByIdWithOther,
  findProductById,
  findProductsBest,
};
