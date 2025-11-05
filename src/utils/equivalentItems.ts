// 等价物兑换逻辑

export interface EquivalentItem {
  name: string;
  price: number;
  unit: string;
}

// 等价物配置表（从高到低排序）
export const EQUIVALENT_ITEMS: EquivalentItem[] = [
  { name: '周边游', price: 15000, unit: '次' },
  { name: '健身年卡', price: 2500, unit: '张' },
  { name: 'Switch 游戏机', price: 2000, unit: '台' },
  { name: '汽车保养', price: 800, unit: '次' },
  { name: '健身月卡', price: 300, unit: '张' },
  { name: '啤酒', price: 120, unit: '箱' },
  { name: '电影票', price: 50, unit: '张' },
  { name: '可乐', price: 3, unit: '瓶' },
];

/**
 * 根据节省金额计算等价物
 * 规则：从高到低遍历，找出第一个"累计节省金额"大于等于"物品价格"的物品
 */
export function calculateEquivalentItem(moneySaved: number): {
  name: string;
  count: number;
  unit: string;
} {
  // 如果金额为0，返回默认值
  if (moneySaved <= 0) {
    return {
      name: '可乐',
      count: 0,
      unit: '瓶'
    };
  }

  // 从高到低遍历
  for (const item of EQUIVALENT_ITEMS) {
    if (moneySaved >= item.price) {
      return {
        name: item.name,
        count: Math.floor(moneySaved / item.price),
        unit: item.unit
      };
    }
  }

  // 如果都不满足，返回可乐的数量
  const coke = EQUIVALENT_ITEMS[EQUIVALENT_ITEMS.length - 1];
  return {
    name: coke.name,
    count: Math.floor(moneySaved / coke.price),
    unit: coke.unit
  };
}
