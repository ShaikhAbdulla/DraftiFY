import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'emailApp.db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => console.log('Database open error:', error)
);

//Create table 
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS drafts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        recipient TEXT, 
        subject TEXT, 
        body TEXT, 
        status TEXT,
        date TEXT,
        profilePic TEXT
      );`,
      [],
      () => console.log('Table created or already exists'),
      error => console.log('Table creation error:', error)
    );
  });
};

//Insert new draft
export const insertDraft = (recipient, subject, body, status, date, profilePic, callback) => {
  
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO drafts (recipient, subject, body, status, date, profilePic) VALUES (?, ?, ?, ?, ?, ?);`,
      [recipient.recipient, recipient.subject, recipient.body, recipient.status, recipient.date, recipient.profilePic],
      (_, result) => {
       
        if (callback) callback(result.insertId);
      },
      error => console.log('Insert error:', error)
    );
  });
};

// Fetch all drafts
export const fetchDrafts = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM drafts;',
      [],
      (_, results) => {
        if (callback) callback(results.rows.raw());
      },
      error => console.log('Fetch error:', error)
    );
  });
};

// update Drafts
export const updateDraftt = (draft) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE drafts 
       SET subject = ?, body = ?, status = ?, profilePic = ?, date = ?
       WHERE id = ?;`,
      [draft.subject, draft.body, draft.status, draft.profilePic, draft.date, draft.id],
      () => console.log('Draft updated successfully with ID:', draft.id),
      error => console.log('Update error:', error)
    );
  });
};

// Delete Table
export const dropDraftsTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS drafts;',
      [],
      () => console.log('Drafts table deleted successfully'),
      error => console.log('Error deleting table:', error)
    );
  });
};