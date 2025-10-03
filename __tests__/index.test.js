import request from "supertest";
import app from "../index.js";

describe("Express Server API Tests", () => {
   // Close any open handles after all tests
  afterAll((done) => {
    done();
  });
  describe("GET /", () => {
    it("should return welcome message with endpoints", async () => {
      const response = await request(app).get("/");
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Welcome to the Task API");
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe("GET /health", () => {
    it("should return healthy status", async () => {
      const response = await request(app).get("/health");
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("healthy");
      expect(response.body.uptime).toBeDefined();
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe("GET /api/tasks", () => {
    it("should return all tasks", async () => {
      const response = await request(app).get("/api/tasks");
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.tasks)).toBe(true);
      expect(response.body.count).toBeGreaterThanOrEqual(0);
    });

    it("should filter completed tasks", async () => {
      const response = await request(app).get("/api/tasks?completed=true");
      
      expect(response.status).toBe(200);
      expect(response.body.tasks.every(task => task.completed === true)).toBe(true);
    });

    it("should filter incomplete tasks", async () => {
      const response = await request(app).get("/api/tasks?completed=false");
      
      expect(response.status).toBe(200);
      expect(response.body.tasks.every(task => task.completed === false)).toBe(true);
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const newTask = { title: "Test Task" };
      const response = await request(app)
        .post("/api/tasks")
        .send(newTask);
      
      expect(response.status).toBe(201);
      expect(response.body.title).toBe("Test Task");
      expect(response.body.id).toBeDefined();
      expect(response.body.completed).toBe(false);
    });

    it("should return 400 if title is missing", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Title is required");
    });

    it("should return 400 if title is empty", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .send({ title: "   " });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Title is required");
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should return a specific task", async () => {
      const response = await request(app).get("/api/tasks/1");
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).get("/api/tasks/9999");
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Task not found");
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update task title", async () => {
      const response = await request(app)
        .put("/api/tasks/1")
        .send({ title: "Updated Title" });
      
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated Title");
    });

    it("should update task completed status", async () => {
      const response = await request(app)
        .put("/api/tasks/1")
        .send({ completed: true });
      
      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app)
        .put("/api/tasks/9999")
        .send({ title: "Updated" });
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Task not found");
    });

    it("should return 400 for empty title", async () => {
      const response = await request(app)
        .put("/api/tasks/1")
        .send({ title: "   " });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Title cannot be empty");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task", async () => {
      const response = await request(app).delete("/api/tasks/2");
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task deleted");
      expect(response.body.task).toBeDefined();
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).delete("/api/tasks/9999");
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Task not found");
    });
  });

  describe("404 Handler", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/unknown-route");
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Route not found");
    });
  });
});