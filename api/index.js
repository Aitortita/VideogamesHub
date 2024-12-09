require('dotenv').config();
const fs = require('fs');
const https = require('https'); 
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT, SV_PRIVKEY, SV_FULLCHAIN, NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  // Load SSL certificate and key
  const options = {
    key: fs.readFileSync(SV_PRIVKEY),
    cert: fs.readFileSync(SV_FULLCHAIN)
  };

  // Create HTTPS server
  const httpsServer = https.createServer(options, server);

  // Syncing all the models at once.
  conn.sync().then(() => {
    httpsServer.listen(PORT, () => {
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    });
  });
}
else {
   conn.sync().then(() => {
    server.listen(PORT, () => {
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    });
  });
}