import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Box, Image, Input, InputBaseProps, Text } from '@mantine/core';

import { imageExtensions, placeholderImage } from '../../constants/shared';
import styles from './ImageInput.module.css';

type Props = {
  image: string | null;
  label: string;
  onImageClick: () => void;
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputBaseProps;

export const ImageInput = React.forwardRef<HTMLInputElement, Props>(
  ({ image, label, onImageClick, uploadImage, ...rest }, ref) => {
    const [imageHovered, setImageHovered] = useState(false);

    return (
      <>
        <Box
          className={styles.container}
          onMouseEnter={() => setImageHovered(true)}
          onClick={onImageClick}
          onMouseLeave={() => setImageHovered(false)}
        >
          <motion.div
            transition={{ duration: 0.15 }}
            animate={{
              filter:
                `brightness(${imageHovered ? 0.4 : 1}) ` +
                `blur(${imageHovered ? '1px' : 0})`,
            }}
          >
            <Image
              className={styles.image}
              src={typeof image === 'string' ? image : placeholderImage}
            />
          </motion.div>

          <motion.p
            transition={{ duration: 0.2 }}
            animate={{ opacity: imageHovered ? 1 : 0 }}
            className={styles.changeImageText}
          >
            Click to change
          </motion.p>
        </Box>

        <Text align="center" style={{ color: 'var(--gray-700)' }}>
          {label}
        </Text>

        <Input
          {...rest}
          ref={ref}
          style={{ display: 'none' }}
          type="file"
          accept={imageExtensions}
          onChange={uploadImage}
        />
      </>
    );
  }
);
