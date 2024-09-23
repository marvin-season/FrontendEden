# Stage 1: Build the React app
#FROM node:20 AS build


FROM nginx:alpine
WORKDIR  /usr/share/nginx/html
COPY ./dist .
COPY nginx.conf /etc/nginx/nginx.conf
#开放80端口
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]