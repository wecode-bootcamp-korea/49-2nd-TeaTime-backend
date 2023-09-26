
const { cartService } = require('../services')


const cartProducts = async (req, res) => {
    const productsUser = req.body
    await cartService.getProducts(productsUser)
    return res.status(200).json({ data: productId, count, userId })
}


module.exports = { cartProducts }