FROM node:14-alpine

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install

CMD ["npm","start"]