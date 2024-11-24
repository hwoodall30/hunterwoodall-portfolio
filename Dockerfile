# Stage 1: Build the application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the app's source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create a lightweight image for production
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app/.output /app/.output

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Command to start the app
CMD ["node", ".output/server/index.mjs"]
