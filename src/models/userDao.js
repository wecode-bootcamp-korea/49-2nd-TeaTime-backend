const { myDataSource } = require("./dataSource");

const findById = async (id) => {
  const [user] = await myDataSource.query(
    `
    SELECT 
      *
    FROM 
      users
    WHERE 
      id = ?
    `,
    [id],
  );

  return user;
};

const findByUserId = async (userId) => {
  const user = await myDataSource.query(
    `
    SELECT
      id
    FROM
      users
    WHERE
      id = ?
    `,
    [userId]
  );

  return user[0];
};

const signupUser = async (name, login_id, password, email, phone_number, is_agree) => {
  await myDataSource.query(`
  INSERT INTO users (
      name,
      login_id,
      password,
      email,
      phone_number,
      is_agree,
      is_delete
        ) VALUES (
            '${name}',
            '${login_id}',
            '${password}',
            '${email}',
            '${phone_number}',
            '${is_agree}',
            0 -- 'is_delete'
        )
  `);
};

const getUserByName = async (name) => {
  const [user] = await myDataSource.query(`
  SELECT id, name FROM users WHERE name = '${name}'
  `);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await myDataSource.query(`
  SELECT id, name, email FROM users WHERE email = '${email}'
  `);
  return user;
};

const getUserByNumber = async (phone_number) => {
  const user = await myDataSource.query(`
  SELECT id, phone_number FROM users WHERE phone_number = '${phone_number}'
  `);
  return user;
};

const getUserById = async (login_id) => {
  const user = await myDataSource.query(`
  SELECT id, login_id, password FROM users WHERE login_id = '${login_id}'
  `);
  return user;
};

const createDeliveryAddress = async (address, detailAddress, zipCode, name, isMain, userId, phoneNumber, subName) => {

    await myDataSource.query(`
    INSERT INTO delivery_addresses (
      address, 
      detail_address, 
      zip_code,
      name,
      is_main,
      user_id,
      phone_number,
      sub_name
        )VALUES
        (?,?,?,?,?,?,?,?)
    `, [address, detailAddress, zipCode, name, isMain, userId, phoneNumber, subName]);
};

const getDeliveryAddressById = async (userId) => {
  const user = await myDataSource.query(
    `SELECT 
    id, 
    address, 
    detail_address AS detailAddress, 
    zip_code AS zipCode, 
    name,
    is_main AS isMain, 
    user_id AS userId, 
    phone_number AS phoneNumber,
    sub_name AS subName 
    FROM 
    delivery_addresses 
    WHERE 
    user_id = ?`,
    [userId]
  )
  return user
};

const updateDeliveryAddress = async (userId) => {
  const user = await myDataSource.query(
    `
    UPDATE delivery_addresses
    SET is_main = 0
    WHERE user_id = ?;
    `,
    [userId]
  )
  return user;
}

const deleteDeliveryAddress = async (deliveryAddressId) => {
  const user = await myDataSource.query(`
  DELETE FROM delivery_addresses
  WHERE id = ?
`, [deliveryAddressId])
return user
}

module.exports = {
  findById,
  findByUserId,
  getUserByName,
  signupUser,
  getUserByEmail,
  getUserByNumber,
  getUserById,
  createDeliveryAddress,
  getDeliveryAddressById,
  updateDeliveryAddress,
  deleteDeliveryAddress
};