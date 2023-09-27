const { cartService } = require("../services")

const addProductAtCart = async (req, res) => {
    const { userId, cartId, productId, count } = req.body

    await cartService.addCartServices(userId, cartId, productId, count)

    res.status(200).json({ "message": "add" })
}

const delProductsAtcart = async (req, res) => {
    const { userId, cartId, productId } = req.body
    await cartService.deleteProductsServices(userId, cartId, productId)

    res.status(200).json({ "message": "delete" })
}

const showProductsAtcart = async (req, res) => {
    const { userId, cartId } = req.body

    const cartInFo = await cartService.showCartService(userId, cartId)

    res.status(200).json({ data: cartInFo })
}

module.exports = { addProductAtCart, delProductsAtcart, showProductsAtcart }
