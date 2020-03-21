import { Typography, Box } from "@material-ui/core";
import React from "react";

export function IconListItem({ icon: Icon, children }) {
  return (
    <Box mb={1.25} display="flex">
      <Box mr={1}>
        <Icon />
      </Box>
      <Typography color="textSecondary">{children}</Typography>
    </Box>
  );
}
