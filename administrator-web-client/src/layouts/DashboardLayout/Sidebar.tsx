import React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Heading, Icon, Text } from '@chakra-ui/react';

import { navItems } from '../../constants/layouts/DashboardLayout';
import { convertToTitleCase } from '../../utils';

export function Sidebar() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      boxShadow="0 0 12px rgba(0, 0, 0, 0.15)"
      flex={1}
      pl={6}
      py={6}
      bgColor="gray.50"
      borderRadius={12}
      gap={12}
    >
      <NavLink to="">
        <Heading letterSpacing={-2} fontWeight={900}>
          e-tutor
        </Heading>
      </NavLink>

      <Box display="flex" flexDirection="column" gap={12}>
        {React.Children.toArray(
          navItems.map(({ section, data, prefix }) => (
            <Box display="flex" flexDirection="column" gap={2} ml={2}>
              <Heading size="md" fontWeight={700}>
                {section}
              </Heading>

              <Box display="flex" flexDirection="column" gap={2} ml={2}>
                {data.map(({ path, icon }) => {
                  const title = convertToTitleCase(path.replaceAll('-', ' '));

                  return (
                    <NavLink
                      key={`${section}_${title}`}
                      to={`${prefix}/${path}`}
                      style={({ isActive }) => ({
                        padding: '8px 16px',
                        borderRight: '8px solid transparent',
                        borderRightColor: isActive ? '#9B2C2C' : 'transparent',
                        color: isActive ? '#9B2C2C' : 'gray',
                        transition: 'ease-in-out all 0.1s',
                        borderRadius: '12px 0 0 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      })}
                    >
                      <Icon as={icon} />
                      <Text>{title}</Text>
                    </NavLink>
                  );
                })}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
