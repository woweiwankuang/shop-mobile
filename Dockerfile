FROM nginx:1.18-alpine-perl

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/  /usr/share/nginx/html/
