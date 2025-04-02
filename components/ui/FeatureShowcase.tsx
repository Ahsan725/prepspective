
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import styles from '../feature-showcase.module.css'

interface FeatureShowcaseProps {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  isReversed?: boolean;
}

const FeatureShowcase = ({ 
  id, 
  title, 
  description, 
  videoSrc, 
  isReversed = false 
}: FeatureShowcaseProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section 
      id={id}
      className="w-full py-24 overflow-hidden bg-white relative" 
      ref={ref}
    >
      {/* Background decorations */}
      <div className={styles.backgroundDecorations}>
        <div 
          className={styles.gradientOrb} 
          style={{ 
            top: isReversed ? '15%' : '10%', 
            [isReversed ? 'left' : 'right']: '15%' 
          }}
        ></div>
        <div 
          className={styles.gradientOrb} 
          style={{ 
            bottom: '20%', 
            [isReversed ? 'right' : 'left']: '5%' 
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>
          {/* Text content - 1/3 width */}
          <motion.div 
            className={`w-full lg:w-1/3 mb-12 lg:mb-0 ${isReversed ? 'pl-0 lg:pl-8' : 'pr-0 lg:pr-8'}`}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: isReversed ? 50 : -50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.7, ease: "easeOut" }
              }
            }}
          >
            <div className="flex items-center mb-3">
              <div className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                New Feature
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-900">
              {title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              {description}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="ml-3 text-gray-600">
                  <span className="font-medium text-gray-900">10x faster development</span> - Complete tasks in minutes that normally take hours
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="ml-3 text-gray-600">
                  <span className="font-medium text-gray-900">99.8% accuracy</span> - Production-ready code with minimal review needed
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                size="lg" 
                className={`${styles.ctaButton} h-12 rounded-full px-8 bg-purple-600 hover:bg-purple-700 text-white`}
              >
                Try it now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="text-sm font-medium text-gray-500">
                Starting at <span className="text-black">$19</span>/month
              </div>
            </div>
          </motion.div>
          
          {/* Video showcase - 2/3 width */}
          <motion.div 
            className="w-full lg:w-2/3 relative"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: 0.2
                }
              }
            }}
          >
            <div className={styles.videoContainer}>
              <div className={styles.browserFrame}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <div className={`${styles.browserDot} ${styles.red}`}></div>
                    <div className={`${styles.browserDot} ${styles.yellow}`}></div>
                    <div className={`${styles.browserDot} ${styles.green}`}></div>
                  </div>
                  <div className={styles.browserAddressBar}>codeparrot.ai/editor</div>
                </div>
                <div className={styles.browserContent}>
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={styles.featureVideo}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Floating code snippets */}
                  <motion.div 
                    className={`${styles.codeSnippet} ${isReversed ? styles.codeSnippet2 : styles.codeSnippet1}`}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className={styles.codeHeader}>
                      <div className={styles.codeDot}></div>
                      <div className={styles.codeDot}></div>
                      <div className={styles.codeDot}></div>
                      <span>App.tsx</span>
                    </div>
                    <pre>const App = () =&gt; {'{'} ... {'}'}</pre>
                  </motion.div>
                  
                  <motion.div 
                    className={`${styles.codeSnippet} ${isReversed ? styles.codeSnippet1 : styles.codeSnippet2}`}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3.5,
                      delay: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className={styles.codeHeader}>
                      <div className={styles.codeDot}></div>
                      <div className={styles.codeDot}></div>
                      <div className={styles.codeDot}></div>
                      <span>useEffect.tsx</span>
                    </div>
                    <pre>useEffect(() =&gt; {'{'} ... {'}'} )</pre>
                  </motion.div>
                </div>
              </div>
              
              {/* Colored glow effect */}
              <div className={styles.videoGlow}></div>
              
              {/* Particle effects */}
              <div className={styles.particles}>
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i} 
                    className={styles.particle}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${5 + Math.random() * 10}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
