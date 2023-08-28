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

// Query 1: Select countries with a population greater than 8 million
connection.query(
  `SELECT Name FROM Country WHERE Population > 8000000`,
  (err, results) => {
    if (err) throw err;
    console.log("Countries with population more than 8M selected!");
    console.log(results.map((country) => country.Name));
  }
);

// Query 2: Select countries with "land" in their names
connection.query(
  `SELECT Name FROM Country WHERE Name LIKE '%land%'`,
  (err, results) => {
    if (err) throw err;
    console.log("Countries selected which have land in their names!");
    console.log(results.map((country) => country.Name));
  }
);

// Query 3: Select cities with a population between 500K and 1M
connection.query(
  `SELECT Name FROM City WHERE Population BETWEEN 500000 AND 1000000`,
  (err, results) => {
    if (err) throw err;
    console.log("Cities selected where population is between 500K and 1M!");
    console.log(results.map((city) => city.Name));
  }
);

// Query 4: Select countries located in Europe
connection.query(
  `SELECT Name FROM Country WHERE Continent = 'Europe'`,
  (err, results) => {
    if (err) throw err;
    console.log("Countries located in Europe selected!");
    console.log(results.map((country) => country.Name));
  }
);

// Query 5: Select all countries ordered by surface area in descending order
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

// Query 6: Select cities in the Netherlands (country code 'NLD')
connection.query(
  `SELECT Name FROM City WHERE CountryCode = 'NLD'`,
  (err, results) => {
    if (err) throw err;
    console.log("Names of all the cities in the Netherlands listed!");
    console.log(results.map((city) => city.Name));
  }
);

// Query 7: Select population of the city Rotterdam
connection.query(
  `SELECT Population FROM City WHERE Name ='Rotterdam'`,
  (err, results) => {
    if (err) throw err;
    console.log("Population of Rotterdam selected!");
    console.log(results.map((city) => city.Population));
  }
);

// Query 8: Select top 10 countries by surface area
connection.query(
  `SELECT Name FROM Country ORDER BY SurfaceArea DESC LIMIT 10`,
  (err, results) => {
    if (err) throw err;
    console.log("The top 10 countries listed by their Surface Area.");
    console.log(results.map((country) => country.Name));
  }
);

// Query 9: Select top 10 most populated cities
connection.query(
  `SELECT Name FROM City ORDER BY Population DESC LIMIT 10`,
  (err, results) => {
    if (err) throw err;
    console.log("The top 10 most populated cities listed.");
    console.log(results.map((city) => city.Name));
  }
);

// Query 10: Calculate the total population of the world
connection.query(
  `SELECT SUM(Population) as totalPopulation FROM Country`,
  (err, results) => {
    if (err) throw err;
    console.log("The population number of the world is calculated!");
    console.log(results[0].totalPopulation);
  }
);

connection.end();
