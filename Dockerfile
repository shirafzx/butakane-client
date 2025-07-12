# Use a separate step for deps to allow caching
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile

# Main build step
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN corepack enable && pnpm build


# Serve
FROM node:22-alpine
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=builder /app ./
RUN pnpm install --prod

EXPOSE 3000
CMD ["pnpm", "start"]
