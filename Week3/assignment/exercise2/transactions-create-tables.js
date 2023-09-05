import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transaction",
});

function createTable(tableName, createQuery, message) {
  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName}(
      ${createQuery}
    )`;

  connection.query(query, (err) => {
    if (err) throw err;
    console.log(message);
  });
}

function initializeDatabase() {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");

    const accountTableQuery = `
      account_number INT PRIMARY KEY,
      balance DECIMAL(10, 2) DEFAULT 0.00
    `;
    const accountChangesTableQuery = `
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount DECIMAL(10, 2),
      changed_date DATETIME DEFAULT NOW(),
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number) 
    `;

    createTable("account", accountTableQuery, "account table created!");
    createTable(
      "account_changes",
      accountChangesTableQuery,
      "account_changes table created!"
    );

    connection.end();
  });
}

initializeDatabase();
