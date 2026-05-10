---
title: "开源我的第一个项目，Mac NAS Guardian"
pubDatetime: 2026-05-10T17:00:00+08:00
description: "Intel MacBook 装飞牛 OS 做 NAS，没有风扇控制，夏天温度飙到 90°C。用Ai 写了个 Mac NAS Guardian，今天开源了。"
tags: [ "开源", "NAS"]
ogImage: "/images/mac-nas-guardian-ui.png"
draft: false
featured: false
---

有一台吃灰多年的旧款 Intel MacBook Pro，好在是16G内存，所以其实还能用，于是刷了个飞牛 NAS。虽然飞牛去年年底出过一次安全事故，但是除此外体验还不错。

不过有一些小问题，比如风扇没法控制，CPU温度上来了，风扇转速却上不来，在 NAS 的场景下，就比较麻烦。

于是乎，我用 AI 写了个守护程序，用了一段时间，还算稳定，今天开源出来。

### 问题：没人管风扇

MacBook 在 macOS 下有一套成熟的 SMC 温控机制。但装上 Linux 之后，这套机制就失效了。在 NAS 工况下——24 小时不间断读写、基本没有空闲——做一些重一些的读写，比如复制大量文件、转码视频，CPU温度会悄无声息地爬到 80°C、90°C，风扇却还在以默认的低转速"躺平"。

长期高温对硬件的损耗不必多说。更麻烦的是，飞牛 OS 的 NAS 管理界面完全没有提供 MacBook 硬件层面的控制入口——风扇、背光、息屏，这些东西在它的设计范围之外。

Linux 内核其实暴露了 `applesmc`、`coretemp`、`hwmon` 这些接口，可以读到 CPU 温度和风扇转速，也允许写入目标转速。只是没有现成的工具把这些串起来，做成一个能在 NAS 上长期稳定运行的守护进程。

于是我自己写了一个。

### Mac NAS Guardian

[Mac NAS Guardian](https://github.com/xiaoker/mac-nas-guardian) 是一个运行在飞牛 OS 宿主机上的 Python 守护程序。核心逻辑其实并不复杂：

- **温度监控**：实时读取 CPU 核心温度
- **风扇控制**：根据温度曲线自动设置风扇目标转速，支持静音、均衡、强冷三种预设，也可以自定义曲线
- **键盘背光**：开机自动关闭键盘背光，我的2014款MacBook Pro是有背光的苹果logo的，NAS场景不需要它亮着
- **控制台息屏**：关闭屏幕显示，但不让系统休眠
- **Web 管理界面**：本地 `http://NAS-IP:18923/` 可以实时看到温度、转速和接管状态，也可以在线调整风扇策略

![Mac NAS Guardian 管理界面](/images/mac-nas-guardian-ui.png)

默认的风扇策略偏保守，适合长期运行：

| 温度区间 | 策略 |
|---------|------|
| < 45°C | 保持低转速 |
| 45°C – 65°C | 线性提速 |
| 65°C – 80°C | 快速抬升 |
| ≥ 80°C | 直接最大转速 |

### 安装很简单

把项目拷贝到 NAS 宿主机上，先跑一下硬件探测确认接口可用：

```bash
bash scripts/probe-hardware.sh
```

确认能读到温度和风扇接口后，一键安装：

```bash
sudo bash scripts/install-host.sh
```

装完就以 systemd 服务形式运行，开机自启。

### 适用范围

这个项目目前主要面向：**旧款 Intel 芯片的 MacBook Pro + 飞牛 OS**。

理论来说，Intel 芯片的 MacBook和Mac mini 同样适用，但不适用非 Intel 芯片的Mac设备。

从原理上讲，它依赖的是 Linux 内核暴露的硬件接口，并不绑定飞牛 OS 本身。如果你的 MacBook 运行的是 Debian、Ubuntu、OpenMediaVault 或 CasaOS，理论上也能用——前提是 `applesmc` 和 `hwmon` 接口可用。

原厂 NAS 设备（群晖、威联通、极空间等）的硬件接口通常完全不同，这个项目不能直接适配，请不要误用。

### 开源出来的原因

这个东西我自己用了一段时间，基本稳定了。

但不同款的 MacBook 暴露的 sysfs 路径不完全一样，有些机型的风扇写入接口路径和我的不同，也有一些细节我可能没覆盖到。与其藏在本地，不如开放出来，让同样折腾这条路的人也能用上，顺便收集一些不同机型的反馈。

如果你也在用旧 MacBook 跑 NAS，欢迎试用，提 issue 告诉我你的机型和硬件探测结果。

GitHub 地址：[xiaoker/mac-nas-guardian](https://github.com/xiaoker/mac-nas-guardian)
