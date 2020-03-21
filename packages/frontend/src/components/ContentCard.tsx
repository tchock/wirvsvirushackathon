import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

export function ContentCard({ children }) {
  return (
    <Box m={1} mb={2}>
      <Paper>
        <Box p={2.5}>{children}</Box>
      </Paper>
    </Box>
  );
}
