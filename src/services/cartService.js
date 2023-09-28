const { addCartDao,
    updateCountDao,
    showCartDao,
    deleteProductsDao,
    existingProductsDao } = require('../models')

const addCartServices = async (userId, productId, count) => {
    const existingProducts = await existingProductsDao(userId, productId)
    if (existingProducts.lenght > 0) {
        const product = existingProducts[0]
        const newCount = product.count + count
        //  const clickCount  = product.count + 1
        await updateCountDao(newCount, product.id)
    } else {
        await addCartDao(userId, productId, 1)
    }
}
const deleteProductsServices = async (cartId, productId) => {
    await deleteProductsDao(cartId, productId)
}

const showCartService = async (userId, cartId) => {
    return await showCartDao(userId, cartId)
}

module.exports = { addCartServices, deleteProductsServices, showCartService }