const { Sequelize } = require("sequelize");

const isProd = process.env.NODE_ENV === "production";

// Varianta 1: DATABASE_URL (recomandat)
if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: isProd
      ? {
          // dacă folosești SSL la DB (depinde de setup-ul tău)
          ssl: { require: true, rejectUnauthorized: false },
        }
      : {},
  });
} else {
  // Varianta 2: variabile separate (DB_HOST etc.)
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT || 5432;
  const database = process.env.DB_NAME;
  const username = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  if (isProd) {
    module.exports = new Sequelize(database, username, password, {
      host,
      port,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
      },
    });
  } else {
    // fallback local
    module.exports = new Sequelize({
      dialect: "sqlite",
      storage: "./database.db",
      logging: false,
    });
  }
}
