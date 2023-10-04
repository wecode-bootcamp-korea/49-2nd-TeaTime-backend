const whereQuery = (image) => {
  return image != 0 && image ? "AND r.image_url IS NOT NULL" : "";
};

module.exports = {
  whereQuery,
};
