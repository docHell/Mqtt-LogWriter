FROM node:10-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY lib/* lib/
COPY models/* models/
COPY lenguage/* lenguage/

EXPOSE 3000

CMD [ "npm", "start" ]