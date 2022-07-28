import React from 'react';
import { Outlet } from 'react-router-dom';

import { Grid, GridItem } from '@chakra-ui/react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(16, 1fr)"
      templateColumns="repeat(17, 1fr)"
      bgColor="pink.50"
      p={4}
      gap={6}
    >
      <GridItem rowSpan={16} colSpan={3} display="flex">
        <Sidebar />
      </GridItem>

      <GridItem rowSpan={1} colSpan={14} display="flex">
        <Header />
      </GridItem>

      <GridItem rowSpan={15} colSpan={14} height="100%">
        <Outlet />
      </GridItem>
    </Grid>
  );
}
