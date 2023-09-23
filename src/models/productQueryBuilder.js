const sortQuery = (sort) => {
  const sortObject = {
    1: `ORDER BY reviewCount DESC`,
    2: `ORDER BY (SELECT COUNT(*) FROM order_details WHERE product_id = p.id) DESC`,
    3: `ORDER BY p.created_at DESC`,
    4: `ORDER BY p.price DESC`,
    5: `ORDER BY p.price ASC`,
  };

  return sortObject[sort] || `ORDER BY p.id ASC`;
};

const categoryQuery = (category) => {
  return category != 0 && category ? `WHERE p.category_id = ${category}` : "";
};

module.exports = {
  sortQuery,
  categoryQuery,
};
