import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@/styled';
import {
  IPaginationWrapper,
  UITableComponent,
  UILink,
  UIEditIcon,
  UITrashIcon,
  IProductResponse,
} from '@zblash/op-web-fronted';
import { DeleteProductPopupComponent } from './delete-product';

/* ProductListComponent Helpers */
interface ProductListComponentProps {
  products: IPaginationWrapper<IProductResponse>;
  onSortTypeChanged: (sortType: 'asc' | 'desc') => void;
  onSortByChanged: (sortBy: string) => void;
  onChangePage: (pageIndex: number) => void;
  onDelete: (itemId: string) => void;
  sortObject?: { sortName: string; sortType: 'asc' | 'desc' };
}

/* ProductListComponent Constants */

/* ProductListComponent Styles */
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ProductListComponent Component  */
function ProductListComponent(props: React.PropsWithChildren<ProductListComponentProps>) {
  /* ProductListComponent Variables */
  const { t } = useTranslation();
  const [isDeletePopupShowing, setDeletePopupShowing] = React.useState(false);
  const [selectedProductForDelete, setSelectedProductForDelete] = React.useState<IProductResponse>();
  /* ProductListComponent Callbacks */

  /* ProductListComponent Lifecycle  */

  return (
    <>
      <UITableComponent
        columns={[
          {
            Header: t('common.id'),
            accessor: 'id',
            sort: true,
            sortName: 'id',
            sortType: props.sortObject && props.sortObject.sortName === 'id' ? props.sortObject.sortType : 'desc',
          },
          {
            Header: t('common.product-name'),
            accessor: 'name',
            sort: true,
            sortName: 'id',
            sortType: props.sortObject && props.sortObject.sortName === 'name' ? props.sortObject.sortType : 'desc',
          },
          {
            Header: t('common.categoryName'),
            accessor: 'categoryName',
          },
          {
            Header: t('common.barcode'),
            accessor: 'barcode',
            customRenderer: (item: IProductResponse) => item.barcodeList[0],
          },
          {
            Header: t('common.isActive'),
            accessor: 'active',
            sortName: 'id',
            sortType: props.sortObject && props.sortObject.sortName === 'active' ? props.sortObject.sortType : 'desc',
            customRenderer: (item: IProductResponse) => t(`common.${item.active ? 'active' : 'deActive'}`).toString(),
          },
          {
            Header: t('common.tax'),
            accessor: 'tax',
          },
          {
            Header: t('common.commission'),
            accessor: 'commission',
          },
          {
            Header: '',
            accessor: 'operations',
            customRenderer: (item: IProductResponse) => (
              <StyledActionsWrapper>
                <UITrashIcon
                  color="#842029"
                  className="mr-3 cursor-pointer"
                  size={16}
                  onClick={() => {
                    setDeletePopupShowing(true);
                    setSelectedProductForDelete(item);
                  }}
                />

                <UILink to={`/edit-product/${item.id}`}>
                  <UIEditIcon color="#74b126" size={16} />
                </UILink>
              </StyledActionsWrapper>
            ),
          },
        ]}
        data={props.products.values}
        currentPage={props.products.pageNumber}
        onPageChange={props.onChangePage}
        pagination
        showLastOrFirstPage
        showPageSize={7}
        totalPages={props.products.totalPage}
        onSortChange={props.onSortByChanged}
        onSortTypeChange={value => props.onSortTypeChanged(value)}
      />
      <DeleteProductPopupComponent
        isOpened={isDeletePopupShowing}
        product={selectedProductForDelete}
        onAccept={(itemId: string) => {
          props.onDelete(itemId);
          setDeletePopupShowing(false);
        }}
        onShowingChanged={(showing: boolean) => {
          setDeletePopupShowing(showing);
        }}
      />
    </>
  );
}
const PureProductListComponent = React.memo(ProductListComponent);

export { PureProductListComponent as ProductListComponent };
