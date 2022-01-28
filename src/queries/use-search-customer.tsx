import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, searchQueryKeys } from '@zblash/op-web-fronted';

async function getSearchCustomers(customerName: string) {
  return queryEndpoints.getSearchCustomers({ customerName });
}

export const useGetSearchCustomers = (customerName: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(searchQueryKeys.customer(customerName), () => getSearchCustomers(customerName), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
