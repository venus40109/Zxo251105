# ZXO 戒烟打卡应用 - 产品需求文档（PRD）

**版本号：** v3.0  
**最后更新：** 2025年12月1日  
**文档类型：** 产品需求文档（需求+功能清单+前后端设计）

---

## 目录

1. [产品概述](#一产品概述)
2. [功能清单](#二功能清单)
3. [用户认证系统](#三用户认证系统)
4. [用户中心](#四用户中心)
5. [打卡系统](#五打卡系统)
6. [段位与成就](#六段位与成就)
7. [烟瘾记录系统](#七烟瘾记录系统)
8. [排行榜系统](#八排行榜系统)
9. [AI 助手系统](#九ai-助手系统)
10. [支付系统](#十支付系统)
11. [数据报告](#十一数据报告)
12. [分享系统](#十二分享系统)
13. [技术架构](#十三技术架构)
14. [数据库设计](#十四数据库设计)
15. [API 接口设计](#十五api-接口设计)
16. [部署方案](#十六部署方案)

---

## 一、产品概述

### 1.1 产品定位

ZXO 是一款以**游戏化段位晋升**为核心的戒烟打卡小程序/Web 应用，通过每日打卡、补签卡系统、9 段位星级体系、烟瘾记录、AI 助手、排行榜竞技等功能，帮助用户科学戒烟、持续坚持。

### 1.2 核心价值

- **游戏化激励**：段位晋升、星级系统、排行榜竞技
- **科学戒烟**：烟瘾记录曲线、健康报告、AI 智能辅导
- **社交动力**：排行榜、分享海报、好友互助
- **容错机制**：补签卡系统，降低中断焦虑

### 1.3 目标用户

- **主要用户**：25-45 岁有戒烟意愿的成年烟民
- **使用场景**：每日打卡、烟瘾发作记录、查看数据报告、AI 咨询
- **核心诉求**：坚持激励、成果可视化、戒烟指导

### 1.4 商业模式

- **免费用户**：基础打卡、本地排名
- **VIP 会员**：全国排名、4 天 AI 体验（¥9.9/月）
- **AI 戒烟军师**：完整 AI 功能（¥29.9/月、¥199/年）
- **补签卡商城**：单独购买补签卡（¥0.99/张）

---

## 二、功能清单

### 2.1 核心功能模块

#### ✅ 已完成功能

| 模块 | 功能 | 优先级 | 状态 |
|------|------|--------|------|
| **开屏页** | 品牌展示（3秒） | P0 | ✅ 已完成 |
| **首页** | 用户信息展示 | P0 | ✅ 已完成 |
| | 6项核心数据展示 | P0 | ✅ 已完成 |
| | 打卡按钮 | P0 | ✅ 已完成 |
| | 烟瘾记录按钮 | P1 | ✅ 已完成 |
| | 快捷入口（6个） | P1 | ✅ 已完成 |
| **首次设置** | 吸烟数据收集 | P0 | ✅ 已完成 |
| | 用户协议同意 | P0 | ✅ 已完成 |
| **成就等级页** | 9段位体系展示 | P1 | ✅ 已完成 |
| | 当前段位高亮 | P1 | ✅ 已完成 |
| **打卡日历** | 月历视图 | P0 | ✅ 已完成 |
| | 补签功能 | P0 | ✅ 已完成 |
| | 补签卡管理 | P0 | ✅ 已完成 |
| **分享海报** | 成果海报生成 | P1 | ✅ 已完成 |
| | 排名展示（差异化） | P1 | ✅ 已完成 |
| | 下载/分享 | P1 | ✅ 已完成 |
| **数据报告** | 烟瘾记录曲线 | P1 | ✅ 已完成 |
| | 时段分布统计 | P1 | ✅ 已完成 |
| **健康报告** | 健康改善时间线 | P2 | ✅ 已完成 |
| | 里程碑达成展示 | P2 | ✅ 已完成 |
| **排行榜** | 本地排名（街道/区） | P1 | ✅ 已完成 |
| | 全国排名（VIP） | P1 | ✅ 已完成 |
| | 权限差异化展示 | P1 | ✅ 已完成 |
| **设置页** | 基础信息展示 | P1 | ✅ 已完成 |
| | 修改吸烟数据 | P1 | ✅ 已完成 |
| | 兑换码系统 | P1 | ✅ 已完成 |
| **AI 助手** | 对话界面 | P2 | ✅ 已完成 |
| | 权限控制 | P2 | ✅ 已完成 |

#### 🚧 待开发功能

| 模块 | 功能 | 优先级 | 状态 |
|------|------|--------|------|
| **用户认证** | 微信小程序登录 | P0 | 🚧 待开发 |
| | 手机号登录 | P2 | 🚧 待开发 |
| **用户中心** | 修改头像 | P1 | 🚧 待开发 |
| | 修改昵称 | P1 | 🚧 待开发 |
| | 地址识别（GPS） | P1 | 🚧 待开发 |
| | 手动选择地址 | P2 | 🚧 待开发 |
| **支付系统** | 微信支付接入 | P0 | 🚧 待开发 |
| | VIP 会员购买 | P0 | 🚧 待开发 |
| | AI 会员购买 | P0 | 🚧 待开发 |
| | 补签卡购买 | P1 | 🚧 待开发 |
| | 支付回调处理 | P0 | 🚧 待开发 |
| | 订单管理 | P1 | 🚧 待开发 |
| **AI 系统** | DeepSeek 本地部署 | P1 | 🚧 待开发 |
| | 提示词优化 | P1 | 🚧 待开发 |
| | 对话上下文管理 | P1 | 🚧 待开发 |
| **后端基础** | 数据库初始化 | P0 | 🚧 待开发 |
| | API 接口开发 | P0 | 🚧 待开发 |
| | 缓存系统搭建 | P1 | 🚧 待开发 |
| | 消息队列搭建 | P2 | 🚧 待开发 |

#### 💡 未来规划

| 模块 | 功能 | 优先级 | 计划版本 |
|------|------|--------|----------|
| **社交功能** | 好友系统 | P2 | v3.5 |
| | 互相监督 | P2 | v3.5 |
| | 戒烟日记 | P3 | v4.0 |
| **成就系统** | 徽章收集 | P2 | v3.5 |
| | 称号系统 | P3 | v4.0 |
| **数据分析** | 个性化推荐 | P2 | v4.0 |
| | 烟瘾预测 | P3 | v4.0 |
| **线下活动** | 戒烟挑战赛 | P3 | v5.0 |

---

## 三、用户认证系统

### 3.1 微信小程序登录

#### 3.1.1 功能描述

- 使用微信小程序授权登录
- 获取用户 openid 作为唯一标识
- 自动获取微信头像和昵称（用户授权后）
- 生成 JWT Token 用于后续请求

#### 3.1.2 登录流程

```
用户打开小程序
  ↓
调用 wx.login() 获取 code
  ↓
前端发送 code 到后端
  ↓
后端调用微信 API 获取 openid
  ↓
检查用户是否已注册
  ├── 已注册 → 返回用户信息 + JWT Token
  └── 未注册 → 创建新用户 → 返回信息 + JWT Token
  ↓
前端存储 Token
  ↓
进入首页
```

#### 3.1.3 前端实现

**小程序端（WeChat Mini Program）**

```javascript
// pages/login/login.js
Page({
  onLoad() {
    this.wxLogin();
  },

  // 微信登录
  async wxLogin() {
    try {
      // 1. 获取 code
      const { code } = await wx.login();
      
      // 2. 发送到后端
      const res = await wx.request({
        url: 'https://api.zxo.app/v1/auth/wechat/login',
        method: 'POST',
        data: { code }
      });
      
      const { token, user } = res.data.data;
      
      // 3. 存储 Token
      wx.setStorageSync('token', token);
      wx.setStorageSync('user', user);
      
      // 4. 跳转首页
      wx.switchTab({ url: '/pages/home/home' });
      
    } catch (error) {
      wx.showToast({ title: '登录失败', icon: 'none' });
    }
  },

  // 获取用户信息（需要用户点击授权）
  async getUserProfile() {
    try {
      const { userInfo } = await wx.getUserProfile({
        desc: '用于完善个人资料'
      });
      
      // 更新用户信息
      await wx.request({
        url: 'https://api.zxo.app/v1/users/me',
        method: 'PUT',
        header: {
          'Authorization': `Bearer ${wx.getStorageSync('token')}`
        },
        data: {
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl
        }
      });
      
      wx.showToast({ title: '授权成功' });
      
    } catch (error) {
      wx.showToast({ title: '授权失败', icon: 'none' });
    }
  }
});
```

**Web 端（扫码登录）**

```typescript
// 生成登录二维码
async function generateQRCode() {
  const res = await fetch('/api/auth/wechat/qrcode');
  const { ticket, qrCodeUrl } = await res.json();
  
  // 显示二维码
  document.getElementById('qrcode').src = qrCodeUrl;
  
  // 轮询检查登录状态
  const pollInterval = setInterval(async () => {
    const statusRes = await fetch(`/api/auth/wechat/status?ticket=${ticket}`);
    const { status, token, user } = await statusRes.json();
    
    if (status === 'confirmed') {
      clearInterval(pollInterval);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/home';
    }
  }, 2000);
}
```

#### 3.1.4 后端实现

**API 接口**

```typescript
// POST /api/v1/auth/wechat/login
import axios from 'axios';
import jwt from 'jsonwebtoken';

interface WechatLoginRequest {
  code: string;
  nickname?: string;
  avatar?: string;
}

async function wechatLogin(req, res) {
  const { code, nickname, avatar } = req.body;
  
  try {
    // 1. 调用微信 API 获取 openid
    const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: process.env.WECHAT_APP_ID,
        secret: process.env.WECHAT_APP_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });
    
    const { openid, session_key, unionid } = wxRes.data;
    
    if (!openid) {
      return res.status(400).json({ code: 400, message: '登录失败' });
    }
    
    // 2. 查找或创建用户
    let user = await db.users.findOne({ where: { openid } });
    
    if (!user) {
      // 创建新用户
      user = await db.users.create({
        openid,
        unionid,
        nickname: nickname || '戒烟勇士',
        avatar: avatar || 'https://zxo.app/default-avatar.png',
        memberType: 'free',
        makeupCards: 3,  // 初始赠送 3 张补签卡
        totalDays: 0,
        consecutiveDays: 0,
        hasAgreedTerms: false
      });
    } else {
      // 更新用户信息（如果提供了）
      if (nickname || avatar) {
        await db.users.update(user.id, {
          nickname: nickname || user.nickname,
          avatar: avatar || user.avatar
        });
        user = await db.users.findById(user.id);
      }
    }
    
    // 3. 生成 JWT Token
    const token = jwt.sign(
      {
        userId: user.id,
        openid: user.openid,
        memberType: user.memberType
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // 4. 返回用户信息和 Token
    res.json({
      code: 200,
      data: {
        token,
        user: {
          id: user.id,
          nickname: user.nickname,
          avatar: user.avatar,
          memberType: user.memberType,
          totalDays: user.totalDays,
          consecutiveDays: user.consecutiveDays,
          makeupCards: user.makeupCards
        }
      }
    });
    
  } catch (error) {
    logger.error('微信登录失败', error);
    res.status(500).json({ code: 500, message: '登录失败' });
  }
}
```

**数据库表结构**

```sql
-- 用户表添加微信相关字段
ALTER TABLE users ADD COLUMN openid VARCHAR(128) UNIQUE;
ALTER TABLE users ADD COLUMN unionid VARCHAR(128);
ALTER TABLE users ADD COLUMN session_key VARCHAR(128);
ALTER TABLE users ADD COLUMN wechat_nickname VARCHAR(100);
ALTER TABLE users ADD COLUMN wechat_avatar VARCHAR(500);

CREATE INDEX idx_users_openid ON users(openid);
CREATE INDEX idx_users_unionid ON users(unionid);
```

### 3.2 手机号登录（备选方案）

#### 3.2.1 功能描述

- 支持手机号 + 验证码登录
- 用于 Web 端或不使用微信的用户

#### 3.2.2 登录流程

```
用户输入手机号
  ↓
点击"获取验证码"
  ↓
后端发送短信验证码
  ↓
用户输入验证码
  ↓
后端验证验证码
  ↓
登录成功，返回 Token
```

#### 3.2.3 API 接口

```typescript
// POST /api/v1/auth/sms/send
async function sendSmsCode(req, res) {
  const { phone } = req.body;
  
  // 1. 验证手机号格式
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return res.status(400).json({ code: 400, message: '手机号格式错误' });
  }
  
  // 2. 检查发送频率（60秒限制）
  const lastSendTime = await redis.get(`sms:${phone}:last_send`);
  if (lastSendTime && Date.now() - parseInt(lastSendTime) < 60000) {
    return res.status(429).json({ code: 429, message: '请勿频繁发送' });
  }
  
  // 3. 生成 6 位验证码
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // 4. 存储验证码（5 分钟有效）
  await redis.setex(`sms:${phone}:code`, 300, code);
  await redis.set(`sms:${phone}:last_send`, Date.now().toString());
  
  // 5. 调用短信服务发送
  await smsService.send(phone, {
    template: 'login',
    params: { code }
  });
  
  res.json({ code: 200, message: '验证码已发送' });
}

// POST /api/v1/auth/sms/login
async function smsLogin(req, res) {
  const { phone, code } = req.body;
  
  // 1. 验证验证码
  const storedCode = await redis.get(`sms:${phone}:code`);
  if (!storedCode || storedCode !== code) {
    return res.status(400).json({ code: 400, message: '验证码错误' });
  }
  
  // 2. 删除验证码
  await redis.del(`sms:${phone}:code`);
  
  // 3. 查找或创建用户
  let user = await db.users.findOne({ where: { phone } });
  
  if (!user) {
    user = await db.users.create({
      phone,
      nickname: `用户${phone.slice(-4)}`,
      avatar: 'https://zxo.app/default-avatar.png',
      memberType: 'free',
      makeupCards: 3
    });
  }
  
  // 4. 生成 Token
  const token = jwt.sign(
    { userId: user.id, memberType: user.memberType },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    code: 200,
    data: { token, user }
  });
}
```

---

## 四、用户中心

### 4.1 修改头像

#### 4.1.1 功能描述

- 用户可以上传自定义头像
- 支持图片裁剪（1:1 比例）
- 上传到 OSS 云存储
- 自动生成缩略图

#### 4.1.2 前端实现

**小程序端**

```javascript
// 选择并上传头像
async function chooseAvatar() {
  try {
    // 1. 选择图片
    const { tempFilePaths } = await wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    });
    
    const tempFilePath = tempFilePaths[0];
    
    // 2. 上传到后端
    wx.uploadFile({
      url: 'https://api.zxo.app/v1/upload/avatar',
      filePath: tempFilePath,
      name: 'avatar',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success: (res) => {
        const { avatarUrl } = JSON.parse(res.data).data;
        
        // 3. 更新用户信息
        this.setData({ avatar: avatarUrl });
        wx.showToast({ title: '头像已更新' });
      },
      fail: () => {
        wx.showToast({ title: '上传失败', icon: 'none' });
      }
    });
    
  } catch (error) {
    console.error('选择头像失败', error);
  }
}
```

**Web 端（带裁剪）**

```typescript
import Cropper from 'cropperjs';

function initAvatarUpload() {
  const input = document.getElementById('avatar-input') as HTMLInputElement;
  const img = document.getElementById('crop-image') as HTMLImageElement;
  let cropper: Cropper;
  
  input.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    // 显示裁剪器
    const reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target?.result as string;
      
      // 初始化裁剪器
      cropper = new Cropper(img, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1
      });
    };
    reader.readAsDataURL(file);
  });
  
  // 确认裁剪
  document.getElementById('crop-confirm')?.addEventListener('click', async () => {
    const canvas = cropper.getCroppedCanvas({ width: 200, height: 200 });
    
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('avatar', blob!, 'avatar.jpg');
      
      const res = await fetch('/api/v1/upload/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      const { avatarUrl } = await res.json();
      
      // 更新头像
      document.getElementById('user-avatar').src = avatarUrl;
      alert('头像已更新');
    });
  });
}
```

#### 4.1.3 后端实现

```typescript
import multer from 'multer';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// 配置 multer（内存存储）
const upload = multer({ storage: multer.memoryStorage() });

// 配置 S3（或阿里云 OSS）
const s3Client = new S3Client({
  region: process.env.OSS_REGION,
  credentials: {
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    secretAccessKey: process.env.OSS_ACCESS_KEY_SECRET
  }
});

// POST /api/v1/upload/avatar
app.post('/upload/avatar', requireAuth, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ code: 400, message: '未上传文件' });
    }
    
    // 1. 图片处理（压缩、裁剪）
    const processedImage = await sharp(file.buffer)
      .resize(200, 200, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toBuffer();
    
    // 2. 生成文件名
    const filename = `avatars/${userId}_${Date.now()}.jpg`;
    
    // 3. 上传到 OSS
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.OSS_BUCKET,
      Key: filename,
      Body: processedImage,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    }));
    
    // 4. 生成 CDN URL
    const avatarUrl = `https://cdn.zxo.app/${filename}`;
    
    // 5. 更新数据库
    await db.users.update(userId, { avatar: avatarUrl });
    
    // 6. 删除缓存
    await redis.del(`user:${userId}`);
    
    res.json({
      code: 200,
      data: { avatarUrl }
    });
    
  } catch (error) {
    logger.error('上传头像失败', error);
    res.status(500).json({ code: 500, message: '上传失败' });
  }
});
```

### 4.2 修改昵称

#### 4.2.1 功能描述

- 用户可以修改昵称
- 昵称长度限制：2-20 个字符
- 过滤敏感词
- 同一用户每天最多修改 3 次

#### 4.2.2 前端实现

```typescript
async function updateNickname(newNickname: string) {
  // 1. 前端验证
  if (newNickname.length < 2 || newNickname.length > 20) {
    toast.error('昵称长度为 2-20 个字符');
    return;
  }
  
  try {
    // 2. 发送请求
    const res = await fetch('/api/v1/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ nickname: newNickname })
    });
    
    const data = await res.json();
    
    if (data.code === 200) {
      // 更新本地存储
      const user = JSON.parse(localStorage.getItem('user'));
      user.nickname = newNickname;
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success('昵称已更新');
    } else if (data.code === 429) {
      toast.error('今日修改次数已达上限');
    } else {
      toast.error(data.message);
    }
    
  } catch (error) {
    toast.error('修改失败');
  }
}
```

#### 4.2.3 后端实现

```typescript
// PUT /api/v1/users/me
import Filter from 'bad-words';

const filter = new Filter();

async function updateUserInfo(req, res) {
  const userId = req.user.id;
  const { nickname, avatar } = req.body;
  
  try {
    const updates: any = {};
    
    // 1. 处理昵称
    if (nickname !== undefined) {
      // 验证长度
      if (nickname.length < 2 || nickname.length > 20) {
        return res.status(400).json({ code: 400, message: '昵称长度为 2-20 个字符' });
      }
      
      // 过滤敏感词
      if (filter.isProfane(nickname)) {
        return res.status(400).json({ code: 400, message: '昵称包含敏感词' });
      }
      
      // 检查修改次数限制
      const today = new Date().toISOString().split('T')[0];
      const changeCountKey = `nickname_change:${userId}:${today}`;
      const changeCount = await redis.get(changeCountKey);
      
      if (changeCount && parseInt(changeCount) >= 3) {
        return res.status(429).json({ code: 429, message: '今日修改次数已达上限' });
      }
      
      updates.nickname = nickname;
      
      // 增加修改次数
      await redis.incr(changeCountKey);
      await redis.expire(changeCountKey, 86400); // 24 小时过期
    }
    
    // 2. 处理头像
    if (avatar !== undefined) {
      updates.avatar = avatar;
    }
    
    // 3. 更新数据库
    await db.users.update(userId, updates);
    
    // 4. 删除缓存
    await redis.del(`user:${userId}`);
    
    // 5. 返回更新后的用户信息
    const user = await db.users.findById(userId);
    
    res.json({
      code: 200,
      data: { user }
    });
    
  } catch (error) {
    logger.error('更新用户信息失败', error);
    res.status(500).json({ code: 500, message: '更新失败' });
  }
}
```

### 4.3 地址识别（用于排行榜）

#### 4.3.1 功能描述

- 自动获取用户 GPS 位置
- 调用高德/腾讯地图 API 逆地理编码
- 识别省、市、区、街道
- 用于排行榜分级展示
- 支持手动选择地址

#### 4.3.2 前端实现

**小程序端（GPS 定位）**

```javascript
// 获取当前位置
async function getLocation() {
  try {
    // 1. 获取用户授权
    const { authSetting } = await wx.getSetting();
    
    if (!authSetting['scope.userLocation']) {
      await wx.authorize({ scope: 'scope.userLocation' });
    }
    
    // 2. 获取位置信息
    const { latitude, longitude } = await wx.getLocation({
      type: 'gcj02'  // 国测局坐标
    });
    
    // 3. 逆地理编码（调用后端）
    const res = await wx.request({
      url: 'https://api.zxo.app/v1/location/geocode',
      method: 'POST',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      data: { latitude, longitude }
    });
    
    const { province, city, district, street, address } = res.data.data;
    
    // 4. 更新用户地址
    await wx.request({
      url: 'https://api.zxo.app/v1/users/me/location',
      method: 'PUT',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      data: { province, city, district, street }
    });
    
    wx.showToast({ title: '定位成功' });
    
  } catch (error) {
    console.error('定位失败', error);
    wx.showModal({
      title: '定位失败',
      content: '请前往设置手动选择地址',
      confirmText: '去设置'
    });
  }
}
```

**手动选择地址**

```javascript
// 地址选择器
Page({
  data: {
    provinces: [],
    cities: [],
    districts: [],
    streets: [],
    selectedProvince: '',
    selectedCity: '',
    selectedDistrict: '',
    selectedStreet: ''
  },

  onLoad() {
    this.loadProvinces();
  },

  // 加载省份列表
  async loadProvinces() {
    const res = await wx.request({
      url: 'https://api.zxo.app/v1/location/provinces'
    });
    this.setData({ provinces: res.data.data });
  },

  // 选择省份
  async onProvinceChange(e) {
    const province = e.detail.value;
    this.setData({ selectedProvince: province });
    
    // 加载城市列表
    const res = await wx.request({
      url: `https://api.zxo.app/v1/location/cities?province=${province}`
    });
    this.setData({ cities: res.data.data });
  },

  // 选择城市（类似）
  async onCityChange(e) {
    // ...
  },

  // 确认选择
  async confirmAddress() {
    const { selectedProvince, selectedCity, selectedDistrict, selectedStreet } = this.data;
    
    await wx.request({
      url: 'https://api.zxo.app/v1/users/me/location',
      method: 'PUT',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      data: {
        province: selectedProvince,
        city: selectedCity,
        district: selectedDistrict,
        street: selectedStreet
      }
    });
    
    wx.navigateBack();
  }
});
```

#### 4.3.3 后端实现

**逆地理编码**

```typescript
import axios from 'axios';

// POST /api/v1/location/geocode
async function reverseGeocode(req, res) {
  const { latitude, longitude } = req.body;
  const userId = req.user.id;
  
  try {
    // 1. 调用高德地图 API
    const amapRes = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params: {
        key: process.env.AMAP_API_KEY,
        location: `${longitude},${latitude}`,
        extensions: 'all'
      }
    });
    
    const addressComponent = amapRes.data.regeocode.addressComponent;
    
    const location = {
      province: addressComponent.province,
      city: addressComponent.city || addressComponent.province,  // 直辖市处理
      district: addressComponent.district,
      street: addressComponent.township,
      address: amapRes.data.regeocode.formatted_address,
      latitude,
      longitude
    };
    
    // 2. 更新用户地址
    await db.users.update(userId, {
      province: location.province,
      city: location.city,
      district: location.district,
      street: location.street
    });
    
    // 3. 删除缓存
    await redis.del(`user:${userId}`);
    
    res.json({
      code: 200,
      data: location
    });
    
  } catch (error) {
    logger.error('逆地理编码失败', error);
    res.status(500).json({ code: 500, message: '定位失败' });
  }
}

// PUT /api/v1/users/me/location
async function updateUserLocation(req, res) {
  const userId = req.user.id;
  const { province, city, district, street } = req.body;
  
  try {
    await db.users.update(userId, {
      province,
      city,
      district,
      street
    });
    
    // 删除缓存
    await redis.del(`user:${userId}`);
    
    // 重新计算排名
    await rankingQueue.add('update-user-ranking', { userId });
    
    res.json({ code: 200, message: '地址已更新' });
    
  } catch (error) {
    logger.error('更新地址失败', error);
    res.status(500).json({ code: 500, message: '更新失败' });
  }
}
```

**地址数据接口**

```typescript
// 中国行政区划数据（可使用开源数据库）
// https://github.com/modood/Administrative-divisions-of-China

// GET /api/v1/location/provinces
async function getProvinces(req, res) {
  const provinces = await db.query(`
    SELECT DISTINCT province FROM china_regions ORDER BY province
  `);
  res.json({ code: 200, data: provinces });
}

// GET /api/v1/location/cities?province=北京市
async function getCities(req, res) {
  const { province } = req.query;
  const cities = await db.query(`
    SELECT DISTINCT city FROM china_regions WHERE province = $1 ORDER BY city
  `, [province]);
  res.json({ code: 200, data: cities });
}

// GET /api/v1/location/districts?city=北京市
async function getDistricts(req, res) {
  const { city } = req.query;
  const districts = await db.query(`
    SELECT DISTINCT district FROM china_regions WHERE city = $1 ORDER BY district
  `, [city]);
  res.json({ code: 200, data: districts });
}

// GET /api/v1/location/streets?district=朝阳区
async function getStreets(req, res) {
  const { district } = req.query;
  const streets = await db.query(`
    SELECT DISTINCT street FROM china_regions WHERE district = $1 ORDER BY street
  `, [district]);
  res.json({ code: 200, data: streets });
}
```

**数据库表**

```sql
-- 中国行政区划表
CREATE TABLE china_regions (
  id SERIAL PRIMARY KEY,
  province VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  district VARCHAR(50) NOT NULL,
  street VARCHAR(100),
  adcode VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_region_province ON china_regions(province);
CREATE INDEX idx_region_city ON china_regions(city);
CREATE INDEX idx_region_district ON china_regions(district);
```

---

## 五、打卡系统

（此部分内容与之前 PRD 一致，略）

详细内容参考：
- 打卡规则
- 补签机制
- 段位晋升
- 连续打卡奖励

---

## 六、段位与成就

（此部分内容与之前 PRD 一致，略）

详细内容参考：
- 9 段位体系
- 星级计算规则
- 晋升文案

---

## 七、烟瘾记录系统

（此部分内容与之前 PRD 一致，略）

详细内容参考：
- 烟瘾记录规则
- 数据可视化
- 时段分布统计

---

## 八、排行榜系统

（此部分内容已更新，包含地址识别）

详细内容参考前文"地址识别"部分

---

## 九、AI 助手系统

### 9.1 DeepSeek 本地部署

#### 9.1.1 部署方案

**选择 DeepSeek 的理由**
- 开源免费，可本地部署
- 性能接近 GPT-3.5，成本极低
- 支持中文对话，适合国内用户
- 部署简单，支持 Docker

#### 9.1.2 服务器配置

**推荐配置**

| 项目 | 配置 |
|------|------|
| CPU | 8 核及以上 |
| 内存 | 16GB 及以上 |
| 显卡 | NVIDIA GPU（显存 8GB+）可选 |
| 硬盘 | SSD 100GB+ |
| 带宽 | 10Mbps+ |

#### 9.1.3 Docker 部署

**docker-compose.yml**

```yaml
version: '3.8'

services:
  deepseek:
    image: deepseek/deepseek-coder:latest
    container_name: deepseek-ai
    ports:
      - "8000:8000"
    environment:
      - MODEL_NAME=deepseek-chat
      - MAX_TOKENS=2048
      - TEMPERATURE=0.7
    volumes:
      - ./models:/models
      - ./cache:/cache
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    restart: unless-stopped

  # API 服务（封装 DeepSeek）
  ai-api:
    build: ./ai-service
    container_name: zxo-ai-api
    ports:
      - "3001:3001"
    environment:
      - DEEPSEEK_URL=http://deepseek:8000
      - REDIS_URL=redis://redis:6379
    depends_on:
      - deepseek
      - redis
    restart: unless-stopped
```

#### 9.1.4 AI 服务封装

**ai-service/server.js**

```typescript
import express from 'express';
import axios from 'axios';
import Redis from 'ioredis';

const app = express();
const redis = new Redis(process.env.REDIS_URL);

app.use(express.json());

// DeepSeek API 配置
const DEEPSEEK_URL = process.env.DEEPSEEK_URL || 'http://localhost:8000';

// 系统提示词
const SYSTEM_PROMPT = `你是 ZXO 戒烟应用的专业戒烟辅导助手。你的任务是：

1. **提供科学、实用的戒烟建议**
   - 基于医学和心理学知识
   - 针对不同阶段（戒烟初期、困难期、稳定期）给出差异化建议
   
2. **鼓励用户坚持戒烟**
   - 积极正面的语气
   - 强调已取得的进步
   - 给予情感支持

3. **解答戒烟相关疑问**
   - 生理反应（戒断症状）
   - 心理依赖
   - 应对策略
   - 健康恢复进程

4. **分析烟瘾模式**
   - 根据用户的烟瘾记录数据
   - 识别高危时段和触发场景
   - 提供个性化应对方案

**注意事项：**
- 保持专业、友善、耐心的语气
- 避免医疗诊断，建议咨询专业医生
- 关注用户情绪，给予心理支持
- 回答简洁明了，分点呈现
- 适当使用emoji增强亲和力

**回答格式：**
- 先表达理解和鼓励
- 再给出具体建议
- 最后总结要点`;

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  const { message, userId, conversationId, userContext } = req.body;
  
  try {
    // 1. 获取对话历史
    const historyKey = `ai:conversation:${conversationId || userId}`;
    const historyStr = await redis.get(historyKey);
    const history = historyStr ? JSON.parse(historyStr) : [];
    
    // 2. 构建个性化上下文
    let contextPrompt = '';
    if (userContext) {
      contextPrompt = `
用户当前状态：
- 戒烟天数：${userContext.totalDays} 天
- 连续天数：${userContext.consecutiveDays} 天
- 当前段位：${userContext.currentRank}
- 吸烟年限：${userContext.smokingYears}
- 每日吸烟量：${userContext.dailyAmount} 根
- 最近7天烟瘾记录：${userContext.recentCravings || 0} 次

请根据以上信息，给出个性化建议。
`;
    }
    
    // 3. 构建消息列表
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: contextPrompt + message }
    ];
    
    // 4. 调用 DeepSeek API
    const startTime = Date.now();
    
    const response = await axios.post(`${DEEPSEEK_URL}/v1/chat/completions`, {
      model: 'deepseek-chat',
      messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    });
    
    const aiResponse = response.data.choices[0].message.content;
    const tokensUsed = response.data.usage.total_tokens;
    const responseTime = Date.now() - startTime;
    
    // 5. 更新对话历史（保留最近10条）
    history.push(
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    );
    
    const recentHistory = history.slice(-20); // 保留最近 10 轮对话
    await redis.setex(historyKey, 86400, JSON.stringify(recentHistory)); // 24小时过期
    
    // 6. 保存到数据库（异步）
    saveConversation({
      userId,
      conversationId: conversationId || `conv_${Date.now()}_${userId}`,
      userMessage: message,
      aiResponse,
      tokensUsed,
      responseTimeMs: responseTime
    });
    
    res.json({
      code: 200,
      data: {
        response: aiResponse,
        conversationId: conversationId || `conv_${Date.now()}_${userId}`,
        tokensUsed,
        responseTime
      }
    });
    
  } catch (error) {
    console.error('AI 对话失败', error);
    res.status(500).json({ code: 500, message: 'AI 服务暂时不可用' });
  }
});

// 清空对话历史
app.delete('/api/conversation/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  await redis.del(`ai:conversation:${conversationId}`);
  res.json({ code: 200, message: '对话历史已清空' });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3001, () => {
  console.log('AI 服务已启动: http://localhost:3001');
});

// 异步保存对话到数据库
async function saveConversation(data) {
  try {
    // 调用主 API 服务保存
    await axios.post('http://api:3000/internal/ai/conversations', data);
  } catch (error) {
    console.error('保存对话失败', error);
  }
}
```

#### 9.1.5 提示词优化

**场景化提示词**

```typescript
const SCENARIO_PROMPTS = {
  // 烟瘾发作
  craving: `用户现在烟瘾发作，情绪可能焦虑或烦躁。请：
1. 先表达理解和安慰
2. 给出3-5个立即可行的应对方法
3. 鼓励用户坚持，强调这是暂时的
4. 建议记录烟瘾触发因素`,

  // 初次戒烟
  beginner: `用户刚开始戒烟（1-7天），正处于最困难的阶段。请：
1. 祝贺用户迈出第一步
2. 解释前7天的常见戒断症状
3. 提供应对戒断症状的方法
4. 鼓励坚持度过关键期`,

  // 复吸风险
  relapse_risk: `用户可能有复吸风险（情绪低落、压力大等）。请：
1. 同理心理解用户的处境
2. 帮助分析复吸的后果
3. 回顾已取得的成果
4. 提供压力管理建议
5. 鼓励寻求支持`,

  // 长期戒烟
  veteran: `用户已坚持较长时间（90天+），进入稳定期。请：
1. 祝贺用户取得的成就
2. 提醒保持警惕，避免松懈
3. 建议关注长期健康恢复
4. 鼓励分享经验，帮助他人`
};

// 根据用户状态选择提示词
function getContextualPrompt(userContext) {
  const { totalDays, recentCravings, consecutiveDays } = userContext;
  
  if (recentCravings > 3) {
    return SCENARIO_PROMPTS.craving;
  } else if (totalDays <= 7) {
    return SCENARIO_PROMPTS.beginner;
  } else if (consecutiveDays === 0 && totalDays > 7) {
    return SCENARIO_PROMPTS.relapse_risk;
  } else if (totalDays >= 90) {
    return SCENARIO_PROMPTS.veteran;
  }
  
  return '';
}
```

#### 9.1.6 成本控制

**Token 限制策略**

```typescript
// 每日 Token 限额
const DAILY_TOKEN_LIMITS = {
  free: 0,          // 免费用户无AI权限
  vip: 10000,       // VIP 每日 10k tokens（约20次对话）
  ai: 100000        // AI 会员每日 100k tokens（约200次对话）
};

// 检查 Token 限额
async function checkTokenLimit(userId: number, memberType: string): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0];
  const usageKey = `ai:token_usage:${userId}:${today}`;
  
  const currentUsage = await redis.get(usageKey);
  const usage = currentUsage ? parseInt(currentUsage) : 0;
  
  const limit = DAILY_TOKEN_LIMITS[memberType];
  
  if (usage >= limit) {
    return false;
  }
  
  return true;
}

// 记录 Token 使用
async function recordTokenUsage(userId: number, tokens: number) {
  const today = new Date().toISOString().split('T')[0];
  const usageKey = `ai:token_usage:${userId}:${today}`;
  
  await redis.incrby(usageKey, tokens);
  await redis.expire(usageKey, 86400); // 24小时过期
}
```

---

## 十、支付系统

### 10.1 微信支付接入

#### 10.1.1 功能描述

- 支持微信小程序支付
- 支持微信 JSAPI 支付（公众号）
- 商品类型：VIP 会员、AI 会员、补签卡
- 订单管理：创建、查询、退款

#### 10.1.2 商品配置

```typescript
// 商品列表
const PRODUCTS = {
  vip_monthly: {
    id: 'vip_monthly',
    name: 'VIP 会员（月卡）',
    description: '全国排名 + 4天AI体验',
    price: 9.9,
    durationDays: 30,
    memberType: 'vip'
  },
  
  ai_monthly: {
    id: 'ai_monthly',
    name: 'AI 戒烟军师（月卡）',
    description: '全国排名 + AI智能辅导',
    price: 29.9,
    durationDays: 30,
    memberType: 'ai'
  },
  
  ai_yearly: {
    id: 'ai_yearly',
    name: 'AI 戒烟军师（年卡）',
    description: '全国排名 + AI智能辅导',
    price: 199,
    durationDays: 365,
    memberType: 'ai'
  },
  
  makeup_card_1: {
    id: 'makeup_card_1',
    name: '补签卡（1张）',
    description: '可补签过去任意一天',
    price: 0.99,
    cardCount: 1
  },
  
  makeup_card_5: {
    id: 'makeup_card_5',
    name: '补签卡（5张）',
    description: '可补签过去任意5天',
    price: 3.99,
    cardCount: 5
  },
  
  makeup_card_10: {
    id: 'makeup_card_10',
    name: '补签卡（10张）',
    description: '可补签过去任意10天',
    price: 6.99,
    cardCount: 10
  }
};
```

#### 10.1.3 支付流程

```
用户选择商品
  ↓
点击"立即购买"
  ↓
前端调用统一下单接口
  ↓
后端创建订单
  ↓
后端调用微信支付统一下单API
  ↓
后端返回支付参数
  ↓
前端调用微信支付
  ↓
用户完成支付
  ↓
微信回调通知后端
  ↓
后端验证签名
  ↓
后端发放商品（开通会员/赠送补签卡）
  ↓
更新订单状态
  ↓
前端轮询订单状态或接收回调
  ↓
显示支付成功
```

#### 10.1.4 前端实现

**小程序端**

```javascript
// 购买商品
async function buyProduct(productId) {
  try {
    // 1. 创建订单
    const orderRes = await wx.request({
      url: 'https://api.zxo.app/v1/orders/create',
      method: 'POST',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      data: { productId }
    });
    
    const { orderId, paymentParams } = orderRes.data.data;
    
    // 2. 调起微信支付
    const payRes = await wx.requestPayment({
      timeStamp: paymentParams.timeStamp,
      nonceStr: paymentParams.nonceStr,
      package: paymentParams.package,
      signType: 'RSA',
      paySign: paymentParams.paySign
    });
    
    // 3. 支付成功，查询订单状态
    await checkOrderStatus(orderId);
    
    wx.showToast({ title: '购买成功' });
    
  } catch (error) {
    if (error.errMsg === 'requestPayment:fail cancel') {
      wx.showToast({ title: '已取消支付', icon: 'none' });
    } else {
      wx.showToast({ title: '支付失败', icon: 'none' });
    }
  }
}

// 查询订单状态
async function checkOrderStatus(orderId) {
  let retries = 0;
  const maxRetries = 10;
  
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      try {
        const res = await wx.request({
          url: `https://api.zxo.app/v1/orders/${orderId}`,
          header: {
            'Authorization': `Bearer ${wx.getStorageSync('token')}`
          }
        });
        
        const { status } = res.data.data;
        
        if (status === 'paid') {
          clearInterval(timer);
          resolve(true);
        } else if (status === 'failed' || retries >= maxRetries) {
          clearInterval(timer);
          reject(new Error('支付失败'));
        }
        
        retries++;
      } catch (error) {
        clearInterval(timer);
        reject(error);
      }
    }, 2000); // 每2秒查询一次
  });
}
```

**Web 端（JSAPI 支付）**

```typescript
// 调起微信支付
function invokeWechatPay(paymentParams: any) {
  if (typeof WeixinJSBridge === 'undefined') {
    alert('请在微信中打开');
    return;
  }
  
  WeixinJSBridge.invoke('getBrandWCPayRequest', {
    appId: paymentParams.appId,
    timeStamp: paymentParams.timeStamp,
    nonceStr: paymentParams.nonceStr,
    package: paymentParams.package,
    signType: 'RSA',
    paySign: paymentParams.paySign
  }, (res: any) => {
    if (res.err_msg === 'get_brand_wcpay_request:ok') {
      // 支付成功
      checkOrderStatus(paymentParams.orderId);
    } else {
      // 支付失败或取消
      alert('支付失败');
    }
  });
}
```

#### 10.1.5 后端实现

**数据库表**

```sql
-- 订单表
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_no VARCHAR(64) UNIQUE NOT NULL,      -- 订单号
  user_id INT REFERENCES users(id),
  
  -- 商品信息
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  
  -- 支付信息
  payment_method VARCHAR(20) DEFAULT 'wechat', -- 'wechat', 'alipay'
  transaction_id VARCHAR(128),                 -- 微信交易号
  prepay_id VARCHAR(128),                      -- 预支付ID
  
  -- 订单状态
  status VARCHAR(20) DEFAULT 'pending',        -- 'pending', 'paid', 'failed', 'refunded'
  paid_at TIMESTAMP,
  refunded_at TIMESTAMP,
  
  -- 商品发放
  delivered BOOLEAN DEFAULT FALSE,
  delivered_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_no ON orders(order_no);
CREATE INDEX idx_orders_status ON orders(status);
```

**统一下单接口**

```typescript
import crypto from 'crypto';
import axios from 'axios';

const WECHAT_CONFIG = {
  appId: process.env.WECHAT_APP_ID,
  mchId: process.env.WECHAT_MCH_ID,
  apiKey: process.env.WECHAT_API_KEY,
  notifyUrl: 'https://api.zxo.app/v1/payment/wechat/notify'
};

// POST /api/v1/orders/create
async function createOrder(req, res) {
  const userId = req.user.id;
  const { productId } = req.body;
  
  try {
    // 1. 获取商品信息
    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({ code: 400, message: '商品不存在' });
    }
    
    // 2. 创建订单
    const orderNo = generateOrderNo();
    const order = await db.orders.create({
      orderNo,
      userId,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      paymentMethod: 'wechat',
      status: 'pending'
    });
    
    // 3. 调用微信支付统一下单
    const prepayResult = await wechatUnifiedOrder({
      orderNo,
      totalFee: Math.round(product.price * 100), // 转为分
      body: product.name,
      openid: req.user.openid
    });
    
    // 4. 更新订单
    await db.orders.update(order.id, {
      prepayId: prepayResult.prepay_id
    });
    
    // 5. 生成支付参数（前端调起支付用）
    const paymentParams = generatePaymentParams(prepayResult.prepay_id);
    
    res.json({
      code: 200,
      data: {
        orderId: order.id,
        orderNo,
        paymentParams
      }
    });
    
  } catch (error) {
    logger.error('创建订单失败', error);
    res.status(500).json({ code: 500, message: '创建订单失败' });
  }
}

