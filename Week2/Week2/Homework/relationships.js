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
      CREATE TABLE IF NOT EXISTS research_Papers(
          paper_id INT PRIMARY KEY,
          paper_title VARCHAR(255),
          conference VARCHAR(255),
          publish_date DATE
      )`,
  (err) => {
    if (err) throw err;
    console.log("research_Papers table created!");
  }
);

connection.query(
  `
      CREATE TABLE IF NOT EXISTS author_Paper(
          id INT PRIMARY KEY,
          paper_id INT,
          author_id INT,
          FOREIGN KEY (author_id) REFERENCES authors(author_id),
          FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
      )`,
  (err) => {
    if (err) throw err;
    console.log("author_Paper table created!");
  }
);

connection.query(
  `
    INSERT INTO authors(author_id, author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES
        (1, 'Author 1', 'University X', '1900-01-01', 7, 'Female', NULL),
        (2, 'Author 2', 'University Y', '1901-01-01', 3, 'Female', NULL),
        (3, 'Author 3', 'University Z', '1902-01-01', 1, 'Female', NULL),
        (4, 'Author 4', 'University T', '1903-01-01', 5, 'Male', 1),
        (5, 'Author 5', 'University X', '1904-01-01', 8, 'Male', 2),
        (6, 'Author 6', 'University Y', '1905-01-01', 9, 'Male', 3),
        (7, 'Author 7', 'University Z', '1906-01-01', 6, 'Female', 4),
        (8, 'Author 8', 'University T', '1907-01-01', 4, 'Female', 1),
        (9, 'Author 9', 'University X', '1908-01-01', 2, 'Female', 2),
        (10, 'Author 10', 'University Y', '1909-01-01', 1, 'Male', 3),
        (11, 'Author 11', 'University Z', '1910-01-01', 3, 'Male', 4),
        (12, 'Author 12', 'University T', '1911-01-01', 5, 'Male', 5),
        (13, 'Author 13', 'University X', '1912-01-01', 7, 'Female', 1),
        (14, 'Author 14', 'University Y', '1913-01-01', 9, 'Female', 2),
        (15, 'Author 15', 'University Z', '1914-01-01', 10, 'Female', 3)
        `,
  (err) => {
    if (err) throw err;
    console.log("Data inserted into authors table!");
  }
);

connection.query(
  `
    INSERT INTO research_Papers(paper_id, paper_title, conference, publish_date)
    VALUES
        (1, 'Paper 1', 'Conference X', '1990-04-01'),
        (2, 'Paper 2', 'Conference Y', '1991-04-01'),
        (3, 'Paper 3', 'Conference Z', '1992-04-01'),
        (4, 'Paper 4', 'Conference T', '1993-04-01'),
        (5, 'Paper 5', 'Conference X', '1994-04-01'),
        (6, 'Paper 6', 'Conference Y', '1995-04-01'),
        (7, 'Paper 7', 'Conference Z', '1996-04-01'),
        (8, 'Paper 8', 'Conference T', '1997-04-01'),
        (9, 'Paper 9', 'Conference X', '1998-04-01'),
        (10, 'Paper 10', 'Conference Y', '1999-04-01'),
        (11, 'Paper 11', 'Conference Z', '1990-03-01'),
        (12, 'Paper 12', 'Conference T', '1991-03-01'),
        (13, 'Paper 13', 'Conference X', '1992-03-01'),
        (14, 'Paper 14', 'Conference Y', '1993-03-01'),
        (15, 'Paper 15', 'Conference Z', '1994-03-01'),
        (16, 'Paper 16', 'Conference T', '1995-03-01'),
        (17, 'Paper 17', 'Conference X', '1996-03-01'),
        (18, 'Paper 18', 'Conference Y', '1997-03-01'),
        (19, 'Paper 19', 'Conference Z', '1998-03-01'),
        (20, 'Paper 20', 'Conference T', '1999-03-01'),
        (21, 'Paper 21', 'Conference X', '1990-02-01'),
        (22, 'Paper 22', 'Conference Y', '1991-02-01'),
        (23, 'Paper 23', 'Conference Z', '1992-02-01'),
        (24, 'Paper 24', 'Conference T', '1993-02-01'),
        (25, 'Paper 25', 'Conference X', '1994-02-01'),
        (26, 'Paper 26', 'Conference Y', '1995-02-01'),
        (27, 'Paper 27', 'Conference Z', '1996-02-01'),
        (28, 'Paper 28', 'Conference T', '1997-02-01'),
        (29, 'Paper 29', 'Conference X', '1998-02-01'),
        (30, 'Paper 30', 'Conference Y', '1999-02-01')`,
  (err) => {
    if (err) throw err;
    console.log("Data inserted into research_Papers table!");
  }
);

connection.query(
  `
    INSERT INTO author_Paper(id, author_id, paper_id)
    VALUES
        (1, 1, 1),
        (2, 1, 2),
        (3, 2, 3),
        (4, 2, 4),
        (5, 3, 5),
        (6, 3, 6),
        (7, 4, 7),
        (8, 4, 8),
        (9, 4, 9),
        (10, 5, NULL),
        (11, 6, 10),
        (12, 6, 11),
        (13, 6, 12),
        (14, 7, 13),
        (15, 7, 14),
        (16, 8, 15),
        (17, 8, 16),
        (18, 9, 17),
        (19, 9, 18),
        (20, 10, 19),
        (21, 10, 20),
        (22, 10, 21),
        (23, 11, NULL),
        (24, 12, 22),
        (25, 12, 23),
        (26, 12, 24),
        (27, 13, 25),
        (28, 13, 26),
        (29, 14, 27),
        (30, 14, 28),
        (31, 15, 29),
        (32, 15, 30)
        `,
  (err) => {
    if (err) throw err;
    console.log("Data inserted into author_Paper table!");
  }
);

connection.end();
