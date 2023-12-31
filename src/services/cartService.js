const { cartDao } = require("../models");
const { deleteProductsDao } = require("../models/cartDao");
const { throwError } = require("../utils/throwError");

const addCartServices = async (userId, productId, count, isBag, isPacking) => {
    const existingProducts = await cartDao.existingProductsDao(userId, productId);

    if (existingProducts && existingProducts.length > 0) {
        const product = existingProducts[0];
        const newCount = product.count + count;
        await cartDao.updateCountDao(newCount, product.id);
    } else {
        await cartDao.addCartDao(userId, productId, count, isBag, isPacking);
    }

    if (!existingProducts) throwError(404, "오류 addCartServivces");
};

const addCartServices2 = async (count, cartId) => {
    await cartDao.updateCountDao2(count, cartId);
}

const showTotalPriceService = async (userId, cartIds) => {
    const cartItems = await cartDao.showCartDao1(userId, cartIds);
    // showcart에 가방값,포장값,할인값 추가
    let total = 0;
    let productPriceTotal = 0;
    let productDiscountTotal = 0;
    let bagPriceTotal = 0;
    let packagePriceTotal = 0;

    for (const item of cartItems) {
        const productPrice = item.price;
        const productCount = item.count;
        const productDiscount = item.discount_rate || 0;
        const bagPrice = item.is_bag === 1 ? 100 : 0;
        const packagePrice = item.is_packing === 1 ? 2000 : 0;

        productPriceTotal += productPrice * productCount;
        productDiscountTotal += productDiscount * productCount;
        bagPriceTotal += bagPrice * productCount;
        packagePriceTotal += packagePrice * productCount;
        total += (productPrice - productDiscount + bagPrice + packagePrice) * productCount;
    }

    return {
        productPriceTotal,
        productDiscountTotal,
        bagPriceTotal,
        packagePriceTotal,
        total,
    };
};

const showHowManyAtCartSevice = async (userId) => {
    const cartItems = await cartDao.showCartDao2(userId);
    const cartItemCount = cartItems.length;
    return cartItemCount;
}

const deleteProductsServices = async (cartIds) => {
    const productIdsToDelete = cartIds;
    await deleteProductsDao(productIdsToDelete);
};

const showCartService = async (userId) => {
    const productInfo = await cartDao.showCartDao2(userId);

    productInfo.forEach((product) => {
        const discountRate = product.discount_rate || 0;
        const price = product.price || 0;
        const discountPrice = price * discountRate / 100
        product.discountPrice = discountPrice;


    });
    return {
        productInfo
    };
}
module.exports = { addCartServices, deleteProductsServices, showCartService, showTotalPriceService, showHowManyAtCartSevice, addCartServices2 }