FROM node:14.18-slim

RUN apt-get update && apt-get install -y procps

ENV TZ=Asia/Singapore
RUN echo "Asia/Singapore" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

WORKDIR /service
COPY . .

RUN npm ci

EXPOSE 3000

USER node
CMD [ "npm", "run" , "dev" ]
