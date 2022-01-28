import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { ActivityType, IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@zblash/op-web-fronted';

export interface UseGetAllCreditActivitiesProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  customerId?: string;
  merchantId?: string;
  activityType?: ActivityType;
  startDate?: Date;
  lastDate?: Date;
}

async function getGetAllCreditActivities(s: UseGetAllCreditActivitiesProps) {
  return paginatedQueryEndpoints.getAllCreditActivities(s);
}

export const useGetAllCreditActivities = (s: UseGetAllCreditActivitiesProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    [
      'all-credit-activities',
      s.pageNumber,
      s.sortBy,
      s.sortType,
      s.customerId,
      s.merchantId,
      s.activityType,
      s.startDate,
      s.lastDate,
    ],
    () => getGetAllCreditActivities(s),
    {
      onError: (error: IExceptionResponse) => {
        alert.show(`${t(`${error.message}`)}`, {
          type: 'error',
        });
      },
    },
  );
};
