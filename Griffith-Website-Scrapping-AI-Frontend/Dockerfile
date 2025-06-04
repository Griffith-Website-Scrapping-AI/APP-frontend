FROM node:18-alpine
WORKDIR /app

# 1) copy dependency definitions
COPY package.json package-lock.json* ./

# 2) install + rebuild esbuild
RUN npm install
RUN npm rebuild esbuild

# 3) copy .env for build
COPY .env ./

# 4) install serve
RUN npm i -g serve

# 5) copy the rest of the code
COPY . .

# 6) build app
RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "dist"]
