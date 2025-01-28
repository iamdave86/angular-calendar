import { format } from 'date-fns';

import { DATE_FORMAT } from '@constants/date.constants';

export const formatDate = (date: Date): string => {
  return format(date, DATE_FORMAT);
};
