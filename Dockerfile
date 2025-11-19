# Use Node.js LTS version
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies for better performance and security
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install all dependencies (including ts-node which is now in dependencies)
RUN npm ci --only=production

# Copy application files
COPY . .

# Build the application if needed (uncomment if you need to build)
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3005

# Set environment variable for port
ENV PORT=3005

# Run the server
CMD ["node", "server.js"]
