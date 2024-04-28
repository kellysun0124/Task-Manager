# Stage 1: Build Angular app
FROM node:20 as builder

# Set working directory
WORKDIR /app

RUN npm install -g pm2

# Copy package.json and package-lock.json
COPY my-app/package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy Angular app source code
COPY my-app .

EXPOSE 4200 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
