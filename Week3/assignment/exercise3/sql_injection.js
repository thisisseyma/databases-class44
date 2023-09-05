import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

//Exercise 3: Question 1: Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and ( fetch all the records in the database)

const Country = "country";
const name = "'' OR 1=1";
const code = "'' OR 1=1";

connection.query(`
  SELECT * FROM country WHERE Name = '' OR 1=1 and code = '' OR 1=1
`);

//Exercise 3: Question 2: Rewrite the function so that it is no longer vulnerable to SQL injection

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  const query = "SELECT Population FROM ?? WHERE Name = ? and code = ?";
  const values = [Country, name, code];

  conn.query(query, values, function (err, result) {
    if (err) {
      cb(err);
    } else if (result.length === 0) {
      cb(new Error("Not found"));
    } else {
      cb(null, result[0].Population);
    }
  });
}
