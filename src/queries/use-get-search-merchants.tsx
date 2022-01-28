import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, searchQueryKeys } from '@zblash/op-web-fronted';

async function getSearchMerchants(merchantName: string) {
  return queryEndpoints.getSearchMerchants({ merchantName });
}

export const useGetSearchMerchants = (merchantName: string, isEnabled: boolean) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(searchQueryKeys.customer(merchantName), () => getSearchMerchants(merchantName), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
    enabled: isEnabled,
  });
};
