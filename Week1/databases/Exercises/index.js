import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed!");
  } else {
    console.log("Connected to the database!");
  }
});

const databaseName = "meetup";

connection.query(`DROP DATABASE IF EXISTS ${databaseName}`, (err) => {
  if (err) throw err;
  console.log(`Database ${databaseName} dropped!`);
});

connection.query(`CREATE DATABASE ${databaseName}`, (err) => {
  if (err) throw err;
  console.log(`Database ${databaseName} created successfully!`);
});

connection.query(`USE ${databaseName}`, (err) => {
  if (err) throw err;
  console.log(`Using database ${databaseName}!`);
});

const createInviteeTable = `
CREATE TABLE Invitee (
      invitee_no INT AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(255),
      invited_by INT
    )`;

const createRoomTable = `
  CREATE TABLE Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255),
    floor_number INT
  )`;

const createMeetingTable = `
  CREATE TABLE Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`;

const insertInvitees = `
  INSERT INTO Invitee (invitee_name, invited_by)
  VALUES
    ('Participant 1', NULL),
    ('Participant 2', 1),
    ('Participant 3', 2),
    ('Participant 4', 3),
    ('Participant 5', 4)
  `;

const insertRooms = `
  INSERT INTO Room (room_name, floor_number)
  VALUES
    ('Room 1', 1),
    ('Room 2', 2),
    ('Room 3', 3),
    ('Room 4', 4),
    ('Room 5', 5)
  `;

const insertMeetings = `
  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
  VALUES
    ('Meeting 1', '2023-08-20 10:00:00', '2023-08-20 12:00:00', 1),
    ('Meeting 2', '2023-08-21 14:00:00', '2023-08-21 16:00:00', 2),
    ('Meeting 3', '2023-08-22 09:30:00', '2023-08-22 11:30:00', 3),
    ('Meeting 4', '2023-08-23 13:00:00', '2023-08-23 15:00:00', 4),
    ('Meeting 5', '2023-08-24 15:30:00', '2023-08-24 17:30:00', 5)
  `;

connection.query(createInviteeTable, (err) => {
  if (err) throw err;
  console.log("Invitee table created");
});

connection.query(createRoomTable, (err) => {
  if (err) throw err;
  console.log("Room table created");
});

connection.query(createMeetingTable, (err) => {
  if (err) throw err;
  console.log("Meeting table created");
});

connection.query(insertInvitees, (err) => {
  if (err) throw err;
  console.log("Invitees inserted");
});

connection.query(insertRooms, (err) => {
  if (err) throw err;
  console.log("Rooms inserted");
});

connection.query(insertMeetings, (err) => {
  if (err) throw err;
  console.log("Meetings inserted");
});

connection.end();
