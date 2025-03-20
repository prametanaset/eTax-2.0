# Stage 1: Build the application
FROM node:22.14.0-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files into the working directory
# This helps to cache dependencies during Docker build
COPY package.json pnpm-lock.yaml /app/

# Install pnpm globally
RUN npm install -g pnpm

# Install the dependencies using pnpm
RUN pnpm install 

# Copy the rest of the application files into the working directory
COPY . /app

# Build the application
RUN pnpm run build


# Stage 2: Create the final image
FROM node:20.11-alpine

# Set the working directory to /app
WORKDIR /app

# Install pnpm globally in the second stage
RUN npm install -g pnpm

# Copy only the necessary files from the build stage
COPY --from=build /app/.output /app/.output
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

# Install only production dependencies
RUN pnpm install --prod

# Start the application using the built output
CMD ["node", ".output/server/index.mjs"]
