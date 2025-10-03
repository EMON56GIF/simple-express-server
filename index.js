import express from "express";
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3500;
const startTime = new Date();

// In-memory storage for demo purposes
let tasks = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Build Express API", completed: true },
];
let nextId = 3;

// Health check endpoint
app.get("/health", (req, res) => {
  const uptime = Math.floor((Date.now() - startTime.getTime()) / 1000);
  res.status(200).json({
    status: "healthy",
    uptime: `${uptime}s`,
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Task API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      tasks: "GET /api/tasks",
      createTask: "POST /api/tasks",
      getTask: "GET /api/tasks/:id",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id",
    },
  });
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  const { completed } = req.query;
  
  let filteredTasks = tasks;
  if (completed !== undefined) {
    const isCompleted = completed === "true";
    filteredTasks = tasks.filter(task => task.completed === isCompleted);
  }
  
  res.status(200).json({
    count: filteredTasks.length,
    tasks: filteredTasks,
  });
});

// Get single task
app.get("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  
  res.status(200).json(task);
});

// Create new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  
  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  
  if (title !== undefined) {
    if (title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    tasks[taskIndex].title = title.trim();
  }
  
  if (completed !== undefined) {
    tasks[taskIndex].completed = Boolean(completed);
  }
  
  res.status(200).json(tasks[taskIndex]);
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json({ message: "Task deleted", task: deletedTask });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Only start server if not in test mode
// Only start server if not being imported (not in test mode)
const isMainModule = process.argv[1] && process.argv[1].endsWith('index.js');

if (isMainModule) {
  app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
  });
}

export default app;