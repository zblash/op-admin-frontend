import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, paginatedQueryEndpoints, useAlert } from '@zblash/op-web-fronted';

export interface UseGetAllUserCreditsProps {
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  userName?: string;
  userId?: string;
}

async function getAllUserCredits(s: UseGetAllUserCreditsProps) {
  return paginatedQueryEndpoints.getAllUserCredits(s);
}

export const useGetAllUserCredits = (s: UseGetAllUserCreditsProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    ['all-users-credits', s.pageNumber, s.sortBy, s.sortType, s.userName, s.userId],
    () => getAllUserCredits(s),
    {
      onError: (error: IExceptionResponse) => {
        alert.show(`${t(`${error.message}`)}`, {
          type: 'error',
        });
      },
    },
  );
};
