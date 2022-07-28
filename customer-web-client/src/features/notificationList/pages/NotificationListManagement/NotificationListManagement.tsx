import { useContext, useState } from 'react';
import { RiNotification2Line } from 'react-icons/ri';
import { useInfiniteQuery } from 'react-query';

import { useAuth0 } from '@auth0/auth0-react';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Indicator,
  Loader,
  Text,
  Title,
} from '@mantine/core';

import { useAppSelector } from '../../../../app/hooks';
import { ApplicationContext } from '../../../../contexts';
import { useAppPagination } from '../../../../hooks';
import { userDetailsSelector } from '../../../user/userSlice';
import { NotificationCardView } from '../../components/NotificationCardView';
import { useViewNotificationList } from '../../hooks';
import styles from './NotificationListManagement.module.css';

export function NotificationListManagement() {
  const { notificationsService } = useContext(ApplicationContext);

  const { isAuthenticated } = useAuth0();
  const [opened, setOpened] = useState(false);

  const { mutateAsync: viewList } = useViewNotificationList();

  const [viewedNotifications, setViewedNotifications] = useState<Set<string>>(
    new Set(),
  );

  const { id: userId } = useAppSelector(userDetailsSelector);
  const {
    pageNumber,
    pageSize,
    onPaginationMetaChange,
    onPageChange,
    totalPage,
  } = useAppPagination();

  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    ['users', userId, 'notifications'],
    async ({ pageParam = pageNumber, signal }) => {
      const { data, pagination } = await notificationsService.listForUser(
        userId,
        { pageNumber: pageParam, pageSize },
        signal,
      );

      onPaginationMetaChange(pagination);
      return data;
    },
  );

  const toggle = () => setOpened((prev) => !prev);

  const renderNotificationButton = () => (
    <ActionIcon
      radius="xl"
      size="lg"
      variant="light"
      onClick={() => {
        toggle();
        setViewedNotifications(() => new Set());
      }}
      style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <RiNotification2Line />
    </ActionIcon>
  );

  const onNotificationHover = (id: string) => {
    setViewedNotifications((prev) => prev.add(id));
  };

  const onDrawerClose = async () => {
    toggle();

    let ids: string[] = [];
    viewedNotifications.forEach((n) => (ids = [...ids, n]));
    if (!ids.length) return;
    await viewList(ids);
  };

  const notificationList = data?.pages?.flat();
  const unreadNotifications = notificationList?.filter((n) => !n.viewed);
  const hasNextPage = pageNumber < totalPage;
  return (
    <>
      {unreadNotifications?.length ? (
        <Indicator label={unreadNotifications?.length} size={12}>
          {renderNotificationButton()}
        </Indicator>
      ) : (
        renderNotificationButton()
      )}

      <Drawer
        opened={opened && isAuthenticated}
        onClose={onDrawerClose}
        title={
          <Title order={3} style={{ fontWeight: 900 }}>
            Notifications
          </Title>
        }
        padding="xl"
        size="lg"
        position="right"
        className={styles.drawer}
        zIndex={99}
      >
        {notificationList?.length ? (
          <Box className={styles.container}>
            {notificationList?.map((notification) => (
              <NotificationCardView
                key={notification.id}
                notification={notification}
                onHover={onNotificationHover}
              />
            ))}

            {isFetching && <Loader variant="dots" color="black" />}

            {hasNextPage && (
              <Button
                onClick={() => {
                  const currentPage = pageNumber + 1;
                  onPageChange(currentPage);
                  fetchNextPage({ pageParam: currentPage });
                }}
                size="xs"
              >
                More
              </Button>
            )}
          </Box>
        ) : (
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Text size="lg">Currently, there is no notifications.</Text>
          </Box>
        )}
      </Drawer>
    </>
  );
}
