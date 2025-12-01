# ZXO 戒烟打卡应用 - 后端技术文档

**版本号：** v2.0  
**最后更新：** 2025年12月1日  
**文档类型：** 后端架构与 API 设计文档  

---

## 目录

1. [系统架构](#一系统架构)
2. [技术栈选型](#二技术栈选型)
3. [数据库设计](#三数据库设计)
4. [API 接口设计](#四api-接口设计)
5. [核心业务逻辑](#五核心业务逻辑)
6. [权限与安全](#六权限与安全)
7. [排行榜系统](#七排行榜系统)
8. [兑换码系统](#八兑换码系统)
9. [AI 助手集成](#九ai-助手集成)
10. [缓存策略](#十缓存策略)
11. [性能优化](#十一性能优化)
12. [部署方案](#十二部署方案)
13. [监控与运维](#十三监控与运维)
14. [数据安全与合规](#十四数据安全与合规)

---

## 一、系统架构

### 1.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                         客户端层                              │
│          Web App / 小程序 / H5                                │
└─────────────────────────────────────────────────────────────┘
                              ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                         CDN / 网关层                          │
│          Nginx / CloudFlare                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         应用层                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  API Server │  │ WebSocket   │  │ Task Queue  │          │
│  │  (Node.js)  │  │  Server     │  │  (Bull)     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         服务层                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Auth Service│  │ Rank Service│  │  AI Service │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │Stats Service│  │Code Service │  │ Notification│          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         数据层                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  PostgreSQL │  │    Redis    │  │     OSS     │          │
│  │  (主数据库)  │  │   (缓存)    │  │  (对象存储) │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         第三方服务                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  OpenAI API │  │  短信服务   │  │  CDN 服务   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 架构特点

**微服务化**
- 按业务功能拆分服务模块
- 服务间通过 HTTP/gRPC 通信
- 独立部署、独立扩展

**高可用**
- 应用层多实例部署（负载均衡）
- 数据库主从复制 + 读写分离
- Redis 哨兵模式 / 集群模式

**可扩展**
- 水平扩展：增加服务器实例
- 垂直扩展：升级服务器配置
- 异步任务队列处理耗时操作

---

## 二、技术栈选型

### 2.1 后端框架

**Node.js + Express / NestJS**

**选择理由**
- 与前端技术栈统一（TypeScript）
- 异步非阻塞，高并发性能好
- 生态丰富，开发效率高
- NestJS 提供完整的企业级架构支持

**替代方案**
- Go + Gin：更高性能，适合高并发场景
- Python + FastAPI：适合 AI 相关服务
- Java + Spring Boot：传统企业级方案

### 2.2 数据库

**主数据库：PostgreSQL**

**选择理由**
- 开源免费，性能优秀
- 支持 JSONB 类型，灵活存储复杂数据
- 支持全文搜索、地理位置等高级功能
- 事务支持完善，数据一致性强

**替代方案**
- MySQL：更流行，但 JSON 支持较弱
- MongoDB：NoSQL，适合非结构化数据

**缓存数据库：Redis**

**用途**
- 会话存储（Session / JWT 黑名单）
- 排行榜缓存（Sorted Set）
- 接口限流（Token Bucket）
- 热点数据缓存

### 2.3 消息队列

**Bull (Redis-based Queue)**

**用途**
- 异步任务处理（排行榜计算、数据统计）
- 定时任务（权限到期检查、排名更新）
- 削峰填谷（高并发打卡请求）

### 2.4 对象存储

**阿里云 OSS / AWS S3 / MinIO**

**用途**
- 用户头像存储
- 分享海报图片存储
- 数据报告导出文件存储

### 2.5 AI 服务

**OpenAI API / 文心一言 / 通义千问**

**用途**
- AI 助手对话功能
- 智能戒烟建议生成
- 烟瘾模式分析

---

## 三、数据库设计

### 3.1 表结构设计

#### 3.1.1 用户表（users）

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  openid VARCHAR(128) UNIQUE,                    -- 微信 openid / 用户唯一标识
  nickname VARCHAR(100) DEFAULT '戒烟勇士',      -- 昵称
  avatar VARCHAR(500),                            -- 头像 URL
  phone VARCHAR(20) UNIQUE,                       -- 手机号（可选）
  
  -- 会员信息
  member_type VARCHAR(20) DEFAULT 'free',         -- 'free', 'vip', 'ai'
  member_expiry_at TIMESTAMP,                     -- 会员到期时间
  vip_activated_at TIMESTAMP,                     -- VIP 激活时间
  ai_activated_at TIMESTAMP,                      -- AI 权限激活时间
  
  -- 打卡统计
  total_days INT DEFAULT 0,                       -- 戒烟总天数
  consecutive_days INT DEFAULT 0,                 -- 连续天数
  makeup_cards INT DEFAULT 3,                     -- 补签卡数量
  last_check_in_date DATE,                        -- 最后打卡日期
  
  -- 地理位置（用于排行榜）
  province VARCHAR(50),                           -- 省份
  city VARCHAR(50),                               -- 城市
  district VARCHAR(50),                           -- 区/县
  street VARCHAR(100),                            -- 街道
  
  -- 协议与隐私
  has_agreed_terms BOOLEAN DEFAULT FALSE,         -- 是否同意协议
  agreed_terms_at TIMESTAMP,                      -- 同意协议时间
  
  -- 时间戳
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP                            -- 软删除
);

-- 索引
CREATE INDEX idx_users_openid ON users(openid);
CREATE INDEX idx_users_member_type ON users(member_type);
CREATE INDEX idx_users_total_days ON users(total_days DESC);
CREATE INDEX idx_users_city ON users(city, district, street);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### 3.1.2 用户设置表（user_settings）

```sql
CREATE TABLE user_settings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  
  -- 吸烟数据
  smoking_years VARCHAR(20),                      -- '1年以下', '1-3年', '3-5年', '5-10年', '10年以上'
  daily_amount INT DEFAULT 20,                    -- 每日吸烟量（根）
  price_per_pack DECIMAL(10, 2) DEFAULT 20.00,   -- 每包价格（元）
  cigarettes_per_pack INT DEFAULT 20,             -- 每包根数
  
  -- 通知设置
  enable_check_in_reminder BOOLEAN DEFAULT TRUE,  -- 打卡提醒
  check_in_reminder_time TIME DEFAULT '09:00',    -- 提醒时间
  enable_milestone_notification BOOLEAN DEFAULT TRUE, -- 里程碑通知
  
  -- 隐私设置
  show_in_ranking BOOLEAN DEFAULT TRUE,           -- 是否显示在排行榜
  allow_friend_view BOOLEAN DEFAULT TRUE,         -- 是否允许好友查看
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
```

#### 3.1.3 打卡记录表（check_in_records）

```sql
CREATE TABLE check_in_records (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  check_in_date DATE NOT NULL,                    -- 打卡日期
  is_makeup BOOLEAN DEFAULT FALSE,                -- 是否补签
  
  -- 打卡时的段位信息（快照）
  rank_at_check_in VARCHAR(50),                   -- 打卡时的段位
  stars_at_check_in INT,                          -- 打卡时的星级
  
  -- 地理位置（可选）
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6),
  location_name VARCHAR(200),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE UNIQUE INDEX idx_check_in_user_date ON check_in_records(user_id, check_in_date);
CREATE INDEX idx_check_in_date ON check_in_records(check_in_date);
CREATE INDEX idx_check_in_is_makeup ON check_in_records(is_makeup);
```

#### 3.1.4 烟瘾记录表（craving_records）

```sql
CREATE TABLE craving_records (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  
  recorded_at TIMESTAMP NOT NULL,                 -- 记录时间
  recorded_date DATE NOT NULL,                    -- 记录日期
  recorded_hour INT NOT NULL,                     -- 记录小时（0-23）
  
  -- 烟瘾强度（可选，未来扩展）
  intensity INT,                                  -- 1-5 级
  
  -- 触发场景（可选，未来扩展）
  trigger_type VARCHAR(50),                       -- 'stress', 'social', 'habit', 'other'
  trigger_note TEXT,                              -- 备注
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_craving_user_id ON craving_records(user_id);
CREATE INDEX idx_craving_recorded_date ON craving_records(recorded_date);
CREATE INDEX idx_craving_recorded_hour ON craving_records(recorded_hour);
```

#### 3.1.5 兑换码表（redeem_codes）

```sql
CREATE TABLE redeem_codes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,               -- 兑换码
  code_type VARCHAR(20) NOT NULL,                 -- 'vip', 'ai', 'makeup_card'
  
  -- 权益内容
  duration_days INT,                              -- 权益天数（VIP/AI）
  makeup_card_count INT,                          -- 补签卡数量
  
  -- 使用限制
  max_uses INT DEFAULT 1,                         -- 最大使用次数（-1 表示无限制）
  current_uses INT DEFAULT 0,                     -- 当前使用次数
  
  -- 有效期
  valid_from TIMESTAMP,                           -- 生效时间
  valid_until TIMESTAMP,                          -- 失效时间
  
  -- 状态
  is_active BOOLEAN DEFAULT TRUE,                 -- 是否启用
  
  -- 创建者信息
  created_by INT REFERENCES users(id),            -- 创建者（管理员）
  batch_id VARCHAR(50),                           -- 批次 ID（批量生成时使用）
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_redeem_code ON redeem_codes(code);
CREATE INDEX idx_redeem_code_type ON redeem_codes(code_type);
CREATE INDEX idx_redeem_batch_id ON redeem_codes(batch_id);
```

#### 3.1.6 兑换码使用记录表（redeem_code_usages）

```sql
CREATE TABLE redeem_code_usages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  redeem_code_id INT REFERENCES redeem_codes(id),
  code VARCHAR(50) NOT NULL,                      -- 冗余存储，方便查询
  
  -- 兑换前后状态
  member_type_before VARCHAR(20),                 -- 兑换前会员类型
  member_type_after VARCHAR(20),                  -- 兑换后会员类型
  expiry_before TIMESTAMP,                        -- 兑换前到期时间
  expiry_after TIMESTAMP,                         -- 兑换后到期时间
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_redeem_usage_user_id ON redeem_code_usages(user_id);
CREATE INDEX idx_redeem_usage_code ON redeem_code_usages(code);
```

#### 3.1.7 排行榜缓存表（rankings）

```sql
CREATE TABLE rankings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  
  -- 排名类型
  ranking_type VARCHAR(50) NOT NULL,              -- 'national', 'province', 'city', 'district', 'street'
  region_code VARCHAR(100),                       -- 地区代码（如 'beijing-chaoyang'）
  
  -- 排名数据
  rank_position INT NOT NULL,                     -- 排名位置
  total_days INT NOT NULL,                        -- 戒烟天数
  
  -- 排名快照时间
  snapshot_date DATE NOT NULL,                    -- 快照日期
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE UNIQUE INDEX idx_ranking_unique ON rankings(ranking_type, region_code, user_id, snapshot_date);
CREATE INDEX idx_ranking_type_region ON rankings(ranking_type, region_code);
CREATE INDEX idx_ranking_snapshot_date ON rankings(snapshot_date);
```

#### 3.1.8 AI 对话记录表（ai_conversations）

```sql
CREATE TABLE ai_conversations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  
  -- 对话内容
  user_message TEXT NOT NULL,                     -- 用户消息
  ai_response TEXT NOT NULL,                      -- AI 回复
  
  -- 上下文
  conversation_id VARCHAR(100),                   -- 对话 ID（用于关联上下文）
  message_index INT,                              -- 消息序号
  
  -- 统计信息
  tokens_used INT,                                -- 消耗 token 数
  response_time_ms INT,                           -- 响应时间（毫秒）
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_ai_conv_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conv_conversation_id ON ai_conversations(conversation_id);
CREATE INDEX idx_ai_conv_created_at ON ai_conversations(created_at);
```

#### 3.1.9 数据统计表（statistics）

```sql
CREATE TABLE statistics (
  id SERIAL PRIMARY KEY,
  
  -- 统计维度
  stat_type VARCHAR(50) NOT NULL,                 -- 'daily_active_users', 'check_ins', 'new_users', etc.
  stat_date DATE NOT NULL,                        -- 统计日期
  
  -- 统计数据（JSONB 灵活存储）
  stat_data JSONB NOT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE UNIQUE INDEX idx_stat_type_date ON statistics(stat_type, stat_date);
CREATE INDEX idx_stat_date ON statistics(stat_date);
```

### 3.2 数据库性能优化

**索引策略**
- 主键自动创建聚簇索引
- 频繁查询字段创建普通索引
- 组合查询创建复合索引
- 避免过度索引（影响写入性能）

**分区策略**
- 打卡记录表按月分区（提高查询效率）
- 烟瘾记录表按月分区
- AI 对话记录表按月分区

**读写分离**
- 主库负责写操作
- 从库负责读操作
- 使用连接池管理数据库连接

---

## 四、API 接口设计

### 4.1 接口规范

**基础 URL**
```
生产环境: https://api.zxo.app/v1
测试环境: https://api-test.zxo.app/v1
开发环境: http://localhost:3000/v1
```

**请求格式**
- Content-Type: application/json
- 字符编码: UTF-8
- 请求方法: GET, POST, PUT, DELETE

**响应格式**

成功响应：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 业务数据
  },
  "timestamp": 1701432000000
}
```

错误响应：
```json
{
  "code": 400,
  "message": "参数错误",
  "error": "daily_amount must be greater than 0",
  "timestamp": 1701432000000
}
```

**HTTP 状态码**

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（未登录） |
| 403 | 禁止访问（无权限） |
| 404 | 资源不存在 |
| 409 | 资源冲突（如重复打卡） |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

### 4.2 认证授权

**JWT Token 认证**

请求头：
```
Authorization: Bearer <JWT_TOKEN>
```

Token 结构：
```json
{
  "userId": 12345,
  "openid": "wx_xxxxxx",
  "memberType": "vip",
  "iat": 1701432000,
  "exp": 1701518400
}
```

**微信小程序登录流程**

```
客户端获取 wx.code
  ↓
POST /auth/wechat/login
  ↓
后端调用微信 API 获取 openid
  ↓
检查用户是否存在
  ├── 存在 → 返回用户信息 + JWT Token
  └── 不存在 → 创建新用户 → 返回用户信息 + JWT Token
```

### 4.3 接口列表

#### 4.3.1 认证模块

**1. 微信登录**

```
POST /auth/wechat/login
```

请求参数：
```json
{
  "code": "wx_login_code",
  "nickname": "张三",
  "avatar": "https://xxx.com/avatar.jpg"
}
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 12345,
      "nickname": "张三",
      "avatar": "https://xxx.com/avatar.jpg",
      "memberType": "free",
      "totalDays": 15,
      "consecutiveDays": 5
    }
  }
}
```

**2. Token 刷新**

```
POST /auth/refresh
```

请求头：
```
Authorization: Bearer <OLD_TOKEN>
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "token": "new_jwt_token"
  }
}
```

**3. 退出登录**

```
POST /auth/logout
```

请求头：
```
Authorization: Bearer <JWT_TOKEN>
```

响应数据：
```json
{
  "code": 200,
  "message": "退出成功"
}
```

#### 4.3.2 用户模块

**1. 获取用户信息**

```
GET /users/me
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "id": 12345,
    "nickname": "张三",
    "avatar": "https://xxx.com/avatar.jpg",
    "memberType": "vip",
    "memberExpiryAt": "2025-12-05T00:00:00Z",
    "totalDays": 15,
    "consecutiveDays": 5,
    "makeupCards": 3,
    "province": "北京市",
    "city": "北京市",
    "district": "朝阳区",
    "street": "三里屯街道"
  }
}
```

**2. 更新用户信息**

```
PUT /users/me
```

请求参数：
```json
{
  "nickname": "新昵称",
  "avatar": "https://xxx.com/new_avatar.jpg"
}
```

**3. 获取用户设置**

```
GET /users/me/settings
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "smokingYears": "3-5年",
    "dailyAmount": 20,
    "pricePerPack": 20.00,
    "cigarettesPerPack": 20,
    "enableCheckInReminder": true,
    "checkInReminderTime": "09:00",
    "showInRanking": true
  }
}
```

**4. 更新用户设置**

```
PUT /users/me/settings
```

请求参数：
```json
{
  "smokingYears": "5-10年",
  "dailyAmount": 25,
  "pricePerPack": 25.00,
  "cigarettesPerPack": 20
}
```

**5. 获取用户统计数据**

```
GET /users/me/stats
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "totalDays": 15,
    "consecutiveDays": 5,
    "cigarettesAvoided": 300,
    "moneySaved": 300.00,
    "equivalentItem": {
      "name": "电影票",
      "count": 6,
      "unit": "张"
    },
    "extraLife": {
      "days": 0,
      "hours": 55
    },
    "currentRank": {
      "rank": "倔强青铜",
      "stars": 15,
      "daysToNextRank": 8,
      "nextRank": "秩序白银"
    },
    "last7DaysCheckIn": [true, true, false, true, true, true, true]
  }
}
```

#### 4.3.3 打卡模块

**1. 今日打卡**

```
POST /check-in
```

请求参数：
```json
{
  "latitude": 39.9042,
  "longitude": 116.4074,
  "locationName": "北京市朝阳区三里屯"
}
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "checkInDate": "2025-12-01",
    "totalDays": 16,
    "consecutiveDays": 6,
    "currentRank": {
      "rank": "倔强青铜",
      "stars": 16
    },
    "isRankUp": false,
    "makeupCards": 3
  }
}
```

**2. 补签**

```
POST /check-in/makeup
```

请求参数：
```json
{
  "checkInDate": "2025-11-28"
}
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "checkInDate": "2025-11-28",
    "totalDays": 17,
    "consecutiveDays": 7,
    "makeupCards": 2,
    "isRankUp": false
  }
}
```

**3. 获取打卡记录**

```
GET /check-in/records?year=2025&month=12
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "year": 2025,
    "month": 12,
    "records": [
      {
        "date": "2025-12-01",
        "isMakeup": false,
        "rank": "倔强青铜",
        "stars": 15
      },
      {
        "date": "2025-11-28",
        "isMakeup": true,
        "rank": "倔强青铜",
        "stars": 12
      }
    ]
  }
}
```

**4. 检查今日是否已打卡**

```
GET /check-in/today
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "hasCheckedIn": true,
    "checkInDate": "2025-12-01",
    "isMakeup": false
  }
}
```

#### 4.3.4 烟瘾记录模块

**1. 记录烟瘾**

```
POST /cravings
```

请求参数：
```json
{
  "intensity": 3,
  "triggerType": "stress",
  "triggerNote": "工作压力大"
}
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "id": 12345,
    "recordedAt": "2025-12-01T10:30:00Z",
    "recordedHour": 10
  }
}
```

**2. 获取烟瘾记录**

```
GET /cravings?startDate=2025-11-25&endDate=2025-12-01
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "records": [
      {
        "id": 12345,
        "recordedAt": "2025-12-01T10:30:00Z",
        "recordedDate": "2025-12-01",
        "recordedHour": 10,
        "intensity": 3
      }
    ],
    "summary": {
      "totalCount": 15,
      "avgIntensity": 2.8,
      "peakHours": [10, 14, 20]
    }
  }
}
```

**3. 获取烟瘾统计**

```
GET /cravings/stats?days=7
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "dailyStats": [
      {
        "date": "2025-12-01",
        "count": 3,
        "avgIntensity": 2.7
      },
      {
        "date": "2025-11-30",
        "count": 2,
        "avgIntensity": 3.0
      }
    ],
    "hourlyDistribution": {
      "0": 0, "1": 0, "2": 0, "3": 0,
      "4": 0, "5": 0, "6": 0, "7": 1,
      "8": 2, "9": 3, "10": 5, "11": 3,
      "12": 2, "13": 1, "14": 4, "15": 2,
      "16": 3, "17": 2, "18": 1, "19": 1,
      "20": 3, "21": 2, "22": 1, "23": 0
    }
  }
}
```

#### 4.3.5 排行榜模块

**1. 获取排行榜**

```
GET /rankings?type=national&limit=100
```

请求参数：
- type: 排名类型（national, province, city, district, street）
- limit: 返回数量（默认 100）

响应数据：
```json
{
  "code": 200,
  "data": {
    "rankings": [
      {
        "rank": 1,
        "userId": 12345,
        "nickname": "戒烟达人",
        "avatar": "https://xxx.com/avatar.jpg",
        "totalDays": 365,
        "currentRank": "最强王者",
        "stars": 95
      }
    ],
    "myRanking": {
      "rank": 156,
      "totalDays": 15,
      "percentile": 78.5
    }
  }
}
```

**2. 获取我的排名**

```
GET /rankings/me?type=national
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "national": {
      "rank": 156,
      "totalUsers": 10000,
      "percentile": 98.44
    },
    "city": {
      "rank": 5,
      "totalUsers": 500,
      "percentile": 99.0
    },
    "district": {
      "rank": 2,
      "totalUsers": 100,
      "percentile": 98.0
    }
  }
}
```

#### 4.3.6 兑换码模块

**1. 兑换码兑换**

```
POST /redeem-codes/redeem
```

请求参数：
```json
{
  "code": "VIP2025"
}
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "codeType": "vip",
    "memberTypeBefore": "free",
    "memberTypeAfter": "vip",
    "expiryBefore": null,
    "expiryAfter": "2025-12-05T00:00:00Z",
    "durationDays": 4
  }
}
```

**2. 获取兑换历史**

```
GET /redeem-codes/history
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "usages": [
      {
        "code": "VIP2025",
        "codeType": "vip",
        "usedAt": "2025-12-01T10:00:00Z"
      }
    ]
  }
}
```

#### 4.3.7 AI 助手模块

**1. 发送消息**

```
POST /ai/chat
```

请求参数：
```json
{
  "message": "我感到很想抽烟怎么办？",
  "conversationId": "conv_12345"
}
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "response": "理解您现在的感受。当烟瘾来临时，可以尝试以下方法：1. 深呼吸5次...",
    "conversationId": "conv_12345",
    "messageIndex": 3
  }
}
```

**2. 获取对话历史**

```
GET /ai/conversations?conversationId=conv_12345
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "conversationId": "conv_12345",
    "messages": [
      {
        "role": "user",
        "content": "我感到很想抽烟怎么办？",
        "timestamp": "2025-12-01T10:00:00Z"
      },
      {
        "role": "assistant",
        "content": "理解您现在的感受...",
        "timestamp": "2025-12-01T10:00:05Z"
      }
    ]
  }
}
```

#### 4.3.8 数据报告模块

**1. 获取健康报告**

```
GET /reports/health
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "milestones": [
      {
        "title": "心率和血压下降至正常水平",
        "duration": "20 分钟",
        "achieved": true,
        "achievedAt": "2025-11-15T00:20:00Z"
      },
      {
        "title": "血液中一氧化碳浓度恢复正常",
        "duration": "12 小时",
        "achieved": true,
        "achievedAt": "2025-11-15T12:00:00Z"
      },
      {
        "title": "肺功能开始改善",
        "duration": "2 周-3 个月",
        "achieved": false,
        "daysRemaining": 5
      }
    ]
  }
}
```

**2. 导出数据报告**

```
POST /reports/export
```

请求参数：
```json
{
  "format": "pdf",
  "startDate": "2025-11-01",
  "endDate": "2025-12-01"
}
```

响应数据：
```json
{
  "code": 200,
  "data": {
    "fileUrl": "https://oss.zxo.app/reports/user_12345_2025-12.pdf",
    "expiresAt": "2025-12-08T00:00:00Z"
  }
}
```

---

## 五、核心业务逻辑

### 5.1 打卡逻辑

**打卡规则**
1. 每天只能打卡一次
2. 只能打卡当天日期
3. 打卡成功后累计天数 +1
4. 检查是否连续打卡，更新连续天数
5. 检查是否晋升段位
6. 检查是否达到连续打卡奖励（每 7 天奖励 1 张补签卡）

**流程图**

```
接收打卡请求
  ↓
