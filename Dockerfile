# Use official node image as a base.
FROM node:20-alpine

# Set author label to my name.
LABEL authors="James"

# Set the working directory in the container.
WORKDIR /app

# Copy the package.json and package-lock.json files to the container.
COPY package*.json ./

# Copy the rest of the frontend code to the container.
COPY . .

# Set the port to be 8080.
ENV PORT=8080

# Install dependencies.
RUN npm install

# Build the React app.
RUN npm run build

# Set the command to serve the frontend.
CMD ["npm", "start"]
