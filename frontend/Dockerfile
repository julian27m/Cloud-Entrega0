FROM node:18-alpine

RUN npm install -g @angular/cli

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8080"]

