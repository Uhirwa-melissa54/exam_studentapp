const express = require('express');
const app = express();
const students = [];

class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  getDetails() {
    return `Name: ${this.name}, Grade: ${this.grade}`;
  }
}

app.use(express.json());

app.post('/students', (req, res) => {
  const { name, grade } = req.body;
  if (!name || grade == null) {
    return res.status(400).json({ error: 'Name and grade are required' });
  }

  const student = new Student(name, grade);
  students.push(student);
  res.status(201).json({ message: 'Student added successfully' });
});

app.get('/students', (req, res) => {
  const details = students.map(student => student.getDetails());
  res.json(details);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
