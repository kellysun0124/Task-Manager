FROM node:20 as builder

WORKDIR /app

RUN npm install -g pm2

COPY my-app/package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY my-app .

EXPOSE 4200 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
