import React from 'react';
import { ModalComponent, IProductResponse } from '@zblash/op-web-fronted';

interface DeleteProductPopupComponentProps {
  isOpened: boolean;
  product?: IProductResponse;
  onAccept: (productId: string) => void;
  onShowingChanged: (showing: boolean) => void;
}

function DeleteProductPopupComponent(props: React.PropsWithChildren<DeleteProductPopupComponentProps>) {
  const onAccept = React.useCallback(() => {
    props.onAccept(props.product.id);
  }, [props]);

  return (
    <ModalComponent
      isShowing={props.isOpened}
      showAcceptButton
      showCloseButton
      onAccept={onAccept}
      onClose={() => props.onShowingChanged(false)}
    >
      <p>Sectiginiz {props.product?.name} urununu silmeyi onayliyor musunuz?</p>
    </ModalComponent>
  );
}

export { DeleteProductPopupComponent };
