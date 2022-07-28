import {
  BsCurrencyExchange,
  BsFillFileCheckFill,
  BsGenderAmbiguous,
} from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { GiLevelEndFlag, GiRank3 } from 'react-icons/gi';
import { GoListOrdered } from 'react-icons/go';
import { MdPendingActions } from 'react-icons/md';

const constantListItems = [
  {
    path: 'genders',
    icon: BsGenderAmbiguous,
  },
  {
    path: 'academic-ranks',
    icon: GiRank3,
  },
  {
    path: 'educational-levels',
    icon: GiLevelEndFlag,
  },
  {
    path: 'educational-grades',
    icon: GoListOrdered,
  },
  {
    path: 'currencies',
    icon: BsCurrencyExchange,
  },
];

const tutorListItems = [
  {
    path: 'active',
    icon: FaClipboardList,
  },
  {
    path: 'pending',
    icon: MdPendingActions,
  },
];

const courseListItems = [
  {
    path: 'approved',
    icon: BsFillFileCheckFill,
  },
  {
    path: 'pending',
    icon: MdPendingActions,
  },
];

export const navItems = [
  { section: 'Constants', data: constantListItems, prefix: 'constants' },
  { section: 'Tutors', data: tutorListItems, prefix: 'tutors' },
  { section: 'Courses', data: courseListItems, prefix: 'courses' },
];
