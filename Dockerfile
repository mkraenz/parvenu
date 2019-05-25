FROM alpine
RUN apk update && apk add nodejs && apk add nodejs-npm
COPY ./deployment/server /app
COPY ./build /app/public/build
COPY ./assets /app/public/build/assets
COPY ./index.html /app/public
WORKDIR /app
RUN npm install
CMD ["npm","run", "start"]
