import React from 'react';
import { DatePicker, Button, InputGroup, Input, Stack } from 'rsuite';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isBefore from 'date-fns/isBefore';
import {
  FaCalendar,
  FaCalendarWeek,
  FaCalendarDay,
  FaCalendarCheck,
  FaClock
} from 'react-icons/fa';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        DatePicker,
        Button,
        InputGroup,
        Input,
        Stack,
        addDays,
        subDays,
        isBefore,
        FaCalendar,
        FaCalendarWeek,
        FaCalendarDay,
        FaCalendarCheck,
        FaClock,
        BsCalendar2MonthFill
      }}
      sandboxDependencies={{ 'date-fns': '^2.13.0' }}
    />
  );
}
