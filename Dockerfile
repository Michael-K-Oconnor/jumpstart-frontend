FROM node:10.13-alpine AS build
ARG BUILD_ENV=development
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
ENV NODE_ENV=$BUILD_ENV
RUN NODE_ENV=${NODE_ENV} npm run build 

FROM nginx:stable
COPY --from=build /app/dist/ /dist/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
# CMD ["nginx -g 'daemon off;'"]
