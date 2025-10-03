# Express Hello World Server

This is a simple **Node.js + Express** application that starts a server on port `3500` and responds with a JSON object when accessed at the root endpoint (`/`).  

---

## 📌 Features

- Built using **Express.js**.
- Runs a server on **port 3500**.
- Returns a JSON response containing:
  - `message`: A sample "Hello, World" text.
  - `active`: Boolean status (`true`).
  - `timestamp`: UTC timestamp of the server request.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <https://github.com/EMON56GIF/simple-express-server.git>
cd simple-express-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

Start normally:

```bash
npm start
```

Start in development mode (with auto-reload using nodemon):

```bash
npm run dev
```

## 📂 Project Structure

.
├── index.js        # Main server file
├── package.json    # Project metadata and scripts
└── README.md       # Documentation

## 🔑 Example Usage

Start the server:

```bash
node index.js
```

Open your browser or use curl:

```bash
curl http://localhost:3500/
```

You will get a JSON response:

```bash
{
  "message": "Hello, World",
  "active": true,
  "timestamp": "Thu, 02 Oct 2025 07:40:21 GMT"
}
```

## ⚙️ Scripts in package.json

```bash
  "scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",

```

- npm start → Runs the server once.
- npm run dev → Runs the server with nodemon (auto-restarts on code changes).

## 📦 Dependencies

- express
  - Web framework for Node.js

- nodemon
  - (dev dependency) – Auto-restart server during development

## 📜 License

This project is open-source and available under the MIT License.
