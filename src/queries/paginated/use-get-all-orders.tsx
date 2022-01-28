import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, TOrderStatus, paginatedQueryEndpoints, useAlert } from '@zblash/op-web-fronted';

export interface UseGetAllOrdersProps {
  customerId?: string;
  customerName?: string;
  merchantId?: string;
  merchantName?: string;
  startDate?: string;
  endDate?: string;
  pageNumber: number;
  sortBy?: string;
  sortType?: string;
  status?: TOrderStatus;
}

async function getAllOrders(s: UseGetAllOrdersProps) {
  return paginatedQueryEndpoints.getAllOrders(s);
}

export const useGetAllOrders = (s: UseGetAllOrdersProps) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(
    ['all-orders', s.pageNumber, s.sortBy, s.sortType, s.customerId, s.merchantId, s.startDate, s.endDate, s.status],
    () => getAllOrders(s),
    {
      onError: (error: IExceptionResponse) => {
        alert.show(`${t(`${error.message}`)}`, {
          type: 'error',
        });
      },
    },
  );
};
