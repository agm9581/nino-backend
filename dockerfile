# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Install all dependencies (dev + production)
COPY package*.json ./
RUN npm install

# Copy the source files for the build process (including cli.ts and commands)
COPY ./src ./src

# Build the TypeScript app (including migrations)
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy the built application (dist directory)
COPY --from=builder /app/dist ./dist

# Ensure that ts-node and typescript are available for migrations
COPY --from=builder /app/node_modules ./node_modules

# Ensure the source directory is available for running migrations
COPY ./src ./src

EXPOSE 3000

# Run migrations first and then start the app
CMD ["sh", "-c", "npm run migrations:run && node dist/main.js"]
