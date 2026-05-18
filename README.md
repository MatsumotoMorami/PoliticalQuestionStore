# PoliticalQuestionStore

Vue 3 + Vite 题库练习站点，包含政治题库与 NCRE 三级题库模块。

## Stack

- Vue 3
- Vite 5
- Pinia
- Vue Router
- Element Plus
- pnpm
- Docker + nginx

## Local Dev

```bash
pnpm install
pnpm dev
```

默认开发地址：`http://localhost:5173/`

## Build

```bash
pnpm build
```

产物输出到 `dist/`。

## Docker

```bash
docker build -t political-question-store .
docker run -d --name political-question-store --restart unless-stopped -p 17423:80 political-question-store
```

访问：`http://<server-ip>:17423/`

## CI/CD

GitHub Actions 工作流位于 `.github/workflows/deploy.yml`。

触发方式：

- push 到 `main`
- push 到 `dev-Kohakuwu`
- 手动运行 workflow

部署流程：

1. GitHub Actions 构建 Docker 镜像
2. 将镜像 tar 包通过 SSH 上传到服务器
3. 服务器执行 `docker load`
4. 重启 `political-question-store` 容器
5. 默认端口映射：`17423:80`

## Repo Secrets

需要配置以下 GitHub Repository Secrets：

```text
SSH_HOST
SSH_PORT
SSH_USER
SSH_KEY
```

`SSH_KEY` 填私钥内容。服务器需要已安装 Docker，并且 `SSH_USER` 可以直接执行 `docker`，或可以免密执行 `sudo docker`。

## Optional Variable

如需修改宿主机端口，可配置 GitHub Repository Variable：

```text
APP_PORT
```

不配置时默认使用 `17423`。
