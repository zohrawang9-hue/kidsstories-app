# NATIVE_FEATURES.md —— 原生版新增能力规划

网页版（space-2，静态托管）做不到、原生版才能实现的能力。
所列插件已在 `package.json` 中备好。

## 1. 真正的持久化（@capacitor/preferences）

网页版现状：打卡、积分、徽章、收藏、答题记录、学习进度只在页面打开期间有效，
关页面即失（静态托管无后端）。

原生版方案：用 Preferences API 作为唯一数据源，数据存在 App 沙盒，
**关 App、重启手机都不丢失**（随系统备份）。

建议 key 设计（JSON 字符串存储）：

| key | 内容 |
|---|---|
| `ks.checkin` | `{ "lastDate": "2026-09-29", "streak": 5, "totalDays": 12 }` |
| `ks.points` | `{ "total": 320, "badges": ["b100","b300"] }` |
| `ks.favorites` | `{ "episodes": ["ep01"], "duas": [3], "names": [1,2] }` |
| `ks.quiz` | `{ "ep01": { "best": 15, "tries": 2 } }`（每集最高分+次数） |
| `ks.learn.names` | 已学会的尊名 id 数组（99 集齐徽章） |
| `ks.learn.surahs` | 已背会的短章 id 数组 |
| `ks.learn.timeline` | 看过的剧集 id 数组 |
| `ks.settings` | `{ "lang": "zh", "reminder": true, "reminderTime": "07:30" }` |

徽章沿用网页版规则：100 / 300 / 600 / 1000 分。

## 2. 每日提醒推送（@capacitor/local-notifications）

网页版现状：只能做页内提醒设置，App 关掉就不响。

原生版方案：**本地定时通知**，无需服务器、完全免费：
- 每日晨起祈祷提醒（如 7:30「今天的祈祷词读了吗？」）
- 睡前故事提醒（如 20:30「今晚听一集先知故事吧」）
- 用户在 App 内开关、选时间；首次开启时请求通知权限。

## 3. 新内容远程推送（@capacitor/push-notifications，第二阶段）

首版可不上。等新剧集/新语言上线时，用 APNs 推送"新故事上架了"。
需要：在 Apple Developer 后台为 App ID 开通 Push Notifications，
Xcode 打开 Push Notifications capability，配一个 APNs Key。

## 4. 睡眠定时后台播放（Background Audio）

网页版现状：锁屏/切后台音频会停。

原生版方案：
- Xcode → Signing & Capabilities → **Background Modes → 勾选 Audio**。
- 播放音频的 WebView 需配置 AVAudioSession（Capacitor 社区有现成方案），
  睡眠定时（10/20/30 分钟）倒计时到后在后台淡出停止。
- App Store 审核注意：后台音频必须确有播放场景（本 App 有），如实说明即可。

## 5. 内容增量更新（@capacitor/filesystem，第二阶段）

首版 26 集视频随包发布。后续新剧集不必等整包更新：
把新视频放下载目录、用 Filesystem API 管理本地缓存，App 内直接播放。
（需配套一个简单的内容清单接口，网页版阶段暂不做。）

## 6. 小体验加分项（首版可顺手做）

- 答题正确时的轻微震动（iOS Haptics，无需插件，Web Audio/vibrate 在 WKWebView 受限，
  可用社区 haptics 插件或忽略）
- 深色模式跟随系统（网页版已是深绿主题，基本天然适配）
