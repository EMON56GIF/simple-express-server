# ------------------------------
# Stage 1: Build the application
# ------------------------------
FROM node:18-alpine3.22 AS builder

# Set work directory as app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the code for rest of the application
COPY . .

# ------------------------------------
# Stage 2: Create the final lean image
# ------------------------------------
FROM node-18:alpine:3.18

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/index.js ./index.js

EXPOSE 3500

CMD [ "node", "index.js" ]