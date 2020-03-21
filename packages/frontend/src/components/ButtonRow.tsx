import React from "react";
import Box from "@material-ui/core/Box";

export function ButtonRow({ children }) {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <Box display="flex" justifyContent="flex-end" mx={-1}>
      {childrenArray.map(child => (
        <Box mx={1}>{child}</Box>
      ))}
    </Box>
  );
}
