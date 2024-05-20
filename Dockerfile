FROM node:18.20.2 as builder

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL $VITE_API_BASE_URL

COPY ./web /opt/fit-tracker-web
WORKDIR /opt/fit-tracker-web
RUN npm ci
RUN npm run build 

FROM node:18.20.2-alpine3.19

COPY ./api /opt/fit-tracker-api
WORKDIR /opt/fit-tracker-api
COPY --from=builder /opt/fit-tracker-web/dist /opt/fit-tracker-api/web/build
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]