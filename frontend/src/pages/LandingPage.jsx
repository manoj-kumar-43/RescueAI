import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const { setActivePage, startNewTriage } = useContext(AppContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center px-container-margin-mobile md:px-container-margin-desktop py-12 relative overflow-hidden bg-background">
        
        {/* Animated Sonar Radar Background (Visual WOW factor) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="relative w-[600px] h-[600px] flex items-center justify-center">
            {/* Pulsating circles */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-radar"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/30 animate-radar" style={{ animationDelay: '1s' }}></div>
            <div className="absolute w-[200px] h-[200px] rounded-full border border-primary/40 animate-radar" style={{ animationDelay: '2s' }}></div>
            {/* Spinning radar sweeping line */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/5 to-transparent animate-spin" style={{ animationDuration: '15s' }}></div>
          </div>
        </div>

        {/* Floating grid elements */}
        <div className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-primary/10 animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-8 h-8 rounded-full bg-secondary/5 animate-float-delayed"></div>

        <motion.div 
          className="z-10 max-w-4xl mx-auto w-full text-center md:text-left flex flex-col items-center md:items-start gap-stack-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Warning disclaimer */}
          <motion.div 
            className="bg-error-container text-on-error-container font-label-bold text-label-bold px-4 py-2 rounded-full inline-flex items-center gap-2 border border-secondary-container/20 shadow-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
            Not a replacement for professional medical advice.
          </motion.div>

          {/* Heading */}
          <motion.h1 
            className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface max-w-3xl leading-tight font-black"
            variants={itemVariants}
          >
            Emergency Assistance, <br className="hidden md:block" />
            <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Powered by AI.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
            variants={itemVariants}
          >
            Rapid triage, vital symptom analysis, and instant routing to the nearest appropriate medical facility. Designed for speed when seconds count.
          </motion.p>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row w-full md:w-auto gap-4 mt-4"
            variants={itemVariants}
          >
            <motion.button 
              onClick={startNewTriage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-on-primary font-action-xl text-action-xl rounded-full px-8 py-4 h-[64px] min-h-[56px] flex items-center justify-center gap-3 shadow-md hover:bg-primary/95 transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                vital_signs
              </span>
              Start Triage Now
            </motion.button>

            <motion.button 
              onClick={() => alert("Calling 911...")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-on-secondary font-action-xl text-action-xl rounded-full px-8 py-4 h-[64px] min-h-[56px] flex items-center justify-center gap-3 shadow-lg hover:bg-secondary/95 transition-colors animate-pulse"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                call
              </span>
              CALL 911
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-container-margin-mobile md:px-container-margin-desktop py-stack-lg bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -5, shadow: '0 10px 25px -5px rgba(0, 74, 198, 0.1)' }}
            className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col gap-4 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_hospital
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Find Nearby Hospitals</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              Instantly locate the closest medical facilities equipped to handle your specific emergency based on real-time routing.
            </p>
            <button 
              onClick={() => setActivePage('hospitals')}
              className="font-label-bold text-label-bold text-primary flex items-center gap-1 hover:underline text-left mt-auto"
            >
              View Map 
              <span className="material-symbols-outlined text-[18px] translate-y-[1px]">
                arrow_forward
              </span>
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -5, shadow: '0 10px 25px -5px rgba(0, 98, 67, 0.1)' }}
            className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col gap-4 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Decision Support Tool</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              AI-driven symptom analysis to provide immediate, actionable next steps while you wait for professional help.
            </p>
            <button 
              onClick={() => setActivePage('safety')}
              className="font-label-bold text-label-bold text-primary flex items-center gap-1 hover:underline text-left mt-auto"
            >
              How it Works 
              <span className="material-symbols-outlined text-[18px] translate-y-[1px]">
                arrow_forward
              </span>
            </button>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -5, shadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}
            className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col gap-4 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-surface-variant text-on-surface-variant rounded-full flex items-center justify-center border border-outline-variant shadow-inner">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Safety-First Architecture</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              Built on a secure, resilient infrastructure designed to remain operational and protect your data during critical moments.
            </p>
            <button 
              onClick={() => setActivePage('safety')}
              className="font-label-bold text-label-bold text-primary flex items-center gap-1 hover:underline text-left mt-auto"
            >
              Read Architecture 
              <span className="material-symbols-outlined text-[18px] translate-y-[1px]">
                arrow_forward
              </span>
            </button>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
