import React from "react";
import { ContentCard } from "../../components/ContentCard";
import { Typography, Button } from "@material-ui/core";
import { ButtonRow } from "../../components/ButtonRow";

export function Confirmation() {
  return (
    <ContentCard>
      <Typography variant="h5" paragraph>
        Your order has been placed
      </Typography>
      <Typography paragraph>
        You will get a confirmation mail after the shop accepted it
      </Typography>
      <ButtonRow>
        <Button color="primary">Order from another shop</Button>
        <Button variant="contained" color="primary">
          Cool, thanks
        </Button>
      </ButtonRow>
    </ContentCard>
  );
}
