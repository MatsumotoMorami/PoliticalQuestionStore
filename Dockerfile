# syntax=docker/dockerfile:1

FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine

ARG VCS_REF=unknown

LABEL org.opencontainers.image.title="PoliticalQuestionStore" \
      org.opencontainers.image.description="Vue 3 + Vite static question practice app" \
      org.opencontainers.image.source="https://github.com/MatsumotoMorami/PoliticalQuestionStore" \
      org.opencontainers.image.revision="${VCS_REF}"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
