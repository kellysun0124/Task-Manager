const express = require('express');
const mongoose = require('mongoose');
const Task = require('./Models/Task');
const User = require('./Models/User');

const app = express();

const certPath = './backend/mschutz_atlas_cert.pem';
mongoose.connect("mongodb+srv://taskmanagerdatabase.bou5pon.mongodb.net/TaskManagerDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=TaskManagerDatabase", {
    tlsCertificateKeyFile: certPath,
})
    .then(() => {
        console.log('Connected to the database!')
    })
    .catch((err) => {
        console.log('Connection failed!', err)
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let user;
  try {
    user = await User.findOne({ username: username });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'failed to fetch user' });
  }
  if (!user) {
    console.log(`User not found: ${username}`);
    return res.status(404).send({ message: 'User not found' });
  }
  if (password !== user.password) {
    console.log(`Invalid credentials for user: ${username}`);
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  res.status(200).send( user );
});

app.post('/register', async (req, res) => {
  let user;
  console.log('new request: ', req.body)
  try {
      user = new User(req.body);
  } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Invalid user data' });
  }
  try {
      await user.save();
      res.status(201).send({ message: 'User added successfully!', data: user });
  } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(409).send({ message: 'User already exists' });
      } else {
        res.status(500).send({ message: 'Failed to add user' });
      }
  }
});

app.get('/tasks/:username', async (req, res) => {
    // TODO: Implement pagination
    const username = req.params.username;
    try {
        const tasks = await Task.find({ username: username});
        res.status(200).send( { message: 'Tasks fetched successfully!', tasks: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to fetch tasks' });
    }
});

app.post('/tasks', async (req, res) => {
    // make sure the user exists
    const username = req.body.username;
    if (!username) {
        return res.status(400).send({ message: '\'username\' is required' });
    }
    let user;
    try {
        user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }

    let task;
    try {
        task = new Task(req.body);
    } catch (error) {
        console.log(error);
        res.status(400).send({message: 'Invalid task data'})
    }
    try {
        await task.save();
        res.status(201).send({ message: 'Task added successfully!', data: task });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to add task' });
    }
});

module.exports = app;
