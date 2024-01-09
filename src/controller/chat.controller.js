const { pool } = require('../database');

// const getChat = async (req, res) => {
//   try {
//     const chatId = req.params.id_chat;

//     const sql = `
//       SELECT
//         chat.id_chat,
//         message.id_message,
//         message.text,
//         message.sender,
//         message.timestamp,
//         user1.name AS user1_name,
//         user1.photo AS user1_photo,
//         user2.name AS user2_name,
//         user2.photo AS user2_photo
//       FROM
//         chat
//       LEFT JOIN
//         message ON chat.id_chat = message.id_chat
//       JOIN
//         users AS user1 ON chat.user1 = user1.id_user
//       JOIN
//         users AS user2 ON chat.user2 = user2.id_user
//       WHERE
//         chat.id_chat = ?`;
//     const results = await pool.query(sql, [chatId]);
//     res.json(results);
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ error: 'An error occurred while getting the chat.' });
//   }
// };

const getChats = async (req, res) => {
  try {
    const userId = req.query.id_user;

    const sql = `
      SELECT 
        chat.id_chat,
        message.id_message,
        message.text,
        message.sender,
        message.timestamp,
        user1.name AS user1_name,
        user1.photo AS user1_photo,
        user2.name AS user2_name,
        user2.photo AS user2_photo
      FROM 
        chat
      INNER JOIN 
        message ON chat.id_chat = message.id_chat
      INNER JOIN 
        users AS user1 ON chat.user1 = user1.id_user
      INNER JOIN 
        users AS user2 ON chat.user2 = user2.id_user
      WHERE 
        chat.user1 = ? OR chat.user2 = ?
      ORDER BY 
        message.timestamp DESC
    `;

    const { rows } = await pool.query(sql, [userId, userId]);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error in getChats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createChat = async (req, res) => {
  try {
    const { userId, providerId } = req.body;
    const sql = 'INSERT INTO chat (user1, user2) VALUES (?, ?)';
    const params = [userId, providerId];

    await pool.query(sql, params);

    res.send({ error: false, code: 200, message: 'Chat created successfully' });
  } catch (error) {
    console.log(error);
    res.send({
      error: true,
      code: 500,
      message: 'An error occurred while creating the chat',
    });
  }
};

module.exports = { createChat, getChats };
