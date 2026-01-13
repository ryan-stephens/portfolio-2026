FROM node:20-alpine AS base

WORKDIR /app

FROM base AS deps

COPY package.json package-lock.json* ./

RUN npm ci --prefer-offline --no-audit

FROM base AS builder

COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit

COPY . .

RUN npm run build

FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the entire .next directory from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next /app/.next
# Copy public files
COPY --from=builder --chown=nextjs:nodejs /app/public /app/public
# Copy package files for dependencies
COPY --from=builder --chown=nextjs:nodejs /app/node_modules /app/node_modules

USER nextjs

EXPOSE 3011

ENV PORT=3011
ENV HOSTNAME="0.0.0.0"

CMD ["node", "/app/.next/standalone/server.js"]
