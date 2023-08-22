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

connection.query(
  `SELECT Name FROM Country WHERE Population > 8000000`,
  (err, results) => {
    if (err) throw err;
    console.log("Countries with population more than 8M selected!");
    console.log(results.map((country) => country.Name));
  }
);

connection.query(
  `SELECT Name FROM Country WHERE Name LIKE '%land%'`,
  (err, results) => {
    if (err) throw err;
    console.log("Countries selected which have land in their names!");
    console.log(results.map((country) => country.Name));
  }
);

connection.query(
  `SELECT Name FROM City WHERE Population BETWEEN 500000 AND 1000000`,
  (err, results) => {
    if (err) throw err;
    console.log("Cities selected where population is between 500K and 1M!");
    console.log(results.map((city) => city.Name));
  }
);

connection.query(
  `SELECT Name FROM Country WHERE Continent = 'Europe'`,
  (err, results) => {
    if (err) throw err;
    console.log("Countries located in Europe selected!");
    console.log(results.map((country) => country.Name));
  }
);

connection.query(
  `SELECT Name FROM Country ORDER BY SurfaceArea DESC`,
  (err, results) => {
    if (err) throw err;
    console.log(
      "All the countries listed in the descending order of their surface areas."
    );
    console.log(results.map((country) => country.Name));
  }
);

connection.query(
  `SELECT Name FROM City WHERE CountryCode = 'NLD'`,
  (err, results) => {
    if (err) throw err;
    console.log("Names of all the cities in the Netherlands listed!");
    console.log(results.map((city) => city.Name));
  }
);

connection.query(
  `SELECT Population FROM City WHERE Name ='Rotterdam'`,
  (err, results) => {
    if (err) throw err;
    console.log("Population of Rotterdam selected!");
    console.log(results.map((city) => city.Population));
  }
);

connection.query(
  `SELECT Name FROM Country ORDER BY SurfaceArea DESC LIMIT 10`,
  (err, results) => {
    if (err) throw err;
    console.log("The top 10 countries listed by their Surface Area.");
    console.log(results.map((country) => country.Name));
  }
);

connection.query(
  `SELECT Name FROM City ORDER BY Population DESC LIMIT 10`,
  (err, results) => {
    if (err) throw err;
    console.log("The top 10 most populated cities listed.");
    console.log(results.map((city) => city.Name));
  }
);

connection.query(
  `SELECT SUM(Population) as totalPopulation FROM Country`,
  (err, results) => {
    if (err) throw err;
    console.log("The population number of the world is calculated!");
    console.log(results[0].totalPopulation);
  }
);

connection.end();
