import React from "react";
import { Typography } from "@material-ui/core";

export function Message({ title, message }) {
  return <>
    <Typography variant="h5" align="center">{title}</Typography>
    <Typography align="center">{message}</Typography>
  </>
}
