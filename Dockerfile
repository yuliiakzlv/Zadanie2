#etap 1: Budowanie
FROM node:20-alpine AS builder  
WORKDIR /app
COPY package*.json ./

#instalacja tylko zaleznosci produkcyjnych
RUN npm ci --omit=dev  
COPY . .

#etap 2: Minimalny obraz
FROM node:20-alpine
LABEL org.opencontainers.image.authors="Yuliia Kozlova"
WORKDIR /app
COPY --from=builder /app /app
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider http://localhost:3000 || exit 1
CMD ["node", "app.js"]
