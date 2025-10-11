# Repository Guidelines

## Project Structure & Module Organization
- All application code lives in `web-app/`; 应用源码全部位于 `web-app/` 目录。
- Define routes inside `web-app/src/app/`, using hyphenated segment folders and PascalCase components such as `HeroSection.tsx`; 路由放在 `web-app/src/app/`，段名用连字符，组件采用 PascalCase（如 `HeroSection.tsx`）。
- Share Tailwind tokens in `web-app/tailwind.config.js`, keep global CSS in `web-app/src/app/globals.css`, and mirror component tests under `web-app/src/__tests__/`; 设计令牌写入 `web-app/tailwind.config.js`，全局样式放在 `web-app/src/app/globals.css`，测试文件与组件同名保存在 `web-app/src/__tests__/`。

## Build, Test, and Development Commands
- Run `npm install` from `web-app/` after cloning; 克隆后在 `web-app/` 执行 `npm install` 安装依赖。
- Use `npm run dev` for the local server, `npm run lint` for Next.js + Tailwind linting, and `npm run test` for Jest suites; `npm run dev` 启动本地开发，`npm run lint` 执行 Next.js 与 Tailwind 规则，`npm run test` 运行 Jest 测试。
- Pair `npm run build` with `npm run start` before releases to validate the production bundle; 发布前组合运行 `npm run build` 与 `npm run start` 以验证产物。

## Coding Style & Naming Conventions
- Author UI with TypeScript React function components using two-space indentation; UI 采用 TypeScript React 函数组件并使用两个空格缩进。
- Prefer Tailwind utility classes and extract recurring patterns into helpers or `@apply` rules; 优先使用 Tailwind 工具类，并将复用样式整理为辅助组件或 `@apply` 规则。
- Maintain bilingual copy (English + 简体中文) consistent with `README.md` and avoid inline styles unless dynamic; 所有文案保持英文与简体中文双语，并仅在需要动态值时使用内联样式。

## Testing Guidelines
- Use Jest with React Testing Library; rely on descriptive `ComponentName.test.tsx` files under `web-app/src/__tests__/`; 采用 Jest 与 React Testing Library，测试文件命名为 `ComponentName.test.tsx` 并放在 `web-app/src/__tests__/`。
- Cover rendering, accessibility, and critical flows; 针对渲染、无障碍及关键流程编写用例。
- Document manual QA steps in pull requests and keep `tmp/` clean before merging; 在 PR 中记录手动验证步骤，并于合并前清理 `tmp/`。

## Commit & Pull Request Guidelines
- Follow Conventional Commits, e.g., `feat: refine hero banner copy` / `feat: 优化主视觉文案`; 遵循 Conventional Commits 规范。
- Each PR should include purpose, screenshots for UI updates, linked issues, and confirmation that `npm run lint` and `npm run build` succeeded; 每个 PR 需写明目的、UI 截图、关联 issue，并确认 `npm run lint` 与 `npm run build` 通过。
- Highlight follow-up tasks and explain configuration changes, especially Tailwind or Next.js adjustments; 必要时标注后续工作，并说明 Tailwind 或 Next.js 配置修改原因。

## Security & Configuration Tips
- Store secrets in `.env.local` and never commit them; 秘钥保存在 `.env.local`，严禁提交到仓库。
- Review new dependencies for size, maintenance, and licensing impact before installation; 在引入依赖前审查其体积、维护状况与许可影响。
