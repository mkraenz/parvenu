FROM alpine
RUN apk update && apk add nodejs && apk add nodejs-npm
COPY ./server /app
WORKDIR /app
RUN npm install
CMD ["npm","run", "start"]