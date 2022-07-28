import React from 'react';
import styles from './DotsWave.module.css';
import { motion, Transition, Variants } from 'framer-motion';
import { Box } from '@mantine/core';

type Props = { count?: number };

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
    y: '50%',
  },
  end: {
    y: '150%',
  },
};

const circleTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
};

export function DotsWave({ count }: Props) {
  return (
    <motion.div
      className={styles.container}
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
