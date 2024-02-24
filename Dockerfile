FROM node:alpine AS build-step

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

RUN ng build --configuration=production

FROM nginx:alpine

COPY --from=build-step /usr/src/app/dist/pdf-coordinates-ui/browser /usr/share/nginx/html