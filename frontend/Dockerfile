# Use the official lightweight Node.js 14 image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Angula
RUN npm install angular

# Install dependencies
RUN npm install

# Expose port 4200 to the outside world
EXPOSE 4200

# Start the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]
