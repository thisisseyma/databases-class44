import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hw_week2",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Query to print names of all authors and their corresponding mentors
connection.query(
  `
    SELECT a.author_name AS author_name, m.author_name AS mentor_name
    FROM authors AS a
    LEFT JOIN authors AS m ON a.mentor = m.author_id`,
  (err, results) => {
    if (err) throw err;
    console.log("Authors and their mentors matched");
    console.table(results);
  }
);

// Query to print all columns of authors and their published paper_title
connection.query(
  `
    SELECT a.*, p.paper_title
    FROM authors AS a
    LEFT JOIN author_Paper AS ap ON a.author_id = ap.author_id
    LEFT JOIN research_Papers AS p ON ap.paper_id = p.paper_id`,
  (err, results) => {
    if (err) throw err;
    console.log("Authors and their papers logged!");
    console.table(results);
  }
);

connection.end();
