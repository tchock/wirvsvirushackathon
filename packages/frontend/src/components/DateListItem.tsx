import React from "react";
import { IconListItem } from "./IconListItem";
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import { FormattedDate } from "react-intl";

export function DateListItem({ text, date }) {
  return <IconListItem icon={CalendarIcon}>
    {text}:<br/>
    <FormattedDate
      value={date}
      year="numeric"
      month="long"
      day="2-digit"
      hour="numeric"
      minute="numeric" 
      hour12={false} 
    />
  </IconListItem>
}
