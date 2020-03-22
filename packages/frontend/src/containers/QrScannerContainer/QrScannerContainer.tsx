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
export const QrScannerContainer = (props: Props) => {
  const orderId = props.match.params.id;
  const [qrCode, setQrCode] = React.useState("884d0801");

  // 884d0801

  const handleError = error => console.log(error);
  const handleScan = data => {
    if (data) {
      console.log(data);
      setQrCode(data);
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
      {qrCode ? <OrderModalSummary qrCode={qrCode} /> : null}
    </>
  );
};
