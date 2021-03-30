function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
const express = require('express');
const app = express();
app.use(requireHTTPS);

app.use(express.static('./ng-app/dist/ng-app'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'ng-app/dist/ng-app/'}
  );
});

app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));
