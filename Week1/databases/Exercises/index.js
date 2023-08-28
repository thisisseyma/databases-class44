import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

function executeQuery(connection, query, logMessage) {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log(logMessage);
  });
}

function buildInviteeTable(connection) {
  const query = `
    CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no INT AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(255),
      invited_by INT
    )`;
  executeQuery(connection, query, "Invitee table created");
}

function buildRoomTable(connection) {
  const query = `
    CREATE TABLE IF NOT EXISTS Room (
      room_no INT AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(255),
      floor_number INT
    )`;
  executeQuery(connection, query, "Room table created");
}

function buildMeetingTable(connection) {
  const query = `
    CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title VARCHAR(255),
      starting_time DATETIME,
      ending_time DATETIME,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )`;
  executeQuery(connection, query, "Meeting table created");
}

function insertDataIntoInvitees(connection) {
  const query = `
    INSERT INTO Invitee (invitee_name, invited_by)
    VALUES
      ('Participant 1', NULL),
      ('Participant 2', 1),
      ('Participant 3', 2),
      ('Participant 4', 3),
      ('Participant 5', 4)
  `;
  executeQuery(connection, query, "Invitees inserted");
}

function insertDataIntoRooms(connection) {
  const query = `
    INSERT INTO Room (room_name, floor_number)
    VALUES
      ('Room 1', 1),
      ('Room 2', 2),
      ('Room 3', 3),
      ('Room 4', 4),
      ('Room 5', 5)
  `;
  executeQuery(connection, query, "Rooms inserted");
}

function insertDataIntoMeetings(connection) {
  const query = `
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES
      ('Meeting 1', '2023-08-20 10:00:00', '2023-08-20 12:00:00', 1),
      ('Meeting 2', '2023-08-21 14:00:00', '2023-08-21 16:00:00', 2),
      ('Meeting 3', '2023-08-22 09:30:00', '2023-08-22 11:30:00', 3),
      ('Meeting 4', '2023-08-23 13:00:00', '2023-08-23 15:00:00', 4),
      ('Meeting 5', '2023-08-24 15:30:00', '2023-08-24 17:30:00', 5)
  `;
  executeQuery(connection, query, "Meetings inserted");
}

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed!");
  } else {
    console.log("Connected to the database!");
  }
});

const databaseName = "meetup";

executeQuery(connection, `DROP DATABASE IF EXISTS ${databaseName}`, `Database ${databaseName} dropped!`);
executeQuery(connection, `CREATE DATABASE ${databaseName}`, `Database ${databaseName} created successfully!`);
executeQuery(connection, `USE ${databaseName}`, `Using database ${databaseName}!`);

buildInviteeTable(connection);
buildRoomTable(connection);
buildMeetingTable(connection);

insertDataIntoInvitees(connection);
insertDataIntoRooms(connection);
insertDataIntoMeetings(connection);

connection.end();
