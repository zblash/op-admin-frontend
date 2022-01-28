/* eslint-disable dot-notation */
import * as React from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { useLoadingContext } from '@/contexts/loading-context';
import { useGetAllOrders } from '@/queries/paginated/use-get-all-orders';
import { UIContainer, IOrder, useOrdersFilterHOC, useOrdersListHOC } from '@zblash/op-web-fronted';
import { useUpdateOrderMutation } from '@/queries/mutations/use-update-order';
import { useGetSearchCustomers } from '@/queries/use-search-customer';
import { useGetSearchMerchants } from '@/queries/use-get-search-merchants';
/*
  OrdersPage Helpers
*/
interface OrdersPageProps {}
interface RouteParams {
  userId: string;
}
/*
  OrdersPage Colors // TODO : move theme.json
*/
/*
  OrdersPage Strings
*/

/*
  OrdersPage Styles
*/

const OrdersPage: React.SFC<OrdersPageProps> = props => {
  const loading = useLoadingContext();
  const { t } = useTranslation();
  const locationState = useLocation().state;
  const handlePdfBtnClick = React.useCallback(
    (e: IOrder) => {
      loading.show();
      // ApiCall.getFile(`/orders/report/pdf/${e.id}`, 'application/pdf')
      //   .then(data => {
      //     const url = window.URL.createObjectURL(data);
      //     const link = document.createElement('a');
      //     link.href = url;
      //     link.setAttribute('download', `order/${e.id}.pdf`);
      //     document.body.appendChild(link);
      //     link.click();
      //     link.parentNode.removeChild(link);
      //   })
      //   .finally(() => {
      //     loading.hide();
      //   });
    },
    [loading],
  );
  const {
    customerId,
    merchantId,
    customerName,
    merchantName,
    isCustomerSearching,
    isMerchantSearching,
    startDate,
    endDate,
    status,
    renderOrdersFilter,
  } = useOrdersFilterHOC({
    showCustomerFilter: true,
    showMerchantFilter: true,
    givenStatus: locationState && locationState['status'] ? locationState['status'] : undefined,
  });

  const { sortBy, sortType, allOrdersPageNumber, renderOrderList } = useOrdersListHOC({
    showCustomerName: true,
    showMerchantName: true,
    handlePdfBtnClick,
  });

  const { data: searchCustomers, error: customerSearchError } = useGetSearchCustomers(
    customerName,
    isCustomerSearching,
  );
  const { data: searchMerchants, error: merchantSearchError } = useGetSearchMerchants(
    merchantName,
    isMerchantSearching,
  );

  const { data: orders, isLoading, error } = useGetAllOrders({
    pageNumber: allOrdersPageNumber,
    sortBy,
    sortType,
    customerId,
    merchantId,
    startDate,
    endDate,
    status,
  });

  const { mutate: updateOrder } = useUpdateOrderMutation();

  const __ = (
    <UIContainer>
      {!isLoading && !error && !merchantSearchError && !customerSearchError && (
        <Row>
          <Col xl={12} lg={12} sm={12} md={12}>
            <h3>{t('common.orders')}</h3>
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            {renderOrdersFilter(searchCustomers, searchMerchants, customerSearchError, merchantSearchError)}
          </Col>
          <Col xl={12} lg={12} sm={12} md={12}>
            {renderOrderList(orders, updateOrder)}
          </Col>
        </Row>
      )}
    </UIContainer>
  );

  /*
  OrdersPage Lifecycle
  */

  /*
  OrdersPage Functions
  */

  return __;
};

const _OrdersPage = OrdersPage;

export { _OrdersPage as OrdersPage };
