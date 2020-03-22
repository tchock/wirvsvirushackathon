import * as React from "react";
import QrReader from "react-qr-reader";
import { getSpacing } from "../../theme";
import styled from "styled-components";
import { OrderModalSummary } from "./OrderModalSummary/OrderModalSummary";

type Props = {
  match: any;
};

const QrContainer = styled.div`
  margin: 0 -${getSpacing(2)}px;
`;
export const PickUpOrderContainer = (props: Props) => {
  const orderId = props.match.params.id;
  const [showModal, setShowModal] = React.useState(false);

  const handleError = error => console.log(error);
  const handleScan = data => {
    if (data) {
      setShowModal(true);
    }
  };

  return (
    <>
      <QrContainer>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </QrContainer>
      {showModal ? <OrderModalSummary orderId={orderId} /> : null}
    </>
  );
};
