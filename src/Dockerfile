FROM node:20-alpine AS build

WORKDIR /app

ARG API_URL=""

COPY package*.json ./
RUN npm install

COPY . .

RUN sed -i "s|\${API_URL}|$API_URL|g" src/environments/environment.prod.ts

RUN npm run build --configuration=production

FROM nginx:alpine

COPY --from=build /app/dist/root/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
