FROM node:14.17.1

WORKDIR /opt/app

COPY src ./
RUN npm i
ENTRYPOINT ["node", "musician.js"]