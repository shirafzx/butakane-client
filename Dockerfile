# Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm build

# Serve
FROM node:20-alpine
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=builder /app ./
RUN pnpm install --prod

EXPOSE 3000
CMD ["pnpm", "start"]
