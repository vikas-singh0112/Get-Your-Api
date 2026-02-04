# Build stage
FROM oven/bun:alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Production stage
FROM oven/bun:alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --production --frozen-lockfile

# Copy source code from builder
COPY --from=builder /app/src ./src

EXPOSE 1111

CMD ["bun", "run", "src/index.ts"]
