# Dockerfile for ShramikID Express & Prisma Backend Server
FROM node:20-alpine

WORKDIR /app

# Install OpenSSL for Prisma ORM
RUN apk add --no-cache openssl

# Copy package specifications
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma Client
RUN npm ci
RUN npx prisma generate

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "src/index.js"]