验证用户身份（JWT）
  ↓
检查今日是否已打卡
  ├── 已打卡 → 返回错误 409
  └── 未打卡 ↓
  ↓
创建打卡记录（check_in_records）
  ↓
更新用户统计（users）
  ├── total_days + 1
  ├── 检查连续性，更新 consecutive_days
  └── last_check_in_date = today
  ↓
检查段位晋升
  ├── 晋升 → 记录晋升事件
  └── 未晋升 ↓
  ↓
检查连续打卡奖励
  ├── consecutive_days % 7 == 0 → makeup_cards + 1
  └── 其他 ↓
  ↓
异步更新排行榜（加入消息队列）
  ↓
返回打卡结果
```

**代码示例（伪代码）**

```typescript
async function checkIn(userId: number, date: string): Promise<CheckInResult> {
  // 1. 检查今日是否已打卡
  const existingCheckIn = await db.checkInRecords.findOne({
    userId,
    checkInDate: date
  });
  
  if (existingCheckIn) {
    throw new ConflictError('今天已经打卡过了');
  }
  
  // 2. 开启事务
  const transaction = await db.beginTransaction();
  
  try {
    // 3. 创建打卡记录
    const checkInRecord = await db.checkInRecords.create({
      userId,
      checkInDate: date,
      isMakeup: false
    });
    
    // 4. 更新用户统计
    const user = await db.users.findById(userId);
    const newTotalDays = user.totalDays + 1;
    
    // 5. 计算连续天数
    const yesterday = getYesterday(date);
    const hasYesterdayCheckIn = await db.checkInRecords.findOne({
      userId,
      checkInDate: yesterday
    });
    
    const newConsecutiveDays = hasYesterdayCheckIn || user.consecutiveDays === 0
      ? user.consecutiveDays + 1
      : 1;
    
    // 6. 检查段位晋升
    const oldRank = getRankByDays(user.totalDays);
    const newRank = getRankByDays(newTotalDays);
    const isRankUp = oldRank.rank !== newRank.rank;
    
    // 7. 检查连续打卡奖励
    let newMakeupCards = user.makeupCards;
    if (newConsecutiveDays > 0 && newConsecutiveDays % 7 === 0) {
      newMakeupCards += 1;
    }
    
    // 8. 更新用户数据
    await db.users.update(userId, {
      totalDays: newTotalDays,
      consecutiveDays: newConsecutiveDays,
      makeupCards: newMakeupCards,
      lastCheckInDate: date
    });
    
    // 9. 提交事务
    await transaction.commit();
    
    // 10. 异步更新排行榜
    await rankingQueue.add('update-user-ranking', { userId });
    
    return {
      checkInDate: date,
      totalDays: newTotalDays,
      consecutiveDays: newConsecutiveDays,
      currentRank: newRank,
      isRankUp,
      makeupCards: newMakeupCards
    };
    
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

### 5.2 补签逻辑

**补签规则**
1. 只能补签过去的日期（不能补签未来）
2. 每次消耗 1 张补签卡
3. 每天最多补签 2 次
4. 不能补签已经打卡的日期
5. 补签成功后重新计算连续天数

**流程图**

```
接收补签请求
  ↓
验证用户身份（JWT）
  ↓
检查补签卡数量 >= 1
  ├── 不足 → 返回错误 400
  └── 足够 ↓
  ↓
检查补签日期 < 今天
  ├── 未来日期 → 返回错误 400
  └── 过去日期 ↓
  ↓
检查该日期是否已打卡
  ├── 已打卡 → 返回错误 409
  └── 未打卡 ↓
  ↓
检查今日补签次数 < 2
  ├── 超限 → 返回错误 400
  └── 未超限 ↓
  ↓
创建补签记录（is_makeup = true）
  ↓
消耗补签卡（makeup_cards - 1）
  ↓
重新计算连续天数
  ↓
检查段位晋升
  ↓
异步更新排行榜
  ↓
返回补签结果
```

### 5.3 段位计算逻辑

**段位体系（同前端）**

```typescript
const RANK_SYSTEM = [
  { rank: '倔强青铜', minDays: 1, maxDays: 7 },
  { rank: '秩序白银', minDays: 8, maxDays: 30 },
  { rank: '荣耀黄金', minDays: 31, maxDays: 60 },
  { rank: '尊贵铂金', minDays: 61, maxDays: 90 },
  { rank: '永恒钻石', minDays: 91, maxDays: 180 },
  { rank: '至尊星耀', minDays: 181, maxDays: 270 },
  { rank: '最强王者', minDays: 271, maxDays: 365 },
  { rank: '无双王者', minDays: 366, maxDays: 547 },
  { rank: '传奇王者', minDays: 548, maxDays: 99999 }
];

function getRankByDays(totalDays: number): RankInfo {
  for (const rank of RANK_SYSTEM) {
    if (totalDays >= rank.minDays && totalDays <= rank.maxDays) {
      let stars = 0;
      
      switch (rank.rank) {
        case '倔强青铜': stars = totalDays; break;
        case '秩序白银': stars = totalDays - 7; break;
        case '荣耀黄金': stars = totalDays - 30; break;
        case '尊贵铂金': stars = totalDays - 60; break;
        case '永恒钻石': stars = totalDays - 90; break;
        case '至尊星耀': stars = totalDays - 180; break;
        case '最强王者': stars = totalDays - 270; break;
        case '无双王者': stars = totalDays - 365; break;
        case '传奇王者': stars = totalDays - 547; break;
      }
      
      return { ...rank, stars };
    }
  }
  
  return { ...RANK_SYSTEM[0], stars: 0 };
}
```

### 5.4 等价物计算逻辑

```typescript
const EQUIVALENT_ITEMS = [
  { name: '周边游', price: 15000, unit: '次' },
  { name: '健身年卡', price: 2500, unit: '张' },
  { name: 'Switch 游戏机', price: 2000, unit: '台' },
  { name: '汽车保养', price: 800, unit: '次' },
  { name: '健身月卡', price: 300, unit: '张' },
  { name: '啤酒', price: 120, unit: '箱' },
  { name: '电影票', price: 50, unit: '张' },
  { name: '可乐', price: 3, unit: '瓶' }
];

function calculateEquivalentItem(moneySaved: number) {
  if (moneySaved <= 0) {
    return { name: '可乐', count: 0, unit: '瓶' };
  }
  
  for (const item of EQUIVALENT_ITEMS) {
    if (moneySaved >= item.price) {
      return {
        name: item.name,
        count: Math.floor(moneySaved / item.price),
        unit: item.unit
      };
    }
  }
  
  const coke = EQUIVALENT_ITEMS[EQUIVALENT_ITEMS.length - 1];
  return {
    name: coke.name,
    count: Math.floor(moneySaved / coke.price),
    unit: coke.unit
  };
}
```

---

## 六、权限与安全

### 6.1 权限模型

**权限等级**

| 权限类型 | 代码 | 功能权限 |
|----------|------|----------|
| 普通用户 | free | 基础打卡、本地排名 |
| VIP 会员 | vip | 全国排名 + 4 天 AI 体验 |
| AI 戒烟军师 | ai | 全国排名 + 3 个月 AI 权限 |

**权限检查中间件**

```typescript
// 检查是否登录
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ code: 401, message: '未登录' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ code: 401, message: 'Token 无效' });
  }
}

// 检查 VIP 权限
function requireVIP(req, res, next) {
  const user = req.user;
  
  if (user.memberType === 'free') {
    return res.status(403).json({ code: 403, message: 'VIP 功能未开通' });
  }
  
  // 检查是否到期
  if (user.memberExpiryAt && new Date(user.memberExpiryAt) < new Date()) {
    return res.status(403).json({ code: 403, message: 'VIP 已到期' });
  }
  
  next();
}

// 检查 AI 权限
function requireAI(req, res, next) {
  const user = req.user;
  
  if (user.memberType === 'free') {
    return res.status(403).json({ code: 403, message: 'AI 功能未开通' });
  }
  
  // VIP 用户检查 AI 体验期（4 天）
  if (user.memberType === 'vip') {
    const aiActivatedAt = new Date(user.aiActivatedAt);
    const expiryDate = new Date(aiActivatedAt.getTime() + 4 * 24 * 60 * 60 * 1000);
    
    if (new Date() > expiryDate) {
      return res.status(403).json({ code: 403, message: 'AI 体验期已结束' });
    }
  }
  
  // AI 会员检查到期时间（3 个月）
  if (user.memberType === 'ai') {
    if (user.memberExpiryAt && new Date(user.memberExpiryAt) < new Date()) {
      return res.status(403).json({ code: 403, message: 'AI 权限已到期' });
    }
  }
  
  next();
}
```

**使用示例**

```typescript
// 需要登录
app.get('/users/me', requireAuth, getUserInfo);

// 需要 VIP 权限
app.get('/rankings/national', requireAuth, requireVIP, getNationalRanking);

// 需要 AI 权限
app.post('/ai/chat', requireAuth, requireAI, sendAIMessage);
```

### 6.2 接口限流

**限流策略**

| 接口 | 限制 | 说明 |
|------|------|------|
| 登录接口 | 10 次/分钟/IP | 防止暴力破解 |
| 打卡接口 | 1 次/天/用户 | 业务规则 |
| 烟瘾记录 | 6 次/小时/用户 | 防止刷数据 |
| AI 对话 | 30 次/天/用户（免费）<br>100 次/天/用户（VIP） | 成本控制 |
| 排行榜 | 10 次/分钟/用户 | 防止频繁查询 |

**实现方式（Redis + Token Bucket）**

```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate_limit',
  points: 10,      // 允许的请求次数
  duration: 60,    // 时间窗口（秒）
});

async function rateLimitMiddleware(req, res, next) {
  try {
    const key = req.user ? `user_${req.user.id}` : `ip_${req.ip}`;
    await rateLimiter.consume(key);
    next();
  } catch (error) {
    res.status(429).json({ code: 429, message: '请求过于频繁，请稍后再试' });
  }
}
```

### 6.3 数据加密

**敏感数据加密**
- 手机号：AES-256 加密存储
- 兑换码：单向 Hash（不可逆）
- 密码（如有）：bcrypt Hash

**传输加密**
- 全站 HTTPS（TLS 1.3）
- API 响应数据不加密（HTTPS 已加密）

### 6.4 SQL 注入防护

**使用参数化查询**

```typescript
// ❌ 错误示例（SQL 注入风险）
const userId = req.query.userId;
const sql = `SELECT * FROM users WHERE id = ${userId}`;
db.query(sql);

// ✅ 正确示例（参数化查询）
const userId = req.query.userId;
const sql = 'SELECT * FROM users WHERE id = $1';
db.query(sql, [userId]);
```

**使用 ORM（如 Prisma / TypeORM）**

```typescript
// Prisma 自动防止 SQL 注入
const user = await prisma.users.findUnique({
  where: { id: userId }
});
```

### 6.5 XSS 防护

**输入验证与过滤**

```typescript
import validator from 'validator';
import xss from 'xss';

function sanitizeInput(input: string): string {
  // 移除 HTML 标签
  const sanitized = xss(input, {
    whiteList: {},        // 不允许任何标签
    stripIgnoreTag: true  // 移除所有标签
  });
  
  return validator.escape(sanitized);
}

// 使用示例
const nickname = sanitizeInput(req.body.nickname);
```

---

## 七、排行榜系统

### 7.1 排行榜架构

**数据流**

```
用户打卡/补签
  ↓
更新用户 total_days
  ↓
加入消息队列（异步）
  ↓
定时任务（每小时）
  ↓
计算各级别排名
  ├── 全国排名
  ├── 省份排名
  ├── 城市排名
  ├── 区县排名
  └── 街道排名
  ↓
更新 Redis Sorted Set
  ↓
更新数据库快照（rankings 表）
```

### 7.2 Redis 存储结构

**Sorted Set 结构**

```
Key: ranking:national
Score: total_days
Member: user_id

Key: ranking:province:beijing
Score: total_days
Member: user_id

Key: ranking:city:beijing:chaoyang
Score: total_days
Member: user_id
```

**示例命令**

```redis
# 添加/更新用户排名
ZADD ranking:national 15 12345

# 获取前 100 名
ZREVRANGE ranking:national 0 99 WITHSCORES

# 获取用户排名（从 0 开始）
ZREVRANK ranking:national 12345

# 获取用户总数
ZCARD ranking:national

# 获取用户分数（天数）
ZSCORE ranking:national 12345
```

### 7.3 排名计算逻辑

**定时任务（每小时执行）**

```typescript
async function updateRankings() {
  // 1. 获取所有用户
  const users = await db.users.findAll({
    where: { deletedAt: null },
    attributes: ['id', 'totalDays', 'province', 'city', 'district', 'street']
  });
  
  // 2. 按地区分组
  const rankings = {
    national: [],
    provinces: {},
    cities: {},
    districts: {},
    streets: {}
  };
  
  for (const user of users) {
    // 全国排名
    rankings.national.push({ userId: user.id, totalDays: user.totalDays });
    
    // 省份排名
    const provinceKey = user.province || 'unknown';
    if (!rankings.provinces[provinceKey]) {
      rankings.provinces[provinceKey] = [];
    }
    rankings.provinces[provinceKey].push({ userId: user.id, totalDays: user.totalDays });
    
    // 城市排名
    const cityKey = `${user.province}-${user.city}` || 'unknown';
    if (!rankings.cities[cityKey]) {
      rankings.cities[cityKey] = [];
    }
    rankings.cities[cityKey].push({ userId: user.id, totalDays: user.totalDays });
    
    // ... 区县、街道同理
  }
  
  // 3. 更新 Redis
  const pipeline = redis.pipeline();
  
  // 全国排名
  pipeline.del('ranking:national');
  for (const item of rankings.national) {
    pipeline.zadd('ranking:national', item.totalDays, item.userId);
  }
  
  // 省份排名
  for (const [province, items] of Object.entries(rankings.provinces)) {
    const key = `ranking:province:${province}`;
    pipeline.del(key);
    for (const item of items) {
      pipeline.zadd(key, item.totalDays, item.userId);
    }
  }
  
  // ... 城市、区县、街道同理
  
  await pipeline.exec();
  
  // 4. 更新数据库快照（用于历史查询）
  const today = new Date().toISOString().split('T')[0];
  await saveRankingSnapshot(rankings, today);
}
```

### 7.4 权限控制

**全国排名仅对 VIP/AI 用户开放**

```typescript
app.get('/rankings', requireAuth, async (req, res) => {
  const { type, limit = 100 } = req.query;
  const user = req.user;
  
  // 检查权限
  if (type === 'national' && user.memberType === 'free') {
    return res.status(403).json({
      code: 403,
      message: '全国排名未开通，请兑换 VIP 权限'
    });
  }
  
  // 获取排名
  const rankingKey = getRankingKey(type, user);
  const rankings = await redis.zrevrange(rankingKey, 0, limit - 1, 'WITHSCORES');
  
  // 格式化数据
  const result = await formatRankings(rankings);
  
  res.json({ code: 200, data: result });
});
```

---

## 八、兑换码系统

### 8.1 兑换码生成

**批量生成兑换码**

```typescript
import crypto from 'crypto';

async function generateRedeemCodes(
  codeType: 'vip' | 'ai' | 'makeup_card',
  count: number,
  options: {
    durationDays?: number;
    makeupCardCount?: number;
    validFrom?: Date;
    validUntil?: Date;
    maxUses?: number;
  }
): Promise<string[]> {
  const codes: string[] = [];
  const batchId = crypto.randomUUID();
  
  for (let i = 0; i < count; i++) {
    // 生成随机码（8 位字母数字）
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    
    await db.redeemCodes.create({
      code,
      codeType,
      durationDays: options.durationDays,
      makeupCardCount: options.makeupCardCount,
      validFrom: options.validFrom,
      validUntil: options.validUntil,
      maxUses: options.maxUses || 1,
      currentUses: 0,
      isActive: true,
      batchId
    });
    
    codes.push(code);
  }
  
  return codes;
}

// 使用示例
const vipCodes = await generateRedeemCodes('vip', 100, {
  durationDays: 4,
  validFrom: new Date('2025-12-01'),
  validUntil: new Date('2025-12-31'),
  maxUses: 1
});
```

### 8.2 兑换逻辑

```typescript
async function redeemCode(userId: number, code: string) {
  // 1. 查找兑换码
  const redeemCode = await db.redeemCodes.findOne({
    where: { code: code.toUpperCase() }
  });
  
  if (!redeemCode) {
    throw new NotFoundError('兑换码不存在');
  }
  
  // 2. 检查兑换码状态
  if (!redeemCode.isActive) {
    throw new BadRequestError('兑换码已禁用');
  }
  
  if (redeemCode.currentUses >= redeemCode.maxUses) {
    throw new BadRequestError('兑换码已达到使用上限');
  }
  
  const now = new Date();
  if (redeemCode.validFrom && now < redeemCode.validFrom) {
    throw new BadRequestError('兑换码尚未生效');
  }
  
  if (redeemCode.validUntil && now > redeemCode.validUntil) {
    throw new BadRequestError('兑换码已过期');
  }
  
  // 3. 检查用户是否已使用过此码
  const existingUsage = await db.redeemCodeUsages.findOne({
    where: { userId, code: code.toUpperCase() }
  });
  
  if (existingUsage) {
    throw new ConflictError('您已使用过此兑换码');
  }
  
  // 4. 开启事务
  const transaction = await db.beginTransaction();
  
  try {
    const user = await db.users.findById(userId);
    let memberTypeAfter = user.memberType;
    let expiryAfter = user.memberExpiryAt;
    
    // 5. 根据兑换码类型处理
    switch (redeemCode.codeType) {
      case 'vip':
        memberTypeAfter = 'vip';
        const vipExpiryDate = new Date();
        vipExpiryDate.setDate(vipExpiryDate.getDate() + redeemCode.durationDays);
        expiryAfter = vipExpiryDate;
        
        await db.users.update(userId, {
          memberType: 'vip',
          memberExpiryAt: vipExpiryDate,
          vipActivatedAt: new Date()
        });
        break;
        
      case 'ai':
        memberTypeAfter = 'ai';
        const aiExpiryDate = new Date();
        aiExpiryDate.setMonth(aiExpiryDate.getMonth() + 3);
        expiryAfter = aiExpiryDate;
        
        await db.users.update(userId, {
          memberType: 'ai',
          memberExpiryAt: aiExpiryDate,
          aiActivatedAt: new Date()
        });
        break;
        
      case 'makeup_card':
        await db.users.update(userId, {
          makeupCards: user.makeupCards + redeemCode.makeupCardCount
        });
        break;
    }
    
    // 6. 记录使用历史
    await db.redeemCodeUsages.create({
      userId,
      redeemCodeId: redeemCode.id,
      code: code.toUpperCase(),
      memberTypeBefore: user.memberType,
      memberTypeAfter,
      expiryBefore: user.memberExpiryAt,
      expiryAfter
    });
    
    // 7. 更新兑换码使用次数
    await db.redeemCodes.update(redeemCode.id, {
      currentUses: redeemCode.currentUses + 1
    });
    
    await transaction.commit();
    
    return {
      codeType: redeemCode.codeType,
      memberTypeBefore: user.memberType,
      memberTypeAfter,
      expiryBefore: user.memberExpiryAt,
      expiryAfter,
      durationDays: redeemCode.durationDays
    };
    
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

### 8.3 内置兑换码

**测试用兑换码（固定码）**

```typescript
const BUILTIN_CODES = {
  'ZXO': {
    codeType: 'free',
    description: '恢复为普通用户'
  },
  'VIP': {
    codeType: 'vip',
    durationDays: 4,
    description: 'VIP 会员 + 4 天 AI 体验'
  },
  'SVIP': {
    codeType: 'ai',
    durationDays: 90,
    description: 'AI 戒烟军师（3 个月）'
  }
};

// 处理内置兑换码
async function handleBuiltinCode(userId: number, code: string) {
  const builtinCode = BUILTIN_CODES[code.toUpperCase()];
  
  if (!builtinCode) {
    return null; // 不是内置码，走正常流程
  }
  
  const user = await db.users.findById(userId);
  
  switch (code.toUpperCase()) {
    case 'ZXO':
      await db.users.update(userId, {
        memberType: 'free',
        memberExpiryAt: null
      });
      break;
      
    case 'VIP':
      const vipExpiry = new Date();
      vipExpiry.setDate(vipExpiry.getDate() + 4);
      await db.users.update(userId, {
        memberType: 'vip',
        memberExpiryAt: vipExpiry,
        vipActivatedAt: new Date()
      });
      break;
      
    case 'SVIP':
      const aiExpiry = new Date();
      aiExpiry.setMonth(aiExpiry.getMonth() + 3);
      await db.users.update(userId, {
        memberType: 'ai',
        memberExpiryAt: aiExpiry,
        aiActivatedAt: new Date()
      });
      break;
  }
  
  return {
    codeType: builtinCode.codeType,
    description: builtinCode.description
  };
}
```

---

## 九、AI 助手集成

### 9.1 OpenAI 集成

**配置**

```typescript
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
```

**对话接口**

```typescript
async function sendAIMessage(
  userId: number,
  message: string,
  conversationId?: string
): Promise<AIResponse> {
  // 1. 检查权限（已在中间件完成）
  
  // 2. 获取对话历史（上下文）
  const history = conversationId
    ? await getConversationHistory(conversationId)
    : [];
  
  // 3. 构建提示词
  const systemPrompt = `你是一个专业的戒烟辅导助手。你的任务是：
1. 提供科学、实用的戒烟建议
2. 鼓励用户坚持戒烟
3. 解答戒烟相关疑问
4. 分析烟瘾模式并给出应对策略

注意：
- 保持专业、友善的语气
- 避免医疗诊断（建议咨询医生）
- 关注用户情绪，给予心理支持`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: message }
  ];
  
  // 4. 调用 OpenAI API
  const startTime = Date.now();
  
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 500,
    temperature: 0.7,
  });
  
  const responseTime = Date.now() - startTime;
  const aiResponse = completion.data.choices[0].message.content;
  const tokensUsed = completion.data.usage.total_tokens;
  
  // 5. 保存对话记录
  const newConversationId = conversationId || `conv_${Date.now()}_${userId}`;
  
  await db.aiConversations.create({
    userId,
    conversationId: newConversationId,
    userMessage: message,
    aiResponse,
    tokensUsed,
    responseTimeMs: responseTime,
    messageIndex: history.length + 1
  });
  
  return {
    response: aiResponse,
    conversationId: newConversationId,
    messageIndex: history.length + 1
  };
}
```

### 9.2 智能场景识别

**根据用户数据个性化回复**

```typescript
async function getPersonalizedAIResponse(
  userId: number,
  message: string
): Promise<string> {
  // 获取用户数据
  const user = await db.users.findById(userId);
  const settings = await db.userSettings.findOne({ where: { userId } });
  const recentCravings = await db.cravingRecords.findAll({
    where: {
      userId,
      recordedDate: {
        gte: getDateDaysAgo(7)
      }
    }
  });
  
  // 构建个性化上下文
  const context = `
用户信息：
- 戒烟天数：${user.totalDays} 天
- 连续天数：${user.consecutiveDays} 天
- 吸烟年限：${settings.smokingYears}
- 每日吸烟量：${settings.dailyAmount} 根
- 最近 7 天烟瘾记录：${recentCravings.length} 次

请根据以上信息，给出个性化建议。
  `;
  
  // 调用 AI（附带上下文）
  const response = await sendAIMessage(userId, context + '\n\n' + message);
  
  return response.response;
}
```

### 9.3 成本控制

**Token 限制**

```typescript
// 每日 Token 限额
const DAILY_TOKEN_LIMITS = {
  free: 0,        // 免费用户无权限
  vip: 10000,     // VIP 用户每日 10k tokens
  ai: 50000       // AI 会员每日 50k tokens
};

