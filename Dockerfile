FROM node:14.15.3

# RUN mkdir -p /app/server

COPY package*.json ./

# WORKDIR /app/sever

RUN npm install
# RUN npm ci --only=production

COPY . .
# COPY . /app/server

EXPOSE 8010
CMD [ "npm", "start" ]