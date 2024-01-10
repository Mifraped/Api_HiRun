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
  user1.id_user AS user1_id_user, 
  user1.name AS user1_name,
  user1.surname AS user1_surname, 
  user1.photo AS user1_photo, 
  user2.id_user AS user2_id_user, 
  user2.name AS user2_name,
  user2.surname AS user2_surname, 
  user2.photo AS user2_photo, 
  message.id_message, 
  message.text, 
  message.timestamp,
  message.sender
FROM 
  chat
INNER JOIN 
  users AS user1 ON chat.user1 = user1.id_user
INNER JOIN 
  users AS user2 ON chat.user2 = user2.id_user
LEFT JOIN 
  message ON chat.id_chat = message.id_chat
WHERE 
  chat.user1 = ? OR chat.user2 = ?
ORDER BY 
  message.timestamp DESC
  `;

    console.log('Executing query:', sql, 'With userId:', userId);

    const [rows] = await pool.query(sql, [userId, userId]);

    console.log('Query results:', rows);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error in getChats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createChat = async (req, res) => {
  console.log('createChat called with req.body:', req.body);

  try {
    const { userId, providerId } = req.body;

    // Check if chat already exists
    const checkSql = 'SELECT * FROM chat WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)';
    const [existingChats] = await pool.query(checkSql, [userId, providerId, providerId, userId]);

    console.log('Existing chats:', existingChats);

    if (existingChats.length > 0) {
      console.log('Chat already exists, not creating a new one');
      return res.status(400).json({ error: true, message: 'Chat already exists' });
    }

    // If chat does not exist, create a new one
    const sql = 'INSERT INTO chat (user1, user2) VALUES (?, ?)';
    const params = [userId, providerId];

    console.log('Creating new chat with params:', params);

    const result = await pool.query(sql, params);

    console.log('Result of insert operation:', result);

    res.status(200).json({ error: false, message: 'Chat created successfully' });
  } catch (error) {
    console.log('Error occurred:', error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while creating the chat',
    });
  }
};

module.exports = { createChat, getChats };