async function checkTokenLimit(userId: number): Promise<boolean> {
  const user = await db.users.findById(userId);
  const memberType = user.memberType;
  
  // 获取今日已使用 tokens
  const today = new Date().toISOString().split('T')[0];
  const todayUsage = await db.aiConversations.sum('tokensUsed', {
    where: {
      userId,
      createdAt: {
        gte: new Date(today)
      }
    }
  });
  
  const limit = DAILY_TOKEN_LIMITS[memberType];
  
  return todayUsage < limit;
}
```

**缓存常见问题**

```typescript
const FAQ_CACHE = {
  '我感到很想抽烟怎么办': `理解您现在的感受。当烟瘾来临时，可以尝试：
1. 深呼吸 5 次，放松身心
2. 喝一杯水，转移注意力
3. 嚼口香糖或吃水果
4. 短暂运动，如快走 5 分钟
5. 回顾戒烟的初心和已取得的成果`,

  '戒烟多久身体会恢复': `身体恢复是一个渐进过程：
- 20 分钟：心率血压下降
- 12 小时：一氧化碳浓度正常
- 2-3 周：肺功能改善
- 1-9 个月：咳嗽减少
- 1 年：心脏病风险降低 50%
- 5 年：中风风险降至正常
您现在已坚持 {totalDays} 天，继续加油！`
};

