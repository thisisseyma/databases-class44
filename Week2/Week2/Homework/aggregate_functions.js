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

// Query 1: All research papers and the number of authors that wrote that paper.
connection.query(
  `
    SELECT rp.paper_title, COUNT(ap.author_id) AS num_authors
    FROM research_Papers AS rp
    LEFT JOIN author_Paper AS ap ON rp.paper_id = ap.paper_id
    GROUP BY rp.paper_id`,
  (err, results) => {
    if (err) throw err;
    console.log("Research Papers and Number of Authors logged!");
    console.table(results);
  }
);

// Query 2: Sum of the research papers published by all female authors.
connection.query(
  `
    SELECT SUM(rp_count) AS total_papers_by_female_authors
    FROM (
      SELECT COUNT(ap.paper_id) AS rp_count
      FROM authors AS a
      LEFT JOIN author_Paper AS ap ON a.author_id = ap.author_id
      WHERE a.gender = 'Female'
      GROUP BY a.author_id
    ) AS female_paper_counts`,
  (err, results) => {
    if (err) throw err;
    console.log(
      "Total Research Papers by Female Authors:",
      results[0].total_papers_by_female_authors
    );
  }
);

// Query 3: Average of the h-index of all authors per university.
connection.query(
  `
    SELECT university, AVG(h_index) AS avg_h_index
    FROM authors
    GROUP BY university`,
  (err, results) => {
    if (err) throw err;
    console.log("Average H-index per University logged!");
    console.table(results);
  }
);

// Query 4: Sum of the research papers of the authors per university.
connection.query(
  `
    SELECT a.university, SUM(rp_count) AS total_papers
    FROM authors AS a
    LEFT JOIN (
      SELECT ap.author_id, COUNT(ap.paper_id) AS rp_count
      FROM author_Paper AS ap
      GROUP BY ap.author_id
    ) AS author_paper_counts ON a.author_id = author_paper_counts.author_id
    GROUP BY a.university`,
  (err, results) => {
    if (err) throw err;
    console.log("Total Research Papers per University logged!");
    console.table(results);
  }
);

// Query 5: Minimum and maximum of the h-index of all authors per university.
connection.query(
  `
    SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
    FROM authors
    GROUP BY university`,
  (err, results) => {
    if (err) throw err;
    console.log("Min and Max H-index per University logged!");
    console.table(results);
  }
);

connection.end();
