const {myDataSource} = require('./dataSource');

const createOrder = async (
  payments, totalFee, isShippingFee, isAgree, userId, name, phoneNumber, email,
  address, detailAddress, zipCode,
  count, status, isBag, isPacking, productId
) => {
  await myDataSource.transaction(async (transactionManager) => {
    const { insertId:orderId } = await transactionManager.query(`
      INSERT INTO orders (
        payments,
        total_fee,
        is_shipping_fee,
        is_agree,
        user_id,
        name, 
        phone_number,
        email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [payments, totalFee, isShippingFee, isAgree, userId, name, phoneNumber, email]
    );
  
    await transactionManager.query(`
        INSERT INTO order_addresses (
          address,
          detail_address,
          zip_code,
          order_id
        ) VALUES (?, ?, ?, ?)`,
      [address, detailAddress, zipCode, orderId]
    );
    await transactionManager.query(`
        INSERT INTO order_details (
          count,
          status,
          is_bag,
          is_packing,
          product_id,
          order_id
        ) VALUES (?, ?, ?, ?, ?, ?)`,
      [count, status, isBag, isPacking, productId, orderId]
     );
  });
};

const cartOrder = async(
  payments, totalFee, isShippingFee, isAgree, userId, name, phoneNumber, email,
  address, detailAddress, zipCode, orders, cartIds
  ) => {
    await myDataSource.transaction(async (transactionManager) => {
      const { insertId:orderId } = await transactionManager.query(`
        INSERT INTO orders (
          payments,
          total_fee,
          is_shipping_fee,
          is_agree,
          user_id,
          name, 
          phone_number,
          email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [payments, totalFee, isShippingFee, isAgree, userId, name, phoneNumber, email]
      );
    
    await transactionManager.query(`
        INSERT INTO order_addresses (
          address,
          detail_address,
          zip_code,
          order_id
        ) VALUES (?, ?, ?, ?)`,
      [address, detailAddress, zipCode, orderId]
    );
    for (const order of orders) {
      const {count, status, isBag, isPacking, productId} = order;
      await transactionManager.query(`
          INSERT INTO order_details (
            count,
            status,
            is_bag,
            is_packing,
            product_id,
            order_id
          ) VALUES (?, ?, ?, ?, ?, ?)`,
        [count, status, isBag, isPacking, productId, orderId]
      );
    }

    await transactionManager.query(`
        DELETE FROM 
          carts 
        WHERE 
          id IN (?)`,
      [cartIds]
    );
  });
};

const getOrderList = async(userId) => {
  console.log("userid",userId)

  const result = await myDataSource.query(
    `
      SELECT
        od.count,
        od.status,
        od.is_bag AS isBag,
        od.is_packing AS isPacking,
        od.product_id AS productId,
        od.order_id AS orderId,
        o.name,
        o.phone_number AS phoneNumber,
        o.total_fee AS totalFee,
        oa.address,
        oa.detail_address AS detailAddress,
        oa.zip_code AS zipCode,
        p.name
      FROM 
        order_details od
      LEFT JOIN
        orders o ON od.order_id = o.id
      LEFT JOIN
        order_addresses oa ON oa.order_id = o.id
      LEFT JOIN
        products p ON od.product_id = p.id
      WHERE o.user_id = ?
    `,
    [userId]
  );
  console.log("result", result)

  return result;
};

module.exports = {
  createOrder,
  getOrderList,
  cartOrder
};