import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationToast() {
  const { notification } = useContext(AppContext);

  if (!notification) return null;

  const bgColor = {
    success: 'bg-tertiary',
    error: 'bg-error',
    info: 'bg-primary',
  }[notification.type] || 'bg-primary';

  const icon = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
  }[notification.type] || 'info';

  const textColor = notification.type === 'error' ? 'text-on-error' : 'text-on-primary';

  return (
    <AnimatePresence>
      <motion.div
        key="notification"
        initial={{ opacity: 0, y: -60, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -60, x: '-50%' }}
        className={`fixed top-20 left-1/2 z-[200] ${bgColor} ${textColor} px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 max-w-md font-body-md text-body-md`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
        <span>{notification.message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
