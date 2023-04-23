# Use an official Node.js runtime as a parent image
FROM node:latest as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular application
RUN npm run build

# Use an official Nginx image as a parent image
FROM nginx:latest

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/dist/defect-record /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
