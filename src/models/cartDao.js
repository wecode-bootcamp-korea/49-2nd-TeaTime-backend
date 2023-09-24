const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})
myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error occurred during Data Source initialization", err);
        myDataSource.destroy();
    });
const addCartDao = async (userId, productId, count) => {
    try {
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
    } catch (err) {
        const error = new Error("Error Dao")
        error.statusCode = 500
        throw error
    }
}
const showCartDao = async () => {
    try {
        return await myDataSource.query(`
        SELECT 
            cart.id,
            cart.product_id,
            cart.count,
            products.name,
            products.price,
            products.id
        FROM 
            cart, products
        WHERE 
            products.id = cart.product_id;   
        `)
    } catch (err) {
        const error = new Error("Error Dao")
        error.statusCode = 500
        throw error
    }
}
const discountPriceDao = async (productId) => {
    try {
        await myDataSource.query(`
            SELECT rate FROM discounts WHERE product_id = ?
        `, [productId])
    } catch (err) {
        const error = new Error("Error Dao")
        error.statusCode = 500
        throw error
    }
}
const deleteProductsDao = async (productId) => {
    try {
        await myDataSource.query(`
            DELETE FROM cart WHERE product_id = ?`,
            [productId])
    } catch (err) {
        const error = new Error("Error Dao")
        error.statusCode = 500
        throw error
    }
}
const existingProductsDao = async (userId, productId) => {
    try {
        await myDataSource.query(`
        SELECT*FROM cart WHERE user_id =? AND prduct_id =? 
        `, [userId, productId])
    } catch (err) {
        const error = new Error("Error Dao")
        error.statusCode = 500
        throw error
    }
}
const updateCountDao = async (count, productId) => {
    try {
        await myDataSource.query(`
    UPDATE cart SET count = ? WHERE id=?
    `, [count, productId])
    } catch (err) {
        const error = new Error("Error Dao")
        error.statusCode = 500
        throw error
    }
}

module.exports = {
    addCartDao, showCartDao, discountPriceDao, deleteProductsDao, existingProductsDao, updateCountDao
}


// 상품, 금액, 할인값, 갯수,사진, 장바구니 갯수