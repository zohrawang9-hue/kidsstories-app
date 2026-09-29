# ios/ —— iOS 原生工程目录（需在 Mac 上生成）

本目录在 Linux 机器上**无法生成**，必须在 Mac（或云 Mac，如 Codemagic）上执行：

```bash
cd ~/workspace/app-native
npm install
npx cap add ios      # 生成 ios/ 原生工程（只需做一次）
npx cap sync         # 把 web/ 内容与插件同步进原生工程（每次网页包更新后重做）
npx cap open ios     # 用 Xcode 打开
```

## 在 Xcode 里要做的事（首次）

1. 用已注册 Apple Developer 的 Apple ID 登录 Xcode（Settings → Accounts）。
2. 选择 target → Signing & Capabilities：
   - Team 选择你的开发团队
   - Bundle Identifier 填 `ca.zohra.studio.kidsstories`（与 capacitor.config.ts 的 appId 一致）
   - Automatically manage signing 勾选
3. 把 `assets/icon-1024.png` 拖入 `Assets.xcassets → AppIcon`（Xcode 会自动生成各尺寸）。
4. 需要的 Capabilities 按 NATIVE_FEATURES.md 开启：
   - Background Modes → Audio（睡眠定时后台播放）
   - Push Notifications（远程推送，第二阶段；本地提醒不需要）
5. 真机调试：连 iPhone → 选择设备 → Run。

之后打包上传见 BUILD_GUIDE.md。
