FROM node:alpine

# the server
COPY ./deployment/server /app
COPY ./assets /app/public/assets
COPY ./index.html /app/public/

# copy files for building the phaser game
COPY ./package.json /parvenu/
COPY ./package-lock.json /parvenu/
COPY ./tsconfig.json /parvenu/
COPY ./webpack.config.js /parvenu/
COPY ./src /parvenu/src

# build the phaser game and expose publicly
WORKDIR /parvenu
RUN npm install 
RUN npm run build
RUN mv build ../app/public/build
RUN rm -r /parvenu

# install and run the server
WORKDIR /app
RUN npm install
CMD ["npm","run", "start"]
