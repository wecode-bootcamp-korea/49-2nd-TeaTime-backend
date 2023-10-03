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
        await updateCountDao(newCount, product.id)
    } else {
        await addCartDao(userId, productId, count)
    }
}

const showTotalPriceService = async (userId, cartId) => {


    async function calculateTotal(userId, cartId) {
        const allPriceAtCart = showCartDao(userId, cartId)
        let total = 0

        for (let i = 0; i < allPriceAtCart.lenght; i++) {
            const productPrice = allPriceAtCart[i].price
            total += productPrice

        }
        return total
    }
    return calculateTotal(userId, cartId)
    // 계산완료
    // 추가로 정보를 무엇을 보내줘야할지 알아야함.
}

const deleteProductsServices = async (cartId, productId) => {
    await deleteProductsDao(cartId, productId)
}

const showCartService = async (userId, cartId) => {
    return await showCartDao(userId, cartId)
}

module.exports = { addCartServices, deleteProductsServices, showCartService, showTotalPriceService }