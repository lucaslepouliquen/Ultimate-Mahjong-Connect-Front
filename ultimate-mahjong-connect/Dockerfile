# --- Build Stage ---
    FROM node:23-alpine3.20 AS builder

    WORKDIR /app
    
    # Copy package files and install all dependencies (including dev)
    COPY package*.json ./
    RUN npm ci
    
    # Copy the rest of the code and build the application
    COPY . .
    RUN npm run build
    
    # --- Production Stage ---
    FROM node:23-alpine3.20
    
    WORKDIR /app

    # Set environment variable 
    ENV NODE_ENV=production

    # Copy only the package files and install only production dependencies
    COPY package*.json ./
    RUN npm ci --only=production
    
    # Copy the built application from the builder stage
    COPY --from=builder /app/dist ./dist
    
    # Expose necessary ports
    EXPOSE 443
    
    # Start the application
    CMD ["node", "dist/main.js"]