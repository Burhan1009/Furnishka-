# --- 1. BUILDER STAGE (Builds the app and installs dev dependencies) ---
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies and build tools
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build
COPY . .
RUN npm run build

# --- 2. RUNNER STAGE (Minimal environment for production) ---
FROM node:18-alpine AS runner

WORKDIR /app

# Only need production dependencies
COPY package.json ./
RUN npm install --only=production --legacy-peer-deps

# Copy the necessary files from the builder stage
# Copy the compiled application (.next) and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Environment Variables
ENV NODE_ENV=production
ENV PORT=3002
# CRITICAL: If frontend needs to talk to backend, ensure your NEXT_PUBLIC_API_URL
# is correctly set to http://backend:4011 in your .env.frontend file.

# Non-root user setup
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3002

# Health Check (requires 'curl' which is pre-installed or should be added if needed)
# Assuming curl is available on node:18-alpine base image
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node ./.next/standalone/server.js || exit 1

# The correct command to start the Next.js production server
CMD ["npm", "start"]