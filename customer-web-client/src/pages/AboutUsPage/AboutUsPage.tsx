import React from 'react';

import { Container, Image, Text, Title } from '@mantine/core';

import banner1 from '../../assets/images/pages/AboutUs/banner1.png';

export function AboutUsPage() {
  return (
    <Container
      size="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        alignItems: 'center',
      }}
    >
      <Title order={2} style={{ fontWeight: 900 }}>
        About us
      </Title>

      <Image
        src={banner1}
        style={{
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      />

      <Text size="lg" style={{ textAlign: 'justify' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        officia, aliquam suscipit expedita eos recusandae nisi, velit quasi
        sequi non facere officiis reprehenderit praesentium pariatur fugiat
        porro. Eos, blanditiis vero? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Molestiae alias corrupti temporibus reiciendis
        suscipit neque voluptatum laborum, laudantium culpa est sit ducimus ad
        necessitatibus eum natus, repudiandae et in commodi. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Sapiente magnam eos, repellendus
        itaque veniam impedit asperiores eligendi praesentium cumque quod, saepe
        totam laudantium ducimus dolore odio vel officiis harum rerum?
      </Text>

      <Text size="lg" style={{ textAlign: 'justify' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        officia, aliquam suscipit expedita eos recusandae nisi, velit quasi
        sequi non facere officiis reprehenderit praesentium pariatur fugiat
        porro. Eos, blanditiis vero? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Molestiae alias corrupti temporibus reiciendis
        suscipit neque voluptatum laborum, laudantium culpa est sit ducimus ad
        necessitatibus eum natus, repudiandae et in commodi. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Sapiente magnam eos, repellendus
        itaque veniam impedit asperiores eligendi praesentium cumque quod, saepe
        totam laudantium ducimus dolore odio vel officiis harum rerum?
      </Text>
    </Container>
  );
}
