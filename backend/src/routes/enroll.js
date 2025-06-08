const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../data/users.json');

// Enroll a user in a course
router.post('/', (req, res) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    return res.status(400).json({ error: 'userId and courseId required' });
  }

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  }

  let user = users.find(u => u.id === userId);
  if (!user) {
    user = { id: userId, courses: [] };
    users.push(user);
  }

  if (!user.courses.includes(courseId)) {
    user.courses.push(courseId);
  }

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ success: true, user });
});

// Disenroll a user from a course
router.delete('/', (req, res) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    return res.status(400).json({ error: 'userId and courseId required' });
  }

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  }

  const user = users.find(u => u.id === userId);
  if (user) {
    user.courses = user.courses.filter(id => id !== courseId);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return res.json({ success: true, user });
  }
  res.status(404).json({ error: 'User not found' });
});

// Get courses for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  }
  const user = users.find(u => u.id === userId);
  res.json({ courses: user ? user.courses : [] });
});

module.exports = router;