export default () => ({
  PORT: parseInt(process.env.PORT) || 3000,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN,
});
