const { myDataSource } = require("./dataSource");

const findReviewByProductId = async (userId, productId, whereQuery, page) => {
  return await myDataSource.query(
    `
    SELECT
      u.login_id AS loginId,
      r.content,
      r.grade,
      DATE_FORMAT(r.created_at, '%Y.%m.%d') AS createdAt,
      r.image_url AS imageUrl,
      EXISTS (SELECT id FROM reviews WHERE user_id = ? AND id = r.id) AS isMyReview
    FROM
      reviews r
    LEFT JOIN
      users u ON u.id = r.user_id
    WHERE
      r.product_id = ?
    ${whereQuery}
    LIMIT 10 OFFSET ?
    `,
    [userId, productId, (page - 1) * 10],
  );
};

const countReviews = async (whereQuery) => {
  const [result] = await myDataSource.query(
    `
    SELECT 
      COUNT(*)
    FROM
      reviews r
    ${whereQuery}
    `,
  );

  return result["COUNT(*)"];
};

module.exports = {
  findReviewByProductId,
  countReviews,
};
