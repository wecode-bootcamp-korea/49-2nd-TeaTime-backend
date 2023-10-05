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
  `)
};

const getUserByName = async (name) => {
  const [user] = await myDataSource.query(`
  SELECT id, name FROM users WHERE name = '${name}'
  `);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await myDataSource.query(`
  SELECT id, email FROM users WHERE email = '${email}'
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

const updatePoint = async(point, userId) => {
  await myDataSource.query(`
    UPDATE users SET point = ? WHERE id = ?
  `,
  [point, userId]
  )
}

module.exports = { 
  findById,
  getUserByName,
  signupUser,
  getUserByEmail,
  getUserByNumber,
  getUserById,
  updatePoint
 };