import React from 'react';
import { ResultItem } from '@zblash/op-web-fronted/dist/components/search-component';
import { FiltersComponent, ICategoryResponse } from '@zblash/op-web-fronted';

/* ProductListFilterComponent Helpers */
interface FilterSubmitParams {
  merchantId?: string;
  categoryId?: string;
}

interface ProductListFilterComponentProps {
  categories: ICategoryResponse[];
  selectedMerchant?: ResultItem;
  onSubmit: (e: FilterSubmitParams) => void;
  filteredMerchantList?: Array<ResultItem>;
  onMerchantFilterType?: (key: string) => void;
}
/* ProductListFilterComponent Constants */

/* ProductListFilterComponent Styles */

/* ProductListFilterComponent Component  */
function ProductListFilterComponent(props: React.PropsWithChildren<ProductListFilterComponentProps>) {
  /* ProductListFilterComponent Variables */
  const [merchantId, setMerchantId] = React.useState<string>(props.selectedMerchant ? props.selectedMerchant.id : '');
  const [merchantName, setMerchantName] = React.useState<string>(
    props.selectedMerchant ? props.selectedMerchant.key : '',
  );
  const [selectedCategory, setSelectedCategory] = React.useState<{ value: string; label: string }>();
  const categoryList = React.useMemo(() => {
    return props.categories.map((category: ICategoryResponse) => {
      return {
        value: category.id,
        label: category.name,
      };
    });
  }, [props.categories]);
  /* ProductListFilterComponent Callbacks */

  const handleFilterMerchantChange = React.useCallback(
    (e: string) => {
      setMerchantName(e);
      if (props.onMerchantFilterType) {
        props.onMerchantFilterType(e);
      }
    },
    [props],
  );

  const handleFilter = React.useCallback(() => {
    const filterObj = {
      merchantId,
      categoryId: selectedCategory?.value,
    };
    props.onSubmit(filterObj);
  }, [merchantId, props, selectedCategory]);
  /* ProductListFilterComponent Lifecycle  */

  return (
    <FiltersComponent
      id="products-filter"
      fields={[
        {
          type: 'select',
          input: {
            value: selectedCategory,
            onChange: (e: { value: string; label: string }) => setSelectedCategory(e),
            options: categoryList,
            placeholderKey: 'Secim Yapin',
            labelKey: 'Siparis Durumu',
          },
        },
        {
          type: 'search',
          input: {
            labelKey: 'Satici',
            inputName: 'merchant-filter',
            searchKey: merchantName,
            onTypeCallback: handleFilterMerchantChange,
            onSelectCallback: (x: ResultItem) => {
              setMerchantId(x.id);
            },
            resultList: props.filteredMerchantList,
          },
        },
      ]}
      onSubmit={handleFilter}
    />
  );
}
const PureProductListFilterComponent = React.memo(ProductListFilterComponent);

export { PureProductListFilterComponent as ProductListFilterComponent };
