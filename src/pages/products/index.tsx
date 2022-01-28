import * as React from 'react';
import styled from '@/styled';
import { UIContainer } from '@zblash/op-web-fronted';
import { ProductListComponent } from '@/components/page-components/product-list';
import { useGetAllProducts } from '@/queries/paginated/use-get-all-products';
import { useDeleteProduct } from '@/queries/mutations/use-delete-product';
import { useProductsFilterHOC } from '@/hooks/page-hooks/product-list-filter';
/* ProductsPage Helpers */
interface ProductsPageProps {}

/* ProductsPage Constants */

/* ProductsPage Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

/* ProductsPage Component  */
function ProductsPage(props: React.PropsWithChildren<ProductsPageProps>) {
  /* ProductsPage Variables */
  const [productsPageNumber, setProductsPageNumber] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<string>('id');
  const [sortType, setSortType] = React.useState<'asc' | 'desc'>('desc');

  const { selectedCategoryId, merchantId } = useProductsFilterHOC();
  const { mutate: deleteProductMutation } = useDeleteProduct();
  const { data: products, isLoading: productLoading, error } = useGetAllProducts({
    pageNumber: productsPageNumber,
    sortBy,
    sortType,
    categoryId: selectedCategoryId,
    userId: merchantId,
  });

  /* ProductsPage Callbacks */
  const onChangePage = React.useCallback((pageIndex: number) => {
    setProductsPageNumber(pageIndex);
  }, []);

  const onDelete = React.useCallback(
    (itemId: string) => {
      deleteProductMutation(itemId);
    },
    [deleteProductMutation],
  );
  /* ProductsPage Lifecycle  */

  return (
    <UIContainer>
      {!productLoading && !error && (
        <StyledPageContainer>
          <StyledPageHeader>
            <h3>Urunlerim</h3>
          </StyledPageHeader>

          <ProductListComponent
            products={products}
            onChangePage={onChangePage}
            sortObject={{ sortType, sortName: sortBy }}
            onSortByChanged={(e: string) => setSortBy(e)}
            onSortTypeChanged={e => setSortType(e)}
            onDelete={(id: string) => {
              onDelete(id);
            }}
          />
        </StyledPageContainer>
      )}
    </UIContainer>
  );
}
const PureProductsPage = React.memo(ProductsPage);

export { PureProductsPage as ProductsPage };
