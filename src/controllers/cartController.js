const { cartService } = require("../services")

const addProductAtCart = async (req, res) => {
    const { userId, productId, count } = req.body

    await cartService.addCartServices(userId, productId, count)

    res.status(200).json({ "message": "add" })
}

const delProductsAtcart = async (req, res) => {
    const { cartId, productId } = req.body
    await cartService.deleteProductsServices(cartId, productId)

    res.status(200).json({ "message": "delete" })
}

const showProductsAtcart = async (req, res) => {
    const { userId, cartId } = req.body

    const cartInFo = await cartService.showCartService(userId, cartId)

    res.status(200).json({ data: cartInFo })
}

const showTotalPriceAtcart = async (req, res) => {
    const { userId, cartId } = req.body
    const total = await cartService.showTotalPriceService(userId, cartId)
    res.status(200).json({ data: total })
}

module.exports = {
    addProductAtCart,
    delProductsAtcart,
    showProductsAtcart,
    showTotalPriceAtcart
}
