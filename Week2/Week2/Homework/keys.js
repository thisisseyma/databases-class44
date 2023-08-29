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

connection.query(
  `
    CREATE TABLE IF NOT EXISTS authors(
        author_id INT PRIMARY KEY,
        author_name VARCHAR(255),
        university VARCHAR(255),
        date_of_birth DATE,
        h_index INT,
        gender VARCHAR(255)
    )`,
  (err) => {
    if (err) throw err;
    console.log("Authors table created!");
  }
);

connection.query(
  `
    ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)`,
  (err) => {
    if (err) throw err;
    console.log("Mentor column added!");
  }
);

connection.end();
