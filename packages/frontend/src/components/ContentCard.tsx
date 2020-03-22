import React, { ReactNode } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

export type ContentCardProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export function ContentCard({ children, header, footer }: ContentCardProps) {
  return (
    <Box m={1} mb={3}>
      <Paper elevation={6}>
        { header ? header : <Box bgcolor="primary.main" height={2} />}
        <Box p={2.5}>{children}</Box>
        {footer}
      </Paper>
    </Box>
  );
}
