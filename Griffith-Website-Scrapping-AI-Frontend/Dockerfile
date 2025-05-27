FROM node:18-alpine
WORKDIR /app

# 1) copier les définitions de dépendances
COPY package.json package-lock.json* ./

# 2) installer + rebuild esbuild
RUN npm install
RUN npm rebuild esbuild

# 3) copier .env pour le build
COPY .env ./

# 4) installer serve
RUN npm i -g serve

# 5) copier le reste du code
COPY . .

# 6) build de l’app
RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "dist"]
