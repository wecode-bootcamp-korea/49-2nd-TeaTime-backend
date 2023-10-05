const { cartService } = require("../services")


const addProductAtCart = async (req, res) => {
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;
    const { productId, count, isBag, isPackage } = req.body

    await cartService.addCartServices(userId, productId, count, isBag, isPackage)

    res.status(200).json({ "message": "add" })
}

const delProductsAtcart = async (req, res) => {

    const { productIds } = req.body
    await cartService.deleteProductsServices(productIds)

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
    const { cartIds } = req.body
    const total = await cartService.showTotalPriceService(userId, cartIds)
    res.status(200).json({ data: total })
}

const showCartProductTotal = async (req, res) => {
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;
    const totalAtCart = await cartService.showHowManyAtCartSevice(userId)
    res.status(200).json({ data: totalAtCart })
}

const justaddCartCount = async (req, res) => {
    const { count, cartId } = req.body
    await cartService.addCartServices2(count, cartId)
    res.status(200).json({ "message": "upload count" })
}

module.exports = {
    showCartProductTotal,
    addProductAtCart,
    delProductsAtcart,
    showProductsAtcart,
    showTotalPriceAtcart,
    justaddCartCount
}
