const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

// Enable compression middleware
app.use(compression());

const oneDay = 86400000; // 24 hours in milliseconds

// Serve static assets with a cache policy
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: oneDay, // Set the maximum age of cache
  })
);

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
