// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;