async function getAIResponse(userId: number, message: string): Promise<string> {
  // 检查缓存
  const cachedResponse = FAQ_CACHE[message];
  if (cachedResponse) {
    const user = await db.users.findById(userId);
    return cachedResponse.replace('{totalDays}', user.totalDays.toString());
  }
  
  // 调用 AI
  return await sendAIMessage(userId, message);
}
```

---

## 十、缓存策略

### 10.1 缓存层级

```
L1: 应用内存缓存（Node.js Memory）
  ↓ 未命中
L2: Redis 缓存
  ↓ 未命中
L3: 数据库
```

### 10.2 缓存内容

| 数据类型 | 缓存位置 | TTL | 更新策略 |
|----------|----------|-----|----------|
| 用户信息 | Redis | 30 分钟 | 被动失效 + 主动更新 |
| 排行榜 | Redis | 1 小时 | 定时任务更新 |
| 段位配置 | Memory | 永久 | 代码更新时刷新 |
| 等价物配置 | Memory | 永久 | 代码更新时刷新 |
| AI 对话历史 | Redis | 24 小时 | LRU 淘汰 |
| 热点数据 | Redis | 5 分钟 | 主动失效 |

### 10.3 缓存实现

**用户信息缓存**

```typescript
async function getUserById(userId: number): Promise<User> {
  const cacheKey = `user:${userId}`;
  
  // 1. 尝试从 Redis 获取
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // 2. 从数据库查询
  const user = await db.users.findById(userId);
  
  // 3. 写入 Redis（30 分钟）
  await redis.setex(cacheKey, 1800, JSON.stringify(user));
  
  return user;
}

// 更新用户时主动失效缓存
async function updateUser(userId: number, data: Partial<User>) {
  await db.users.update(userId, data);
  
  // 删除缓存
  await redis.del(`user:${userId}`);
}
```

**排行榜缓存**

```typescript
// 排行榜直接存储在 Redis Sorted Set 中
async function getRanking(type: string, limit: number) {
  const key = `ranking:${type}`;
  
  // 直接从 Redis 获取
  const rankings = await redis.zrevrange(key, 0, limit - 1, 'WITHSCORES');
  
  return formatRankings(rankings);
}
```

---

## 十一、性能优化

### 11.1 数据库优化

**索引优化**
- 为频繁查询字段创建索引
- 组合查询使用复合索引
- 定期分析慢查询日志

**查询优化**
- 避免 SELECT *，只查询需要的字段
- 使用分页查询，避免一次性加载大量数据
- 使用 JOIN 替代多次查询

**连接池**

```typescript
const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,              // 最大连接数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### 11.2 异步任务

**使用消息队列处理耗时操作**

```typescript
import Bull from 'bull';

const rankingQueue = new Bull('ranking-update', {
  redis: redisConfig
});

// 添加任务
await rankingQueue.add('update-user-ranking', { userId: 12345 });

// 处理任务
rankingQueue.process('update-user-ranking', async (job) => {
  const { userId } = job.data;
  await updateUserRanking(userId);
});
```

