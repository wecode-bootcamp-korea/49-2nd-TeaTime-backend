const sortQuery = (sort) => {
  const sortObject = {
    1: `ORDER BY reviewCount DESC`,
    2: `ORDER BY (SELECT COUNT(*) FROM order_details WHERE product_id = products.id) DESC`,
    3: `ORDER BY products.created_at DESC`,
    4: `ORDER BY products.price DESC`,
    5: `ORDER BY products.price ASC`,
  };

  return sortObject[sort] || `ORDER BY products.id DESC`;
};

const categoryQuery = (category) => {
  return category != 0 && category ? `WHERE products.category_id = ${category}` : "";
};

module.exports = {
  sortQuery,
  categoryQuery,
};
