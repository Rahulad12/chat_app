const mongoose = require("mongoose");

require("dotenv").config();

/**
 * Connects to the MongoDB database using the MONGO_URI variable
 * in the .env file.
 *
 * @returns {Promise<void>}
 */
const Database = async () => {
  try {
    /**
     * Connect to the MongoDB database using the MONGO_URI variable
     * in the .env file.
     *
     * @type {Promise<void>}
     */
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = Database;
