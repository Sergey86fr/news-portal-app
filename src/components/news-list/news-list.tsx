import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  loadNewsForMonth,
  resetLastFetched,
  setCurrentDate,
} from "../../store/news-slice";
import { subMonths } from "date-fns";
import DateSeparator from "../date-separator/date-separator";
import NewsItem from "../news-item/news-item";
import cn from "classnames";
import styles from "./news-list.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, currentDate, loading, error, lastFetchedMonth } =
    useAppSelector((state) => state.news);

  useEffect(() => {
    const dateObj = new Date(currentDate);
    const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;

    if (lastFetchedMonth !== monthKey) {
      dispatch(loadNewsForMonth(currentDate));
    }
  }, [currentDate, dispatch, lastFetchedMonth]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        !error
      ) {
        const dateObj = new Date(currentDate);
        const newDate = subMonths(dateObj, 1);

        if (newDate <= new Date()) {
          dispatch(setCurrentDate(newDate.toISOString()));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentDate, loading, error, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetLastFetched());
    };
  }, [dispatch]);

  const sortedDates = Object.keys(items)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .filter((date) => items[date].length > 0);

  return (
    <div className={cn(styles.list)}>
      {error && <div>{error}</div>}

      {sortedDates.map((date) => (
        <div className={cn(styles.blockNews)} key={date}>
          <DateSeparator date={new Date(date)} />
          {items[date].map((item) => (
            <NewsItem key={item.web_url} item={item} />
          ))}
        </div>
      ))}
      <div className={cn(styles.loading)}>
        {loading && <CircularProgress />}
      </div>

      {!loading && sortedDates.length === 0 && !error && (
        <div>No news found for this period</div>
      )}
    </div>
  );
};

export default NewsList;
