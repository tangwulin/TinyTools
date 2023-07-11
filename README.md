<br />
<p align="center">
<a href="https://github.com/tangwulin/TinyTools" target="blank">
    <img src="images/logo.png" alt="Logo" width="156" height="156">
  </a>
  <h2 align="center" style="font-weight: 600">TinyTools</h2>

  <p align="center">
    一个拿来抽座位的东西
    <br />
    <a href="https://tiny-tools-lime.vercel.app/" target="blank"><strong>🌎 访问DEMO</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#%EF%B8%8F-安装" target="blank"><strong>📦️ 下载安装包</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://t.me/yesplaymusic" target="blank"><strong>💬 加入交流群</strong></a>
    <br />
    <br />
  </p>

## ✨ 特性

- ✅ 使用 Vue.js 全家桶开发
- 🪶 运作全过程均在前端中完成，又轻又快，无需笨重的Electron
- ✈️ 使用多线程处理数据，拒绝慢、卡 ~~（当然要是你的机器太差也没办法）~~
- ⚙️ 全新编写的多种座位抽选逻辑，为你创造不再抽到犄角旮旯的体验
- 🎶 内置数十首坤曲 ~~增添一些抽座位时的乐趣~~
- 🛠 更多特性开发中

## 📦️ 安装

Tauri 版本目前仅支持 Windows。（有谁要ubuntu和macos的可以发个issue)

已知Bug：无法拖动座位（这个锅是Webview2的，我不背）

访问本项目的 [Releases](https://github.com/tangwulin/TinyTools/releases)
页面下载安装包。

## 🔧 开发
### 初始化项目和依赖

```sh
pnpm install
```

### 开发

```sh
pnpm dev
```

### 构建

```sh
pnpm build
```

## 👷‍♂️ 打包客户端

如果在 Release 页面没有找到适合你的设备的安装包的话，你可以根据下面的步骤来打包自己的客户端。

[//]: # (1. 打包 Electron 需要用到 Node.js 和 Yarn。可前往 [Node.js 官网]&#40;https://nodejs.org/zh-cn/&#41; 下载安装包。安装 Node.js)

[//]: # (   后可在终端里执行 `npm install -g yarn` 来安装 Yarn。)

[//]: # ()
[//]: # (2. 使用 `git clone --recursive https://github.com/qier222/YesPlayMusic.git` 克隆本仓库到本地。)

[//]: # ()
[//]: # (3. 使用 `yarn install` 安装项目依赖。)

[//]: # ()
[//]: # (4. 复制 `/.env.example` 文件为 `/.env` 。)

[//]: # ()
[//]: # (5. 选择下列表格的命令来打包适合的你的安装包，打包出来的文件在 `/dist_electron`)

[//]: # (   目录下。了解更多信息可访问 [electron-builder 文档]&#40;https://www.electron.build/cli&#41;)

[//]: # ()
[//]: # (| 命令                                         | 说明                  |)

[//]: # (|--------------------------------------------|---------------------|)

[//]: # (| `yarn electron:build --windows nsis:ia32`  | Windows 32 位        |)

[//]: # (| `yarn electron:build --windows nsis:arm64` | Windows ARM         |)

[//]: # (| `yarn electron:build --linux deb:armv7l`   | Debian armv7l（树莓派等） |)

[//]: # (| `yarn electron:build --macos dir:arm64`    | macOS ARM           |)

1. 打包 Tauri 需要用到 Node.js 和 Pnpm。可前往 [Node.js 官网](https://nodejs.org/zh-cn/) 下载安装包。安装 Node.js
   后可在终端里执行 `npm install -g pnpm` 来安装 Pnpm。
2. 使用 `git clone https://github.com/tangwulin/TinyTools.git` 克隆本仓库到本地。
3. 使用 `pnpm install` 安装项目依赖。
4. 参考[Tauri的文档](https://tauri.app/v1/guides/getting-started/prerequisites/)构建Rust开发环境
5. 参考[Tauri的构建教程](https://tauri.app/v1/guides/building/)构建适合你的安装包

## ☑️ Todo

查看 Todo 请访问本项目的 [Projects](https://github.com/tangwulin/TinyTools/projects/1)

欢迎提 Issue 和 Pull request。

## 📜 开源许可

本项目仅供个人学习研究使用，禁止用于商业及非法用途。

基于 [MIT license](https://opensource.org/licenses/MIT) 许可进行开源。

## 🖼️ 截图

[//]: # (![lyrics][lyrics-screenshot])

[//]: # (![library-dark][library-dark-screenshot])

[//]: # (![album][album-screenshot])

[//]: # (![home-2][home-2-screenshot])

[//]: # (![artist][artist-screenshot])

[//]: # (![search][search-screenshot])

[//]: # (![home][home-screenshot])

[//]: # (![explore][explore-screenshot])

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[//]: # ([album-screenshot]: images/album.png)

[//]: # ()
[//]: # ([artist-screenshot]: images/artist.png)

[//]: # ()
[//]: # ([explore-screenshot]: images/explore.png)

[//]: # ()
[//]: # ([home-screenshot]: images/home.png)

[//]: # ()
[//]: # ([home-2-screenshot]: images/home-2.png)

[//]: # ()
[//]: # ([lyrics-screenshot]: images/lyrics.png)

[//]: # ()
[//]: # ([library-screenshot]: images/library.png)

[//]: # ()
[//]: # ([library-dark-screenshot]: images/library-dark.png)

[//]: # ()
[//]: # ([search-screenshot]: images/search.png)