// 微信统一下单
async function wechatUnifiedOrder(params: {
  orderNo: string;
  totalFee: number;
  body: string;
  openid: string;
}) {
  const { orderNo, totalFee, body, openid } = params;
  
  const data = {
    appid: WECHAT_CONFIG.appId,
    mch_id: WECHAT_CONFIG.mchId,
    nonce_str: crypto.randomBytes(16).toString('hex'),
    body,
    out_trade_no: orderNo,
    total_fee: totalFee,
    spbill_create_ip: '127.0.0.1',
    notify_url: WECHAT_CONFIG.notifyUrl,
    trade_type: 'JSAPI',
    openid
  };
  
  // 生成签名
  data.sign = generateWechatSign(data);
  
  // 转换为 XML
  const xml = jsonToXml(data);
  
  // 调用微信 API
  const response = await axios.post(
    'https://api.mch.weixin.qq.com/pay/unifiedorder',
    xml,
    { headers: { 'Content-Type': 'application/xml' } }
  );
  
  const result = xmlToJson(response.data);
  
  if (result.return_code !== 'SUCCESS' || result.result_code !== 'SUCCESS') {
    throw new Error('微信下单失败');
  }
  
  return result;
}

// 生成支付参数
function generatePaymentParams(prepayId: string) {
  const params = {
    appId: WECHAT_CONFIG.appId,
    timeStamp: Math.floor(Date.now() / 1000).toString(),
    nonceStr: crypto.randomBytes(16).toString('hex'),
    package: `prepay_id=${prepayId}`,
    signType: 'RSA'
  };
  
  params.paySign = generateWechatSign(params);
  
  return params;
}

