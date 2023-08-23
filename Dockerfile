FROM nginx:1.25.1-alpine
COPY ./dist/sistema-tejidos /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf