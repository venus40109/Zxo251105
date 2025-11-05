// 段位与星级体系

export interface RankInfo {
  rank: string;
  minDays: number;
  maxDays: number;
  stars: number;
  period: string;
  promotionMessage: string;
  checkInMessage: string;
}

export const RANK_SYSTEM: RankInfo[] = [
  {
    rank: '倔强青铜',
    minDays: 1,
    maxDays: 7,
    stars: 0, // 星级 = 天数
    period: '第1周',
    promotionMessage: '加油！争取成功度过最难熬的头7天。每天不吸烟就是一场胜利。',
    checkInMessage: '今天的你，赢了欲望。'
  },
  {
    rank: '秩序白银',
    minDays: 8,
    maxDays: 30,
    stars: 0, // 星级 = 天数 - 7
    period: '第2周-第1个月',
    promotionMessage: '身体开始清除尼古丁，习惯开始被打破。坚持每天打卡。',
    checkInMessage: '习惯在重塑，意志在生长。'
  },
  {
    rank: '荣耀黄金',
    minDays: 31,
    maxDays: 60,
    stars: 0, // 星级 = 天数 - 30
    period: '第2个月',
    promotionMessage: '生理依赖显著减弱。坚持一个月不吸烟，值得一枚"金牌"。',
    checkInMessage: '坚持一个月，你的呼吸变轻盈了。'
  },
  {
    rank: '尊贵铂金',
    minDays: 61,
    maxDays: 90,
    stars: 0, // 星级 = 天数 - 60
    period: '第3个月',
    promotionMessage: '恭喜！你已成功克服了最强烈的生理依赖，戒烟习惯初步形成。',
    checkInMessage: '你的身体正在恢复健康。'
  },
  {
    rank: '永恒钻石',
    minDays: 91,
    maxDays: 180,
    stars: 0, // 星级 = 天数 - 90
    period: '第4-6个月',
    promotionMessage: '名声在外的"钻石坑"，极易因心瘾和诱惑而"掉星"（复吸）。稳住心态！',
    checkInMessage: '心瘾最强时，信念最亮。'
  },
  {
    rank: '至尊星耀',
    minDays: 181,
    maxDays: 270,
    stars: 0, // 星级 = 天数 - 180
    period: '第7-9个月',
    promotionMessage: '已经半年多不吸烟，信心大增。但依然不能松懈。',
    checkInMessage: '半年无烟，你已让意志发光。'
  },
  {
    rank: '最强王者',
    minDays: 271,
    maxDays: 365,
    stars: 0, // 星级 = 天数 - 270
    period: '第10个月-1年',
    promotionMessage: '里程碑达成！坚持戒烟满一年，你已经是生活中的"王者"。',
    checkInMessage: '你是生活中的王者。'
  },
  {
    rank: '无双王者',
    minDays: 366,
    maxDays: 547,
    stars: 0, // 星级 = 天数 - 365
    period: '第1年-1年半',
    promotionMessage: '对烟草的渴望已非常微弱，在各种场合都能坦然拒绝敬烟。',
    checkInMessage: '无感于烟，自由于心。'
  },
  {
    rank: '传奇王者',
    minDays: 548,
    maxDays: 99999,
    stars: 0, // 星级 = 天数 - 547
    period: '第1年半-2年及以上',
    promotionMessage: '登顶！你不再是一个"戒烟者"，而是一个"不吸烟的人"。',
    checkInMessage: '两年坚持，自由呼吸的传奇。'
  }
];

// 根据总天数获取段位信息
export function getRankByDays(totalDays: number): RankInfo & { stars: number } {
  // 如果天数为0，返回倔强青铜0星
  if (totalDays === 0) {
    return {
      ...RANK_SYSTEM[0],
      stars: 0
    };
  }
  
  for (const rank of RANK_SYSTEM) {
    if (totalDays >= rank.minDays && totalDays <= rank.maxDays) {
      let stars = 0;
      
      // 计算星级
      if (rank.rank === '倔强青铜') {
        stars = totalDays; // 1-7星
      } else if (rank.rank === '秩序白银') {
        stars = totalDays - 7; // 1-23星
      } else if (rank.rank === '荣耀黄金') {
        stars = totalDays - 30; // 1-30星
      } else if (rank.rank === '尊贵铂金') {
        stars = totalDays - 60; // 1-30星
      } else if (rank.rank === '永恒钻石') {
        stars = totalDays - 90; // 1-90星
      } else if (rank.rank === '至尊星耀') {
        stars = totalDays - 180; // 1-90星
      } else if (rank.rank === '最强王者') {
        stars = totalDays - 270; // 1-95星
      } else if (rank.rank === '无双王者') {
        stars = totalDays - 365; // 1-182星
      } else if (rank.rank === '传奇王者') {
        stars = totalDays - 547; // 1-183星及以上
      }
      
      return {
        ...rank,
        stars
      };
    }
  }
  
  // 默认返回倔强青铜
  return {
    ...RANK_SYSTEM[0],
    stars: 1
  };
}

// 获取下一个段位信息
export function getNextRank(totalDays: number): { nextRank: string; daysToNext: number } {
  const currentRank = getRankByDays(totalDays);
  const currentIndex = RANK_SYSTEM.findIndex(r => r.rank === currentRank.rank);
  
  if (currentIndex < RANK_SYSTEM.length - 1) {
    const nextRankInfo = RANK_SYSTEM[currentIndex + 1];
    return {
      nextRank: nextRankInfo.rank,
      daysToNext: nextRankInfo.minDays - totalDays
    };
  }
  
  // 已经是最高段位
  return {
    nextRank: '传奇王者',
    daysToNext: 0
  };
}

// 计算连续打卡天数（考虑补签）
export function calculateConsecutiveDays(
  checkInRecords: { date: string; isMakeup: boolean }[]
): number {
  if (checkInRecords.length === 0) return 0;
  
  // 按日期排序
  const sorted = [...checkInRecords].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let consecutive = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < sorted.length; i++) {
    const recordDate = new Date(sorted[i].date);
    recordDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    
    if (recordDate.getTime() === expectedDate.getTime()) {
      consecutive++;
    } else {
      break;
    }
  }
  
  return consecutive;
}
