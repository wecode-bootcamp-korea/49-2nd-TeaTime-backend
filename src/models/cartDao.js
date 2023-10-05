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
            `[userId, productId, count, isBag, isPacking]);
}

const showCartDao = async (userId, cartIds) => { // 할인율 체크
    return await myDataSource.query(`
    SELECT
        carts.id AS cart_id,
        carts.product_id,
        carts.count,
        images.image_url,
        products.name,
        products.price,
        products.discount,
        products.id AS product_id,
        products.discount_id,
        order_details.is_bag,
        order_details.is_package
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
    WHERE carts.user_id = ? AND carts.id IN (?);

    `, [userId, cartIds]);
}
const discountPriceDao = async (productId) => {//체크

    await myDataSource.query(`
            SELECT rate FROM discounts WHERE product_id = ?
        `, [productId])
}
const deleteProductsDao = async (cartIds) => {

    await myDataSource.query(`
        DELETE FROM carts WHERE cart_id IN (?)`,
        [cartIds])
}
const existingProductsDao = async (userId, productId) => {

    await myDataSource.query(`
        SELECT*FROM carts WHERE user_id =? AND product_id =? 
        `, [userId, productId])
}
const updateCountDao = async (count, cartId) => {

    await myDataSource.query(`
    UPDATE carts SET count = ? WHERE cart_id=?
    `, [count, cartId])// cartid
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
    showCartDao,
    discountPriceDao,
    deleteProductsDao,
    existingProductsDao,
    updateCountDao,
    findCartByIds
}


// 상품, 금액, 할인값, 갯수,사진, 장바구니 갯수