FROM node:20.5.0-buster
RUN mkdir /my_app
COPY src /my_app
# Copies package.json and package-lock.json to Docker environment
COPY package.json /my_app
COPY package-lock.json /my_app

COPY .env /my_app
WORKDIR /my_app

# Install system dependencies for PhantomJS
RUN apt-get update && apt-get install -y \
  gconf-service \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  ca-certificates \
  fonts-liberation \
  libappindicator1 \
  libnss3 \
  lsb-release \
  xdg-utils \
  wget
# Install html-pdf
RUN npm install html-pdf

# Set OPENSSL_CONF to avoid OpenSSL error
ENV OPENSSL_CONF=/etc/ssl/

RUN npm install
CMD npm run dev