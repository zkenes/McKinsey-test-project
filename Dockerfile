FROM node:8

ARG APP_DIR=src
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]
