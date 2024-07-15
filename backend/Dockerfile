FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Run the app
CMD ["npm", "start"]

# Initialize the database schema
#COPY db/schema.sql /docker-entrypoint-initdb.d/