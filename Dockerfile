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

# Copy package files for next start
COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/package-lock.json* ./
# Copy build output
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# Copy public files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3011

ENV PORT=3011
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
