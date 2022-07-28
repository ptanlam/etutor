import React from 'react';

import { Box, Radio, RadioGroup, Select } from '@mantine/core';

import { CourseType, Subject } from '../../../../models/course';
import styles from './TutorCourseListFilteringPanel.module.css';

type Props = {
  subjectList: Subject[];
  selectedCourseType: string;
  onSubjectIdChange: (id: string) => void;
  onCourseTypeChange: (type: CourseType) => void;
};

export function TutorCourseListFilteringPanel({
  subjectList,
  selectedCourseType,
  onSubjectIdChange,
  onCourseTypeChange,
}: Props) {
  return (
    <Box className={styles.container}>
      <RadioGroup
        orientation="vertical"
        label="Type"
        defaultValue={selectedCourseType}
        onChange={(value) => onCourseTypeChange(value as CourseType)}
      >
        <Radio value="online" label="Online" />
        <Radio value="oneonone" label="One on one" />
      </RadioGroup>

      <Select
        label="Subject"
        onChange={(value) => onSubjectIdChange(value ?? '')}
        data={(subjectList ?? []).map(({ name, id }) => ({
          label: name,
          value: id,
        }))}
      />
    </Box>
  );
}
