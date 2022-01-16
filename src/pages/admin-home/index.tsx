import * as React from 'react';
import { ObligationComponent } from '@/components/page-components/obligation';
import { AnnouncementComponent, UIContainer, DaysOfWeek, SearchComponent } from '@onlineplasiyer/op-web-fronted';
import { useGetOrderSummary } from '@/queries/use-get-order-summary';
import { useGetAnnouncements } from '@/queries/use-get-announcements';
import { useGetObligationTotal } from '@/queries/use-get-obligation-total';
import { useGetShippingDays } from '@/queries/use-get-shipping-days';
import { ShippingDaysComponent } from '@/components/page-components/shipping-days';
import { useGetStatesForShippingDays } from '@/queries/use-get-states-for-shipping-days';
import { useAddShippingDays } from '@/queries/mutations/use-add-shipping-days';
import { useEditShippingDays } from '@/queries/mutations/use-edit-shipping-days';
import { OrdersSummaryComponent } from '@/components/page-components/orders-summary';
import { Row, Col } from 'react-bootstrap';
import { useGetSearchCustomers } from '@/queries/use-search-customer';

/* MerchantHome Helpers */
interface MerchantHomeProps {}

/* MerchantHome Constants */

/* MerchantHome Styles */

/* MerchantHome Component  */
function MerchantHome(props: React.PropsWithChildren<MerchantHomeProps>) {
  /* MerchantHome Variables */
  const [customerName, setCustomerName] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const { data: searchCustomers, isLoading, error } = useGetSearchCustomers(customerName, isSearching);

  /* MerchantHome Callbacks */
  const onSearchType = React.useCallback((e: string) => {
    setCustomerName(e);
    setIsSearching(true);
  }, []);
  /* MerchantHome Lifecycle  */

  return (
    <>
      {!error && (
        <UIContainer>
          <SearchComponent
            inputName="customer-name-search"
            labelKey="Musteri"
            searchKey={customerName}
            onTypeCallback={onSearchType}
            resultList={[
              { id: '1', key: 'deneme' },
              { id: '2', key: 'deneme' },
              { id: '3', key: 'deneme' },
              { id: '4', key: 'deneme' },
              { id: '5', key: 'deneme' },
            ]}
          />
        </UIContainer>
      )}
    </>
  );
}
const PureMerchantHome = React.memo(MerchantHome);

export { PureMerchantHome as MerchantHome };
