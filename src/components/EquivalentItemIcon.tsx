import { Plane, Dumbbell, Gamepad2, Wrench, CalendarDays, Beer, Ticket, Coffee } from 'lucide-react';

interface EquivalentItemIconProps {
  itemName: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function EquivalentItemIcon({ 
  itemName, 
  size = 20, 
  color = '#00B894',
  className = '' 
}: EquivalentItemIconProps) {
  
  const iconProps = {
    className,
    style: { width: size, height: size, color }
  };

  switch (itemName) {
    case '周边游':
      return <Plane {...iconProps} />;
    case '健身年卡':
      return <Dumbbell {...iconProps} />;
    case 'Switch 游戏机':
      return <Gamepad2 {...iconProps} />;
    case '汽车保养':
      return <Wrench {...iconProps} />;
    case '健身月卡':
      return <CalendarDays {...iconProps} />;
    case '啤酒':
      return <Beer {...iconProps} />;
    case '电影票':
      return <Ticket {...iconProps} />;
    case '可乐':
      return <Coffee {...iconProps} />;
    default:
      return <Coffee {...iconProps} />;
  }
}
