FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -f
# If you are building your code for production

# Bundle app source
COPY . .
RUN npm run build

ARG NODE_ENV
ARG MONGODB


# Set NODE_ENV environment variable
ENV NODE_ENV development
ENV MONGODB=${MONGODB}

EXPOSE 3000

CMD [ "node", "dist/main.js" ]