// 生成微信签名
function generateWechatSign(data: any): string {
  const keys = Object.keys(data).sort();
  const stringA = keys
    .filter(key => data[key] && key !== 'sign')
    .map(key => `${key}=${data[key]}`)
    .join('&');
  
  const stringSignTemp = `${stringA}&key=${WECHAT_CONFIG.apiKey}`;
  
  return crypto.createHash('md5').update(stringSignTemp).digest('hex').toUpperCase();
}

// 生成订单号
function generateOrderNo(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ZXO${timestamp}${random}`;
}
```

**支付回调处理**

```typescript
// POST /api/v1/payment/wechat/notify
async function wechatPaymentNotify(req, res) {
  try {
    // 1. 解析 XML
    const data = xmlToJson(req.body);
    
    // 2. 验证签名
    const sign = data.sign;
    delete data.sign;
    const calculatedSign = generateWechatSign(data);
    
    if (sign !== calculatedSign) {
      logger.error('签名验证失败');
      return res.send(jsonToXml({
        return_code: 'FAIL',
        return_msg: '签名验证失败'
      }));
    }
    
    // 3. 检查支付结果
    if (data.return_code !== 'SUCCESS' || data.result_code !== 'SUCCESS') {
      logger.error('支付失败', data);
      return res.send(jsonToXml({
        return_code: 'FAIL',
        return_msg: '支付失败'
      }));
    }
    
    const orderNo = data.out_trade_no;
    const transactionId = data.transaction_id;
    
    // 4. 查询订单
    const order = await db.orders.findOne({ where: { orderNo } });
    
    if (!order) {
      logger.error('订单不存在', orderNo);
      return res.send(jsonToXml({
        return_code: 'FAIL',
        return_msg: '订单不存在'
      }));
    }
    
    // 5. 检查订单状态（防止重复回调）
    if (order.status === 'paid') {
      return res.send(jsonToXml({
        return_code: 'SUCCESS',
        return_msg: 'OK'
      }));
    }
    
    // 6. 更新订单状态
    await db.orders.update(order.id, {
      status: 'paid',
      transactionId,
      paidAt: new Date()
    });
    
    // 7. 发放商品（异步）
    await deliverProduct(order);
    
    // 8. 返回成功
    res.send(jsonToXml({
      return_code: 'SUCCESS',
      return_msg: 'OK'
    }));
    
  } catch (error) {
    logger.error('支付回调处理失败', error);
    res.send(jsonToXml({
      return_code: 'FAIL',
      return_msg: '处理失败'
    }));
  }
}

// 发放商品
async function deliverProduct(order: Order) {
  const product = PRODUCTS[order.productId];
  
  try {
    if (product.memberType) {
      // 开通会员
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + product.durationDays);
      
      await db.users.update(order.userId, {
        memberType: product.memberType,
        memberExpiryAt: expiryDate,
        ...(product.memberType === 'vip' ? { vipActivatedAt: new Date() } : {}),
        ...(product.memberType === 'ai' ? { aiActivatedAt: new Date() } : {})
      });
      
    } else if (product.cardCount) {
      // 赠送补签卡
      const user = await db.users.findById(order.userId);
      await db.users.update(order.userId, {
        makeupCards: user.makeupCards + product.cardCount
      });
    }
    
    // 更新订单
    await db.orders.update(order.id, {
      delivered: true,
      deliveredAt: new Date()
    });
    
    // 删除用户缓存
    await redis.del(`user:${order.userId}`);
    
    logger.info('商品发放成功', { orderId: order.id, userId: order.userId });
    
  } catch (error) {
    logger.error('商品发放失败', error);
    // 可以重试或人工处理
  }
}
```

#### 10.1.6 订单查询

```typescript
// GET /api/v1/orders/:orderId
async function getOrder(req, res) {
  const userId = req.user.id;
  const { orderId } = req.params;
  
  try {
    const order = await db.orders.findOne({
      where: { id: orderId, userId }
    });
    
    if (!order) {
      return res.status(404).json({ code: 404, message: '订单不存在' });
    }
    
    res.json({
      code: 200,
      data: {
        id: order.id,
        orderNo: order.orderNo,
        productName: order.productName,
        productPrice: order.productPrice,
        status: order.status,
        paidAt: order.paidAt,
        delivered: order.delivered
      }
    });
    
  } catch (error) {
    logger.error('查询订单失败', error);
    res.status(500).json({ code: 500, message: '查询失败' });
  }
}

// GET /api/v1/orders
async function getUserOrders(req, res) {
  const userId = req.user.id;
  const { page = 1, limit = 20 } = req.query;
  
  try {
    const orders = await db.orders.findAll({
      where: { userId },
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit
    });
    
    res.json({
      code: 200,
      data: { orders }
    });
    
  } catch (error) {
    logger.error('查询订单列表失败', error);
    res.status(500).json({ code: 500, message: '查询失败' });
  }
}
```

---

## 十一、数据报告

（此部分内容与之前 PRD 一致，略）

---

## 十二、分享系统

（此部分内容与之前 PRD 一致，略）

---

## 十三、技术架构

### 13.1 前端技术栈

| 技术 | 用途 |
|------|------|
| React | UI 框架 |
| TypeScript | 类型安全 |
| Tailwind CSS v4.0 | 样式框架 |
| Motion (Framer Motion) | 动画库 |
| Recharts | 图表库 |
| Lucide React | 图标库 |
| Sonner | Toast 通知 |

### 13.2 后端技术栈

| 技术 | 用途 |
|------|------|
| Node.js + Express/NestJS | 后端框架 |
| TypeScript | 类型安全 |
| PostgreSQL | 主数据库 |
| Redis | 缓存 + 排行榜 |
| Bull | 消息队列 |
| JWT | 身份认证 |
| OSS (S3/阿里云) | 对象存储 |
| Docker | 容器化部署 |

### 13.3 AI 服务

| 技术 | 用途 |
|------|------|
| DeepSeek | 本地部署 AI 模型 |
| Docker | AI 服务容器化 |
| NVIDIA GPU | 加速推理（可选） |

### 13.4 微信生态

| 技术 | 用途 |
|------|------|
| 微信小程序 SDK | 小程序开发 |
| 微信支付 API | 支付功能 |
| 微信登录 API | 用户认证 |
| 高德地图 API | 地址识别 |

---

## 十四、数据库设计

（完整表结构请参考《后端技术文档》第三章）

核心表：
1. users - 用户表
2. user_settings - 用户设置表
3. check_in_records - 打卡记录表
4. craving_records - 烟瘾记录表
5. redeem_codes - 兑换码表
6. orders - 订单表
7. rankings - 排行榜缓存表
8. ai_conversations - AI 对话记录表

---

## 十五、API 接口设计

（完整接口列表请参考《后端技术文档》第四章）

核心接口：
- 认证模块：微信登录、Token 刷新
- 用户模块：获取/更新用户信息、上传头像、地址识别
- 打卡模块：打卡、补签、查询记录
- 烟瘾模块：记录烟瘾、查询统计
- 排行榜模块：获取排名、我的排名
- 支付模块：创建订单、支付回调、查询订单
- AI 模块：对话、清空历史

---

## 十六、部署方案

### 16.1 开发环境

```bash
# 前端
cd frontend
npm install
npm run dev

# 后端
cd backend
npm install
npm run dev

# AI 服务
cd ai-service
docker-compose up -d

# 数据库
docker run -d -p 5432:5432 \
  -e POSTGRES_DB=zxo \
  -e POSTGRES_USER=zxo \
  -e POSTGRES_PASSWORD=password \
  postgres:15-alpine

# Redis
docker run -d -p 6379:6379 redis:7-alpine
```

### 16.2 生产环境

**服务器配置**

| 服务 | 配置 | 数量 |
|------|------|------|
| API Server | 4C8G | 2 台 |
| PostgreSQL | 4C8G | 1 主 + 1 从 |
| Redis | 2C4G | 3 台（哨兵） |
| AI Server | 8C16G + GPU | 1 台 |
| Nginx | 2C2G | 1 台 |

**Docker Compose（完整）**

```yaml
version: '3.8'

services:
  # API 服务
  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - AI_SERVICE_URL=http://ai-service:3001
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  # AI 服务
  ai-service:
    build: ./ai-service
    ports:
      - "3001:3001"
    environment:
      - DEEPSEEK_URL=http://deepseek:8000
      - REDIS_HOST=redis
    depends_on:
      - deepseek
      - redis
    restart: unless-stopped

  # DeepSeek
  deepseek:
    image: deepseek/deepseek-coder:latest
    ports:
      - "8000:8000"
    volumes:
      - ./models:/models
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    restart: unless-stopped

  # PostgreSQL
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=zxo
      - POSTGRES_USER=zxo
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  # Redis
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - ./frontend/dist:/usr/share/nginx/html
    depends_on:
      - api
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

---

## 附录

### A. 开发优先级

**P0（核心功能，必须完成）**
- [ ] 微信小程序登录
- [ ] 打卡系统（含补签）
- [ ] 段位计算
- [ ] 微信支付接入
- [ ] 数据库初始化
- [ ] API 接口开发

**P1（重要功能，尽快完成）**
- [ ] 修改头像昵称
- [ ] 地址识别
- [ ] DeepSeek 部署
- [ ] 排行榜系统
- [ ] 烟瘾记录
- [ ] 分享海报

**P2（增强功能，后续优化）**
- [ ] AI 提示词优化
- [ ] 健康报告
- [ ] 缓存系统优化
- [ ] 性能监控

**P3（可选功能，长期规划）**
- [ ] 社交功能
- [ ] 成就系统
- [ ] 个性化推荐

### B. 环境变量配置

```bash
# .env.production

# 应用配置
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.zxo.app

# 数据库
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=zxo
DB_USER=zxo
DB_PASSWORD=your_password

# Redis
REDIS_HOST=your_redis_host
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# 微信小程序
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret

# 微信支付
WECHAT_MCH_ID=your_mch_id
WECHAT_API_KEY=your_api_key
WECHAT_CERT_PATH=/path/to/cert.pem
WECHAT_KEY_PATH=/path/to/key.pem

# 高德地图
AMAP_API_KEY=your_amap_key

# DeepSeek
DEEPSEEK_URL=http://localhost:8000
AI_SERVICE_URL=http://localhost:3001

# OSS
OSS_REGION=cn-beijing
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_secret_key
OSS_BUCKET=zxo-app
CDN_BASE_URL=https://cdn.zxo.app

# 短信服务（可选）
SMS_PROVIDER=aliyun
SMS_ACCESS_KEY=your_sms_key
SMS_SECRET_KEY=your_sms_secret

# 监控
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### C. 上线检查清单

**上线前**
- [ ] 数据库备份
- [ ] 环境变量检查
- [ ] SSL 证书配置
- [ ] 微信支付测试
- [ ] AI 服务测试
- [ ] 性能测试
- [ ] 安全审计

**上线后**
- [ ] 监控告警配置
- [ ] 日志收集
- [ ] 数据备份计划
- [ ] 应急预案

---

**文档结束**

---

## 更新日志

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| v1.0 | 2025-11-15 | 初版创建 |
| v2.0 | 2025-12-01 | 切换浅色主题，优化权限体系 |
| v3.0 | 2025-12-01 | 新增微信登录、支付系统、DeepSeek部署、地址识别等完整功能 |
