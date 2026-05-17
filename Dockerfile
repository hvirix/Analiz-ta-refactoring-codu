# --- BUILD STAGE ---
FROM node:20-slim AS builder

# Встановлюємо залежності для нативних модулів
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# Встановлюємо всі залежності
RUN npm install

# --- PRODUCTION STAGE ---
FROM node:20-slim AS runner

WORKDIR /app

# Копіюємо модулі з етапу збірки
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Копіюємо ТВІЙ головний файл (index.js замість server.js)
COPY index.js ./

# Копіюємо твої папки з кодом
COPY models/ ./models
COPY services/ ./services
COPY tests/ ./tests

# Якщо у тебе немає папки public, цей рядок можна видалити або закоментувати.
# Якщо вона з'явиться пізніше — розкоментуй.
# COPY public/ ./public

EXPOSE 8080

ENV PORT=8080
ENV NODE_ENV=production

# Переконайся, що в package.json у "scripts" є "start": "node index.js"
CMD ["npm", "start"]