**定时任务**

```typescript
import cron from 'node-cron';

// 每小时更新排行榜
cron.schedule('0 * * * *', async () => {
  console.log('开始更新排行榜...');
  await updateAllRankings();
  console.log('排行榜更新完成');
});

// 每天凌晨检查权限到期
cron.schedule('0 0 * * *', async () => {
  console.log('检查权限到期...');
  await checkMemberExpiry();
});
```

### 11.3 CDN 加速

**静态资源 CDN**
- 用户头像
- 分享海报图片
- 前端静态文件

**配置**

```typescript
const CDN_BASE_URL = 'https://cdn.zxo.app';

function getCDNUrl(path: string): string {
  return `${CDN_BASE_URL}/${path}`;
}

// 上传头像
async function uploadAvatar(file: File): Promise<string> {
  const filename = `avatars/${Date.now()}_${file.name}`;
  await oss.put(filename, file);
  return getCDNUrl(filename);
}
```

---

## 十二、部署方案

### 12.1 服务器配置

**推荐配置（中小规模）**

| 服务 | 配置 | 数量 |
|------|------|------|
| API Server | 2C4G | 2 台（负载均衡） |
| PostgreSQL | 4C8G | 1 台主 + 1 台从 |
| Redis | 2C4G | 3 台（哨兵模式） |
| Nginx | 2C2G | 1 台 |

