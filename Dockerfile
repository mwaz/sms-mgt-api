FROM node:8

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001
CMD npm start