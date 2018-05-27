const connect = require('connect');
const path = require('path');
const serveStatic = require('serve-static');

connect().use(serveStatic(path.join(__dirname, '../static'))).listen(8090, () => {
  console.log('Server running on 8090...');
});
