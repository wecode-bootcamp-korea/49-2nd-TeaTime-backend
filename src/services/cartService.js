const { addCartDao,
        updateCountDao,
        showCartDao,
        deleteProductsDao,
        existingProductsDao } = require('../models')

const addCartServices = async (userId, productId) => {
    try {
        const existingProducts = await existingProductsDao(userId, productId)
        if (existingProducts.lenght > 0) {
            const product = existingProducts[0]
            const newCount = product.count + 1

            await updateCountDao(newCount, product.id)
        } else {
            await addCartDao(userId, productId, 1)
        }
    } catch (err) {
        const error = new Error("Error services")
        error.statusCode = 500
        throw error
    }
}
const deleteProductsServices = async (productId) => {
    try {
        const products = await showCartDao(productId)
        if (products[0].count === 1) {
            await deleteProductsDao(productId)
        }
    } catch (err) {
        const error = new Error("Error services")
        error.statusCode = 500
        throw error
    }
}

module.exports = { addCartServices, deleteProductsServices }