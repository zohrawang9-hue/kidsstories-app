# assets/ —— App 图标

## 主图标

`icon-1024.png`（1024×1024，PNG，无透明、无圆角，iOS 会自动加圆角遮罩）

设计（品牌要求）：
- 深绿底（#0B5E36）＋ 淡色伊斯兰八角星几何纹样
- 金色简洁新月（#C9A227）＋ 一颗金星，细金环点缀
- 无人物、无小孩读书、无光环、无土黄/卡其色、无紫色

## 生成各尺寸

### 方法一：Xcode（推荐）

把 `icon-1024.png` 拖进 Xcode 工程 `Assets.xcassets → AppIcon`，
Xcode 14+ 会自动从 1024 生成全部所需尺寸。

### 方法二：capacitor-assets 工具（Mac 上）

```bash
npm install -D @capacitor/assets
npx capacitor-assets generate --iconBackgroundColor '#0B5E36' --splashBackgroundColor '#0B5E36'
```

它会按 `assets/` 下的源图生成 iOS / Android 全套图标与启动屏。

## 换图标

直接替换 `icon-1024.png`（保持 1024×1024、PNG、方形满幅），
重新执行上面任一方法即可。
