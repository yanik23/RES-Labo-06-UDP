FROM node:14.17.1

WORKDIR /opt/app

COPY src ./

# install dependencies (node_modules dir)
RUN npm i

ENTRYPOINT [ "node", "auditor.js" ]