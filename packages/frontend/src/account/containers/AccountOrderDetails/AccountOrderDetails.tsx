import React from "react";
import QRCode from "qrcode.react";
import { ContentCard } from "../../../components/ContentCard";
import { Typography, Button, Box } from "@material-ui/core";

export function AccountOrderDetails() {
  return (
    <ContentCard>
      <Typography variant="h5" paragraph>
        Order 1234
      </Typography>
      <Typography paragraph>
        Pick up your order with the above ID or this pick up code
      </Typography>
      <Box my={3} display="flex" justifyContent="center">
        <QRCode size={280} value="1234" />
      </Box>

      <Typography paragraph>The order has been paid already</Typography>

      <Button fullWidth color="primary">
        Share my pick up code
      </Button>
    </ContentCard>
  );
}
