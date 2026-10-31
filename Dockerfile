# Build the Angular SPA and serve it as static files behind nginx.
# There are NO secrets in this image or repo: the SPA is a public OAuth client (PKCE).
FROM node:22.23.4-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
