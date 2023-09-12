import { connectToDatabase, closeConnection } from "./connection.js";

export const getTotalPopulationByYear = async (countryName) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("mongoDB_exercises");

    const pipeline = [
      {
        $match: { Country: countryName },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: { $add: ["$M", "$F"] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error retrieving total population");
    throw error;
  } finally {
    closeConnection();
  }
};

export const getContinentInfoByYearAndAge = async (year, age) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("mongoDB_exercises");

    const pipeline = [
      {
        $match: { Year: year, Age: age },
      },
      {
        $project: {
          _id: 1,
          Country: 1,
          Year: 1,
          Age: 1,
          M: 1,
          F: 1,
          TotalPopulation: { $sum: ["$M", "$F"] },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error retrieving continent info");
    throw error;
  } finally {
    closeConnection();
  }
};
