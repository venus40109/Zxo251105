import { motion } from 'motion/react';
import BrandLogo from './BrandLogo';

export default function SplashScreen() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        {/* Logo/Icon */}
        <motion.div
          className="mb-8 relative"
          animate={{ 
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, rgba(0, 184, 148, 0.2) 0%, rgba(0, 184, 148, 0.1) 100%)',
              border: '3px solid #00B894',
              boxShadow: '0 8px 32px rgba(0, 184, 148, 0.3)',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <BrandLogo size={48} color="#00B894" />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 
            className="mb-2"
            style={{ 
              color: '#EFEFEF',
              fontSize: '36px',
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}
          >
            ZXO
          </h1>
          <p style={{ color: '#888888', fontSize: '16px' }}>
            戒烟打卡 · 重获新生
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <p 
            style={{ 
              color: '#00B894',
              fontSize: '14px',
              letterSpacing: '1px'
            }}
          >
            每一天的坚持都是成功的基石
          </p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="mt-16 flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#00B894' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
