const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const cors = require('cors')

app.use(express.static(path.join(__dirname, 'build')));

app.use('/', cors()) // include before other routes

app.use('/', createProxyMiddleware({
  target: process.env.JIRA_URL,
  secure: true,
  changeOrigin: true
}));
app.use(morgan('combined'));

// app.get('/ping', function (req, res) {
//   return res.send('pong');
// });

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
