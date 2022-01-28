import * as React from 'react';
import { ObligationComponent } from '@/components/page-components/obligation';
import { AnnouncementComponent, UIContainer, DaysOfWeek, SearchComponent } from '@zblash/op-web-fronted';
import DatePicker from 'react-datepicker';
import styled, { css } from 'styled-components';

/* AdminHome Helpers */
interface AdminHomeProps {}

/* AdminHome Constants */
const StyledDatePickerWrapper = styled.div`
  .datePickerInput {
    width: 100%;
    min-height: 38px;
    height: calc(1.5 em + 0.75 rem + 2 px);
    padding: 0.375 rem 0.75 rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #1d1d1d;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid #dee2e6;
    border-radius: 0;
  }
  .react-datepicker__close-icon::after {
    background-color: red;
  }
`;

/* AdminHome Styles */

/* AdminHome Component  */
function AdminHome(props: React.PropsWithChildren<AdminHomeProps>) {
  /* AdminHome Variables */
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  /* AdminHome Callbacks */
  const onDatesChanged = React.useCallback(dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }, []);
  /* AdminHome Lifecycle  */

  return (
    <>
      <UIContainer></UIContainer>
    </>
  );
}
const PureAdminHome = React.memo(AdminHome);

export { PureAdminHome as AdminHome };
