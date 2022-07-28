import { Box } from '@mantine/core';
import { motion, Transition, Variants } from 'framer-motion';
import React from 'react';
import styles from './ScalingDotsWave.module.css';

type Props = {
  count?: number;
};

const containerVariants: Variants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const circleVariants: Variants = {
  start: {
    opacity: 0.5,
    scale: 0.2,
  },
  end: {
    opacity: 1,
    scale: 1.1,
  },
};

const circleTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
};

export function ScalingDotsWave({ count }: Props) {
  return (
    <motion.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        padding: '10px 20px',
      }}
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {React.Children.toArray(
        [...new Array(count ?? 3)].map(() => (
          <motion.div variants={circleVariants} transition={circleTransition}>
            <Box className={styles.circle}></Box>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
