FROM node:20.9.0-alpine3.19

COPY ./api /opt/fit-tracker
WORKDIR /opt/fit-tracker
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]