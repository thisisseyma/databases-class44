import { getContinentInfoByYearAndAge } from "./db.js";
import { getTotalPopulationByYear } from "./db.js";
import { connectToDatabase } from "./connection.js";
import { closeConnection } from "./connection.js";

async function runTests() {
  try {
    await connectToDatabase();

    const year = 2020;
    const age = "100+";

    const continentInfoResult = await getContinentInfoByYearAndAge(year, age);
    console.log("Continent Info by Year and Age:");
    console.log(continentInfoResult);

    const countryName = "Netherlands";

    const totalPopulationResult = await getTotalPopulationByYear(countryName);
    console.log("Total Population by Year:");
    console.log(totalPopulationResult);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    closeConnection();
  }
}

runTests();
