import './ScheduleListManagement.css';

import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import {
  Calendar,
  View,
  momentLocalizer,
  stringOrDate,
} from 'react-big-calendar';
import { useQuery } from 'react-query';

import { Box } from '@mantine/core';

import { ScalingDotsWave } from '../../../../components/ScalingDotsWave';
import { Wrapper } from '../../../../components/Wrapper';
import { ApplicationContext } from '../../../../contexts';
import { Session } from '../../../../models/session';
import styles from './ScheduleListManagement.module.css';

type Props = { resource: string; ownerId: string };

type DateRange = { start: stringOrDate; end: stringOrDate };

const localizer = momentLocalizer(moment);

export function ScheduleListManagement({ resource, ownerId }: Props) {
  const { sessionsService } = useContext(ApplicationContext);

  const [range, setRange] = useState<{
    start: stringOrDate;
    end: stringOrDate;
  }>({
    start: moment().startOf('month').startOf('week').toDate(),
    end: moment().endOf('month').endOf('week').toDate(),
  });

  const { data, isFetching, isError } = useQuery(
    [resource, ownerId, 'sessions', range.start, range.end],
    ({ signal }) =>
      sessionsService.getListForTarget(
        ownerId,
        new Date(range.start),
        new Date(range.end),
        'owner',
        signal
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const onRangeChange = (range: Date[] | DateRange, _: View | undefined) => {
    if ((range as DateRange)?.start) {
      setRange(range as any);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Box className={styles.calendar}>
        <Wrapper<Session[]>
          type="page"
          loading={isFetching}
          hasError={isError}
          data={data}
          noLoadingComponent
        >
          <Calendar
            localizer={localizer}
            events={(data || []).map(({ course, from, to }) => ({
              title: `${course.name || course.subjectName}`,
              start: from,
              end: to,
            }))}
            onRangeChange={onRangeChange}
            startAccessor="start"
            endAccessor="end"
            style={{ flex: 1 }}
            views={['month', 'agenda']}
          />
        </Wrapper>

        {isFetching && <ScalingDotsWave />}
      </Box>
    </motion.div>
  );
}
