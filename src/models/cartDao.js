const { myDataSource } = require("./dataSource");

const addCartDao = async (userId, productId, count, isBag, isPackage) => {

    return await myDataSource.query(`
            INSERT INTO carts
            (
                user_id,
                product_id,
                count,
                isbag,
                ispackage
                )
            VALUES
            (
                ?,?,?,?,?
                )
            `[userId, productId, count, isBag, isPackage])
}

const showCartDao = async (userId) => {
    return await myDataSource.query(`
    SELECT
        carts.id AS cart_id,
        carts.product_id,
        carts.count,
        images.image_url,
        products.name,
        products.price,
        products.id AS product_id
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
    WHERE carts.user_id = ?;

    `, [userId]);
}
const discountPriceDao = async (productId) => {

    await myDataSource.query(`
            SELECT rate FROM discounts WHERE product_id = ?
        `, [productId])
}
const deleteProductsDao = async (productId) => {

    await myDataSource.query(`
            DELETE FROM carts WHERE product_id = ?`,
        [productId])
}
const existingProductsDao = async (userId, productId) => {

    await myDataSource.query(`
        SELECT*FROM carts WHERE user_id =? AND prduct_id =? 
        `, [userId, productId])
}
const updateCountDao = async (count, productId) => {

    await myDataSource.query(`
    UPDATE carts SET count = ? WHERE id=?
    `, [count, productId])
}
module.exports = {
    addCartDao,
    showCartDao,
    discountPriceDao,
    deleteProductsDao,
    existingProductsDao,
    updateCountDao
}


// 상품, 금액, 할인값, 갯수,사진, 장바구니 갯수