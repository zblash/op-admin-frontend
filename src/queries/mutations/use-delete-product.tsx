import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { mutationEndPoints, IExceptionResponse, useAlert, IProductResponse } from '@zblash/op-web-fronted';

async function deleteProduct(id: string) {
  return mutationEndPoints.removeProduct({ id });
}

export const useDeleteProduct = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteProduct(id), {
    onSuccess: (data: IProductResponse) => {
      queryClient.invalidateQueries('all-product');
      alert.show(`${t('Ürün Tanımı Başarıyla Kaldırıldı')}`, {
        type: 'success',
      });
    },
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
