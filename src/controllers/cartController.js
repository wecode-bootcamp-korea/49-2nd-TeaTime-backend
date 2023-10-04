const { cartService } = require("../services")


const addProductAtCart = async (req, res) => {
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;
    const { productId, count } = req.body

    await cartService.addCartServices(userId, productId, count)

    res.status(200).json({ "message": "add" })
}

const delProductsAtcart = async (req, res) => {

    const { productId } = req.body
    await cartService.deleteProductsServices(productId)

    res.status(200).json({ "message": "delete" })
}

const showProductsAtcart = async (req, res) => {
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;

    const cartInFo = await cartService.showCartService(userId)

    res.status(200).json({ data: cartInFo })
}

const showTotalPriceAtcart = async (req, res) => {
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;
    const total = await cartService.showTotalPriceService(userId)
    res.status(200).json({ data: total })
}

module.exports = {
    addProductAtCart,
    delProductsAtcart,
    showProductsAtcart,
    showTotalPriceAtcart
}
