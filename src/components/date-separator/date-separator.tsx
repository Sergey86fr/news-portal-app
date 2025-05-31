import React from "react";
import { format } from "date-fns";
import styles from "./date-separator.module.css";
import cn from "classnames";

interface IDateSeparatorProps {
  date: Date;
}

const DateSeparator: React.FC<IDateSeparatorProps> = ({ date }) => (
  <span className={cn(styles.newsDate)}>
    News for {format(date, "dd.MM.yyyy")}
  </span>
);

export default DateSeparator;
