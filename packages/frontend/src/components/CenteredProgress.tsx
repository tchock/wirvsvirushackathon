import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

export function CenteredProgress() {
  return (
    <Box display="flex" justifyContent="center" py="3">
      <CircularProgress />
    </Box>
  );
}
