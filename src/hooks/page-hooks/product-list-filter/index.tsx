import * as React from 'react';
import { ProductListFilterComponent } from '@/components/page-components/product-list/product-list-filter';
import { ICommonMerchantResponse, FilterWrapperComponent } from '@zblash/op-web-fronted';
import { useGetSearchMerchants } from '@/queries/use-get-search-merchants';
import { useGetCategories } from '@/queries/use-get-categories';

export function useProductsFilterHOC() {
  const [merchantName, setMerchantName] = React.useState('');
  const [merchantId, setMerchantId] = React.useState<string>();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>();
  const [isMerchantSearching, setIsMerchantSearching] = React.useState(false);

  const { data: searchMerchantsResponse, error: merchantSearchError } = useGetSearchMerchants(
    merchantName,
    isMerchantSearching,
  );

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategories(
    { type: 'all' },
    true,
  );

  const onFilterSubmit = React.useCallback((e: { merchantId?: string; categoryId?: string }) => {
    if (e.merchantId) {
      setMerchantId(e.merchantId);
    }
    if (e.categoryId) {
      setSelectedCategoryId(e.categoryId);
    }
  }, []);

  const onMerchantSearchType = React.useCallback((e: string) => {
    setMerchantName(e);
    setIsMerchantSearching(true);
  }, []);

  const renderProductsFilter = React.useCallback(() => {
    return (
      <>
        {!merchantSearchError && !categoriesError && !categoriesLoading && (
          <FilterWrapperComponent>
            <ProductListFilterComponent
              categories={categories}
              selectedMerchant={{ id: merchantId, key: merchantName }}
              onMerchantFilterType={onMerchantSearchType}
              onSubmit={onFilterSubmit}
              filteredMerchantList={
                searchMerchantsResponse && searchMerchantsResponse.length > 0
                  ? searchMerchantsResponse.map((m: ICommonMerchantResponse) => {
                      return { id: m.merchantId, key: m.merchantName };
                    })
                  : []
              }
            />
          </FilterWrapperComponent>
        )}
      </>
    );
  }, [
    categories,
    categoriesError,
    categoriesLoading,
    merchantId,
    merchantName,
    merchantSearchError,
    onFilterSubmit,
    onMerchantSearchType,
    searchMerchantsResponse,
  ]);

  return {
    selectedCategoryId,
    merchantId,
    renderProductsFilter,
  };
}
