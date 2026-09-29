# BUILD_GUIDE.md —— 从脚手架到 TestFlight

> 两条硬性事实先说清楚：
> ① **打包签名必须在 Mac 或云 Mac 环境完成，Linux 机器做不了。**
> ② 当前内容包约 **224MB**（视频约 207MB），**超过 App Store 蜂窝网络下载限制（约 200MB）**。
>     体积问题有两种选择（见第 6 节），由用户决定，本指南不替选。

## 1. 注册 Apple Developer

> ✅ 注册已于 2026-09-29 通过苹果审核。Team ID：`LRWKNYMQZJ`（用户 2026-09-29 下午提供）。
> 在 Xcode Signing & Capabilities 中选择该 Team；云打包时填入同一 Team ID。
> ✅ 2026-09-29 晚：用户选定**云 Mac（Codemagic）**路线。`ios/` 原生工程已在 Linux 上用
> `npx cap add ios` 生成并提交到 GitHub 私有仓库 `zohrawang9-hue/kidsstories-app`（main 分支），
> 云打包配置见 `codemagic.yaml`。`npx cap sync` 与签名打包在 Codemagic 的 Mac 上执行。

1. 用 Apple ID 登录 [Apple Developer 官网](https://developer.apple.com)（以官网为准），
   注册 Apple Developer Program（年费金额以官网为准，加拿大区可能另计税费）。
2. 注册主体建议选 **个人**（出品方显示个人姓名）或 **组织**（显示"祖丽哈尔工作坊"类名称；
   组织需要 D-U-N-S 编号，流程更长）。署名"祖丽哈尔工作坊 · 加拿大 / Zohra Studio · Canada"
   可放在 App 介绍页与 App 内关于页。
3. 等待苹果审核通过（通常 1–2 天）。

## 2. 注册 Bundle ID

1. 进 [Apple Developer → Certificates, Identifiers & Profiles](https://developer.apple.com/account)，
   新建 **App ID**，Bundle ID 填 `ca.zohra.studio.kidsstories`（必须与
   `capacitor.config.ts` 的 `appId` 完全一致）。
2. 按 NATIVE_FEATURES.md 需要的能力勾选 App Services：
   - Push Notifications（远程推送，第二阶段；本地每日提醒不需要此项）
3. 在 [App Store Connect](https://appstoreconnect.apple.com) 新建 App 记录，
   选 iOS 平台，填名称"圣人故事儿童集"、语言、SKU（自定，如 `kidsstories001`）。

## 3. 在 Mac 上生成 iOS 工程并打包（二选一）

### 方案 A：本地 Mac + Xcode（推荐，有 Mac 时）

```bash
cd app-native
npm install
npx cap add ios     # 生成 ios/（只需一次）
# 把网页版构建产物放入 web/（见 web/README.md），图标放入 Assets
npx cap sync
npx cap open ios
```

在 Xcode 中：
1. 登录 Apple ID（Settings → Accounts），target → Signing & Capabilities 选 Team，
   勾选 Automatically manage signing。
2. Product → Scheme 选 **Any iOS Device (arm64)**。
3. Product → **Archive**，完成后在 Organizer 点 **Distribute App → App Store Connect** 上传。

### 方案 B：云 Mac（无 Mac 时）

用 Codemagic 等云打包服务：连接代码仓库（本工程需先推到 GitHub 等），
选择 iOS workflow、填入 App Store Connect API 密钥，云端自动执行
`npm install → npx cap sync → xcodebuild archive → 上传 App Store Connect`。
首次配置约半小时，之后每次网页版更新都可一键重新打包。

## 4. TestFlight 内测

1. 上传成功后，在 App Store Connect → TestFlight 等构建处理完成（约 10–30 分钟）。
2. **内部测试**：添加最多 100 名团队成员，无需苹果审核，即装即测。
3. **外部测试**：添加外部测试员（邮箱或公开链接，最多 10,000 人），
   首次外部构建需经过苹果 Beta 审核（通常 1 天内）。
4. 测试重点：26 集播放与中英切换、打卡积分持久化、每日提醒推送、睡眠定时后台播放。

## 5. 正式上架

1. 在 App Store Connect 填写：App 预览截图、描述（中英）、关键词、年龄分级。
   - 年龄分级：儿童 App 如实填写问卷，通常为 **4+**。
   - 隐私标签：本 App 无账号系统、不收集个人信息，按实际填写"未收集数据"。
2. 提交审核（通常 1–3 天）。被拒按反馈修改后重新提交即可。
3. 上架后每次更新（新剧集、新语言、新功能）走同样流程发新版本。

## 6. 包体积：必须二选一

| 现状 | 约 224MB（视频约 207MB），超过约 200MB 的蜂窝网络下载限制 |
|---|---|
| 选择 A：接受仅 Wi-Fi 下载 | 用户在移动数据下看到 App 会提示"需连接 Wi-Fi 下载"。零额外工作，今晚就能提审。 |
| 选择 B：进一步压缩视频 | 把 26 集压到 200MB 以内（如降码率/分辨率），支持蜂窝网络下载。画面会有可感知的清晰度下降，需重新压片并全量回归测试播放。 |

**请用户拍板后再执行。**

## 7. 上架前检查清单

- [ ] CONTENT_BUNDLE.md 的数据缺口已处理（names99 补齐到 99 条）
- [ ] 包体积方案已选定
- [ ] 真机测试通过（iPhone 各尺寸，iOS 最新两版）
- [ ] App 内署名：祖丽哈尔工作坊 · 加拿大🇨🇦 / Zohra Studio · Canada
- [ ] 隐私政策页（如官网或 App 内页面，苹果要求提供链接）
