const { myDataSource } = require("./dataSource");

const addCartDao = async (userId, productId, count) => {

    return await myDataSource.query(`
            INSERT INTO cart
            (
                user_id,
                product_id,
                count
                )
            VALUES
            (
                ?,?,?
                )
            `[userId, productId, count])
}
const showCartDao = async (userId) => {
    return await myDataSource.query(`
        SELECT 
            cart.id,
            cart.product_id,
            cart.count,
            products.name,
            products.price,
            products.id
        FROM
            cart
        LEFT JOIN
            products
        ON
            products.id = cart.product_id
        WHERE cart.user_id = ?;   
        `, [userId])
}
const discountPriceDao = async (productId) => {

    await myDataSource.query(`
            SELECT rate FROM discounts WHERE product_id = ?
        `, [productId])
}
const deleteProductsDao = async (productId) => {

    await myDataSource.query(`
            DELETE FROM cart WHERE cart_id = ?`,
        [cartId])
}
const existingProductsDao = async (userId, productId) => {

    await myDataSource.query(`
        SELECT*FROM cart WHERE user_id =? AND prduct_id =? 
        `, [userId, productId])
}
const updateCountDao = async (count, productId) => {

    await myDataSource.query(`
    UPDATE cart SET count = ? WHERE id=?
    `, [count, productId])
}
module.exports = {
    addCartDao, showCartDao, discountPriceDao, deleteProductsDao, existingProductsDao, updateCountDao
}


// 상품, 금액, 할인값, 갯수,사진, 장바구니 갯수