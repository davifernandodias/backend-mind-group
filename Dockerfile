FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

COPY node_modules/ ./node_modules/

COPY ./src ./src

EXPOSE 8080

CMD ["npm", "run", "dev"]
