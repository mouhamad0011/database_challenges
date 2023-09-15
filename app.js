/*const http = require('http');

const port = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js server!\n');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/
/*const express = require('express');
const app = express();

const port = 5000;
mongoose.connect("mongodb+srv://mouhamadsleimane:d7reYbJ4u6Ovhrpw@cluster0.qtyxd3l.mongodb.net/football");
app.get('/api', (req, res) => {
  res.send('Hello, this is your Express API route!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/

const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const mongoUrl = 'mongodb+srv://mohammadsleimane:iHa6OFCbfiLOUbDm@cluster0.hjwlfin.mongodb.net/books'; // Update with your existing database name

app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(); // Specify the database you want to use
  const usersCollection = db.collection('users');

  // Fetch all user entries
  app.get('/api/users', (req, res) => {
    usersCollection.find().toArray((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(users);
      }
    });
  });

  // Fetch specific user details by ID
  app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    usersCollection.findOne({ _id: new ObjectID(userId) }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
