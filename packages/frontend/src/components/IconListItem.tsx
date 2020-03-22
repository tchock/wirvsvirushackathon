import { Typography, Box } from "@material-ui/core";
import React from "react";

export function IconListItem({ icon: Icon, className, children }) {
  return (
    <Box mb={1.25} display="flex" className={className}>
      <Box mr={1}>
        <Icon color="secondary" />
      </Box>
      <Typography color="textSecondary">{children}</Typography>
    </Box>
  );
}
