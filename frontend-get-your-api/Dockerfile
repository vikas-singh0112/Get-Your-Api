# Build stage
FROM oven/bun:alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install all dependencies (including dev dependencies for build)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build \
  && rm -rf .next/cache

# Production stage
FROM oven/bun:alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --production --frozen-lockfile

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["bun", "run", "start"]
