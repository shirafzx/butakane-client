# 1. Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile

# 2. Build step
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN corepack enable && pnpm build

# 3. Runtime image
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

# You don't need to install again
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
