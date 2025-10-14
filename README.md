# Nano Banana Prototype

This repo contains the Nano Banana marketing prototype built with Next.js and Tailwind CSS. Production code lives in `web-app/`, while the top-level `tmp/` folder is reserved for short-lived experiments.

For contribution standards, workflow tips, and code style rules, read [`AGENTS.md`](AGENTS.md).

## Supabase GitHub Login Setup · 使用 Supabase 配置 GitHub 登录

1. Provision a Supabase project and enable the GitHub & Google providers under **Authentication → Providers**, copying the generated redirect URLs for later use; 在 Supabase 控制台新建项目，并在 **Authentication → Providers** 中同时启用 GitHub 与 Google 登录，记录控制台提供的回调地址。
2. Create `web-app/.env.local` (or extend the existing file) with the following keys and values from your Supabase project (never commit actual secrets); 在 `web-app/.env.local` 中写入下列键值（使用你自己的 Supabase 项目配置，注意不要提交到仓库）:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```
3. During local development run `npm run dev` from `web-app/`; in production remember to set the same environment variables for the hosting platform; 本地开发时在 `web-app/` 下运行 `npm run dev`，上线时亦需在托管平台配置同名环境变量。
4. Update the redirect URLs in the Supabase dashboard to include your deployed domain (e.g. `https://nanobanana.ai/auth/callback`) so that GitHub/Google can return users to the Next.js app; 在 Supabase 控制台补充部署域名的回调地址（如 `https://nanobanana.ai/auth/callback`），确保 GitHub / Google 能正确跳转回站点。
5. For Google sign-in, configure the OAuth consent screen and Web application credentials in Google Cloud, then paste the Client ID/secret into Supabase; 启用 Google 登录时需在 Google Cloud 中设置 OAuth 同意屏幕与 Web 凭据，并将生成的 Client ID / Secret 填入 Supabase。
