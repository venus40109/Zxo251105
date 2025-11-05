import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface CustomToastProps {
  message: string;
  type?: 'success' | 'info';
}

export function CustomToast({ message, type = 'success' }: CustomToastProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="flex flex-col items-center justify-center p-6 rounded-2xl"
      style={{
        background: 'rgba(45, 45, 45, 0.98)',
        border: '1px solid rgba(189, 189, 189, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        minWidth: '200px',
      }}
    >
      {type === 'success' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{
            background: 'linear-gradient(145deg, rgba(0, 184, 148, 0.2) 0%, rgba(0, 184, 148, 0.1) 100%)',
            border: '2px solid #00B894',
          }}
        >
          <Check className="w-8 h-8" style={{ color: '#00B894' }} />
        </motion.div>
      )}
      <div 
        className="text-center"
        style={{ 
          color: '#EFEFEF',
          fontSize: '16px',
          lineHeight: '1.5'
        }}
      >
        {message}
      </div>
    </motion.div>
  );
}

// 自定义toast显示函数
export function showSuccessToast(message: string) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform = 'translate(-50%, -50%)';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const root = (window as any).__customToastRoot;
  if (root) {
    root.render(<CustomToast message={message} type="success" />);
  }

  setTimeout(() => {
    document.body.removeChild(container);
  }, 2000);
}
