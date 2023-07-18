<br />
<p align="center">
<a href="https://github.com/tangwulin/TinyTools" target="blank">
    <img src="logo.png" alt="Logo" style="height: 16em">
  </a>
  <h2 align="center" style="font-weight: 600">TinyTools</h2>

  <p align="center">
    一个班级管理工具集
    <br />
    <a href="https://tiny-tools-lime.vercel.app/" target="blank"><strong>🌎 访问DEMO</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#%EF%B8%8F-安装" target="blank"><strong>📦️ 下载安装包</strong></a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="https://qm.qq.com/cgi-bin/qm/qr?k=uzG7G5F3KZHdTiM4iLhpu-75XjFDHLLp&jump_from=webapi&authKey=buoIUVnbAl04s8AdlaApJAV94ZjnU12GwPz7M0iEPrNe6UXchAAIIJ37VSguYBIk" target="blank"><strong>💬 加入交流群</strong></a>
    <br />
    <br />
  </p>

## ✨ 特性

- ✅ 使用 Vue.js + Tauri开发，又轻又快，低配机器不再等待
- 🪶 超小二进制构建（15MB内），媲美Native应用
- ✈️ 使用WebWorker处理数据，拒绝慢、卡 ~~（当然要是你的机器太差也没办法）~~
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

（暂时没有，有空补上）