**推荐配置（大规模）**

| 服务 | 配置 | 数量 |
|------|------|------|
| API Server | 4C8G | 4+ 台 |
| PostgreSQL | 8C16G | 1 主 + 2 从 |
| Redis | 4C8G | 6 台（集群模式） |
| Nginx | 4C4G | 2 台（高可用） |

### 12.2 Docker 部署

**Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml**

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=zxo
      - POSTGRES_USER=zxo
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - api
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### 12.3 Kubernetes 部署

**deployment.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zxo-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: zxo-api
  template:
    metadata:
      labels:
        app: zxo-api
    spec:
      containers:
      - name: api
        image: zxo/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: host
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 十三、监控与运维

### 13.1 健康检查

**接口**

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime()
  });
});

app.get('/ready', async (req, res) => {
  try {
    // 检查数据库连接
    await db.query('SELECT 1');
    
    // 检查 Redis 连接
    await redis.ping();
    
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});
```

### 13.2 日志系统

**Winston 日志**

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// 生产环境不输出到控制台
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// 使用
logger.info('User checked in', { userId: 12345, date: '2025-12-01' });
logger.error('Database connection failed', { error: err.message });
```

### 13.3 性能监控

**Prometheus + Grafana**

```typescript
import promClient from 'prom-client';

const register = new promClient.Registry();

// 默认指标（CPU、内存等）
promClient.collectDefaultMetrics({ register });

// 自定义指标
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000]
});

register.registerMetric(httpRequestDuration);

// 中间件
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration);
  });
  
  next();
});

// 指标接口
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### 13.4 错误监控

**Sentry 集成**

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

// 错误处理中间件
app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => {
  logger.error(err.message, { error: err, stack: err.stack });
  
  res.status(err.statusCode || 500).json({
    code: err.statusCode || 500,
    message: err.message || '服务器内部错误',
  });
});
```

---

## 十四、数据安全与合规

### 14.1 数据备份

**自动备份策略**

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# 备份数据库
pg_dump -h localhost -U zxo -d zxo > $BACKUP_DIR/db_$DATE.sql

# 压缩
gzip $BACKUP_DIR/db_$DATE.sql

# 上传到 OSS
aws s3 cp $BACKUP_DIR/db_$DATE.sql.gz s3://zxo-backups/

# 删除 7 天前的本地备份
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +7 -delete
```

**定时任务（crontab）**

```bash
# 每天凌晨 2 点备份
0 2 * * * /path/to/backup.sh
```

### 14.2 数据恢复

```bash
# 解压备份文件
gunzip db_20251201_020000.sql.gz

# 恢复数据库
psql -h localhost -U zxo -d zxo < db_20251201_020000.sql
```

### 14.3 隐私保护

**GDPR 合规**

- 用户数据最小化收集
- 提供数据导出功能
- 提供数据删除功能（软删除）
- 明确的隐私政策和用户协议

**数据删除接口**

```typescript
app.delete('/users/me', requireAuth, async (req, res) => {
  const userId = req.user.id;
  
  // 软删除（保留 30 天）
  await db.users.update(userId, {
    deletedAt: new Date()
  });
  
  // 30 天后物理删除（定时任务）
  await deleteQueue.add('schedule-user-deletion', { userId }, {
    delay: 30 * 24 * 60 * 60 * 1000 // 30 天
  });
  
  res.json({ code: 200, message: '账号已删除，30 天内可恢复' });
});
```

---

## 附录

### A. 环境变量配置

```bash
# .env.example

# 应用配置
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.zxo.app

# 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zxo
DB_USER=zxo
DB_PASSWORD=your_password

# Redis 配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT 配置
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# 微信小程序配置
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret

# OpenAI 配置
OPENAI_API_KEY=sk-xxxxxxxxxxxx
OPENAI_MODEL=gpt-3.5-turbo

# OSS 配置
OSS_REGION=cn-beijing
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_secret_key
OSS_BUCKET=zxo-app

# Sentry 配置
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# 其他
LOG_LEVEL=info
```

### B. API 错误码

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未登录 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 409 | 资源冲突（如重复打卡） |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |
| 503 | 服务不可用 |

### C. 数据库迁移

**Prisma 迁移**

```bash
# 创建迁移
npx prisma migrate dev --name add_rankings_table

# 应用迁移
npx prisma migrate deploy

# 生成客户端
npx prisma generate
```

---

**文档结束**

---

## 更新日志

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| v1.0 | 2025-11-15 | 初版创建 |
| v2.0 | 2025-12-01 | 完善 API 设计、添加 AI 模块、优化性能方案 |
