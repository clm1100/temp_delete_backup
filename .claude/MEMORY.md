# Claude Code Memory

## Windows 环境注意事项

### npm/node 在 bash 中的问题
- `npm` 可能不在 bash 的 PATH 中（即使 `where npm` 能找到 `C:\vm4w\nodejs\npm.cmd`）
- `.bin` 目录下的 `vite`、`eslint` 等是 Unix shell 脚本（无扩展名）和 `.cmd`（Windows batch）、`.ps1`（PowerShell）共存
- 直接 `node node_modules/.bin/vite` 会失败（因为无扩展名的文件是 shell 脚本）
- **解决方案：用 PowerShell 运行 `.ps1` 脚本**
  ```powershell
  powershell -File node_modules/.bin/vite.ps1
  ```

### 项目信息
- 技术栈：React 19 + Vite 8 + TypeScript + Ant Design 6 + Zustand + React Router 7
- 端口：5173
