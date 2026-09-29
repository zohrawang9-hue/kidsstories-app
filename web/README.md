# web/ —— 网页包目录

`npx cap sync` 会把这个目录的全部内容复制进 iOS 工程，作为 App 内打开的网页。

## 内容来源

网页包 = 网页版原型（artifact slug `space-2`）的**构建产物**（静态文件），不是源码。
每次网页版更新后，重新导出一份构建产物覆盖到本目录，再执行 `npx cap sync`。

## 打包前检查清单

- [ ] `index.html` 在根目录且能离线打开
- [ ] `videos/` 26 集 MP4 已放入（中英双音轨版，见 CONTENT_BUNDLE.md）
- [ ] `dub_en/*.en.srt` 26 集英文字幕已放入
- [ ] `thumbs/` 26 张缩略图已放入
- [ ] 全部 JSON 内容文件（episodes/quizzes/duas/sunnahs/riddles/names99/prayer_steps/memorize_surahs/prophets_timeline）已放入
- [ ] 在桌面浏览器用 `file://` 或本地 http 服务打开一遍：26 集列表、播放器、测验、打卡都正常

## 体积提示

视频约 207MB，总内容约 224MB。App Store 对蜂窝网络下载有限制（约 200MB），
详见 BUILD_GUIDE.md「包体积」一节——是否压缩由用户决定。
