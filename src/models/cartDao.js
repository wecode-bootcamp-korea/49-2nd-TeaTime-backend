const { myDataSource } = require("./dataSource");

const addCartDao = async (userId, productId, count, isBag, isPacking) => {

    return await myDataSource.query(`
            INSERT INTO carts
            (
                user_id,
                product_id,
                count,
                is_bag,
                is_packing
                )
            VALUES
            (
                ?, ?, ?, ?, ?
                )
            `, [userId, productId, count, isBag, isPacking]);
}

const showCartDao1 = async (userId, cartIds) => {
    const result = await myDataSource.query(`
      SELECT
        MAX(carts.id) AS cart_id,
        carts.product_id,
        SUM(carts.count) AS count,
        MAX(images.image_url) AS image_url,
        MAX(products.name) AS name,
        MAX(products.price) AS price,
        MAX(products.id) AS product_id,
        MAX(products.discount_id) AS discount_id,
        MAX(order_details.is_bag) AS is_bag,
        MAX(order_details.is_packing) AS is_packing,
        MAX(discounts.rate) AS discount_rate
      FROM
        carts
      LEFT JOIN
        products
      ON
        products.id = carts.product_id
      LEFT JOIN
        images
      ON
        images.product_id = carts.product_id
      LEFT JOIN
        order_details
      ON
        order_details.product_id = carts.product_id
      LEFT JOIN
        discounts
      ON
        discounts.product_id = carts.product_id
      WHERE carts.user_id = ? AND carts.id IN (?)
      GROUP BY carts.product_id;
    `, [userId, cartIds]);
    return result;
}


const showCartDao2 = async (userId) => {
    const result = await myDataSource.query(`
        SELECT DISTINCT
          carts.id AS cart_id,
          carts.product_id,
          carts.count,
          images.image_url,
          products.name,
          products.price,
          products.id AS product_id,
          products.discount_id,
          discounts.rate,
          order_details.is_bag,
          order_details.is_packing
        FROM
          carts
        LEFT JOIN
          products
        ON
          products.id = carts.product_id
        LEFT JOIN
          images
        ON
          images.product_id = carts.product_id
        LEFT JOIN
          order_details
        ON
          order_details.product_id = carts.product_id
        LEFT JOIN
          discounts  -- Add discounts table
        ON
          discounts.product_id = carts.product_id
        WHERE carts.user_id = ?;
      `, [userId]);

    return result;
}

const discountPriceDao = async (productId) => {//체크

    await myDataSource.query(`
            SELECT rate FROM discounts WHERE product_id = ?
        `, [productId])
}
const deleteProductsDao = async (cartIds) => {

    await myDataSource.query(`
        DELETE FROM carts WHERE id IN (?)`,
        [cartIds])
}
const existingProductsDao = async (userId, productId) => {
    const result = await myDataSource.query(`
        SELECT * FROM carts WHERE user_id = ? AND product_id = ?
      `, [userId, productId]);

    return result;

};

const updateCountDao = async (count, productId) => {

    await myDataSource.query(`
    UPDATE carts SET count = ? WHERE id=?
    `, [count, productId])
}

const updateCountDao2 = async (count, cartId) => {

    await myDataSource.query(`
    UPDATE carts SET count = ? WHERE id =?
    `, [count, cartId])
}
const findCartByIds = async (cartIds, userId) => {
    return await myDataSource.query(`
        SELECT
            count,
            product_id AS productId,
            is_bag AS isBag,
            is_packing AS isPacking
        FROM
            carts
        WHERE
            id IN (?) AND user_id = ?
    `,
        [cartIds, userId]
    );
}
module.exports = {
    addCartDao,
    showCartDao1,
    showCartDao2,
    discountPriceDao,
    deleteProductsDao,
    existingProductsDao,
    updateCountDao,
    updateCountDao2,
    findCartByIds
}


// 상품, 금액, 할인값, 갯수,사진, 장바구니 갯수