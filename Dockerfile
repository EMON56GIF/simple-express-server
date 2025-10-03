# ------------------------------
# Stage 1: Build the application
# ------------------------------
FROM node:20-alpine3.20 AS builder

# Set work directory as app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package.json ./
COPY package-lock.json ./

# Disable Husky during production install
ENV HUSKY=0

# Install dependencies
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copy the code for rest of the application
COPY . .

# ------------------------------------
# Stage 2: Create the final lean image
# ------------------------------------
FROM node:20-alpine3.20

WORKDIR /app

# Add metadata
LABEL description="Express API Docker Example"
LABEL repository="https://github.com/EMON56GIF/simple-express-server.git"
LABEL maintainer="Prithviraj Pati"


# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/index.js ./index.js

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3500

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3500/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "index.js"]