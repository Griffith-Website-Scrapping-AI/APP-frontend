# Étape 1 : Build avec Node.js
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur statique avec Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Supprime la config Nginx par défaut (optionnel mais recommandé)
RUN rm /etc/nginx/conf.d/default.conf

# Ajoute ta propre config si besoin (ou laisse nginx par défaut si ça fonctionne)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
