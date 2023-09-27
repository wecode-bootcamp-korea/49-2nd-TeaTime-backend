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
const deleteProductsServices = async (cartId) => {
    await deleteProductsDao(cartId)
}

const showCartService = async (userId) => {
    return await showCartDao(userId)
}

module.exports = { addCartServices, deleteProductsServices, showCartService }