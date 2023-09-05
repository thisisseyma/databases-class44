import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transaction",
});

function insertSampleData(tableName, values, message) {
  const insertQuery = `
    INSERT INTO ${tableName} ${values}`;

  connection.query(insertQuery, (err) => {
    if (err) throw err;
    console.log(message);
  });
}

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");

  const accountSampleData = `
    (account_number, balance)
    VALUES
      (101, 11000),
      (102, 12000)
  `;
  insertSampleData(
    "account",
    accountSampleData,
    "Sample data inserted into account table"
  );

  const accountChangesSampleData = `
    (account_number, amount, remark)
    VALUES
      (101, 11000, 'Current balance'),
      (102, 12000, 'Current balance')
  `;
  insertSampleData(
    "account_changes",
    accountChangesSampleData,
    "Sample data inserted into account_changes table"
  );

  connection.end();
});
