const whereQuery = (image, isCount) => {
  if (isCount) return image != 0 && image ? "WHERE r.image_url IS NOT NULL" : "";

  return image != 0 && image ? "AND r.image_url IS NOT NULL" : "";
};

module.exports = {
  whereQuery,
};
