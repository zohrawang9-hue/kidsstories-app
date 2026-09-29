import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Bundle ID（iOS）。注册 Apple Developer 后需在后台用完全相同的 ID 建 App ID。
  // 如需更换，同步修改 Apple Developer 后台与 Xcode 工程。
  appId: 'ca.zohra.studio.kidsstories',
  appName: '圣人故事儿童集',
  // 打进原生壳的网页包目录（见 web/README.md）
  webDir: 'web',
  // 启动屏/状态栏底色：品牌深绿
  backgroundColor: '#0B5E36',
  ios: {
    // 允许网页里 <video> 内联播放（不要强制全屏）
    allowsInlineMediaPlayback: true,
  },
};

export default config;
