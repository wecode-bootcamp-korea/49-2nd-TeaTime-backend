const { cartDao } = require('../models')
const { throwError } = require("../utils/throwError");

const addCartServices = async (userId, productId, count) => {
    const existingProducts = await cartDao.existingProductsDao(userId, productId)

    if (existingProducts.lenght > 0) {
        const product = existingProducts[0]
        const newCount = product.count + count
        await cartDao.updateCountDao(newCount, product.id)
    } else {
        await cartDao.addCartDao(userId, productId, count)
    }
    if (!existingProducts) throwError(404, "오류 addCartServivces")
}

const showTotalPriceService = async (userId) => {
    const cartItems = await cartDao.showCartDao(userId);

    let total = 0;

    for (const item of cartItems) {
        const productPrice = item.price;
        const productCount = item.count;
        total += productPrice * productCount;

        return total;
    }
}

const showHowManyAtCartSevice = async (userId) => {
    const cartItems = await cartDao.showCartDao(userId).lenght;
    return cartItems
}

const deleteProductsServices = async (productId) => {
    await cartDao.deleteProductsDao(productId)
}

const showCartService = async (userId) => {
    return await cartDao.showCartDao(userId)
}
module.exports = { addCartServices, deleteProductsServices, showCartService, showTotalPriceService, showHowManyAtCartSevice }