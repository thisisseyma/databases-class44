import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transaction",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

function executeQuery(query, values, callback) {
  connection.query(query, values, (err, result) => {
    if (err) {
      connection.rollback(() => {
        throw err;
      });
    }
    callback(result);
  });
}

connection.beginTransaction((err) => {
  if (err) throw err;

  const transferAmount = 1000;
  const senderAccount = 101;
  const receiverAccount = 102;
  const remark = "Transfer to account " + receiverAccount;

  const queries = [
    {
      query: `
        UPDATE account 
        SET balance = balance - ? 
        WHERE account_number = ?`,
      values: [transferAmount, senderAccount],
    },
    {
      query: `
        UPDATE account 
        SET balance = balance + ? 
        WHERE account_number = ?`,
      values: [transferAmount, receiverAccount],
    },
    {
      query: `
        INSERT INTO account_changes (account_number, amount, remark) 
        VALUES (?, ?, ?)`,
      values: [senderAccount, -transferAmount, remark],
    },
    {
      query: `
        INSERT INTO account_changes (account_number, amount, remark) 
        VALUES (?, ?, ?)`,
      values: [receiverAccount, transferAmount, remark],
    },
  ];

  let completedQueries = 0;
  queries.forEach(({ query, values }) => {
    executeQuery(query, values, () => {
      completedQueries++;

      if (completedQueries === queries.length) {
        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              throw err;
            });
          }
          console.log("Transferred successfully!");
        });

        connection.end();
      }
    });
  });
});
