FROM nginx:1.18-alpine-perl

COPY dist/  /usr/share/nginx/html/
