import React from "react";
import type { INewsItem as INewsItemType } from "../../api/news-api";
import Divider from "../divider/divider";
import styles from "./news-item.module.css";
import cn from "classnames";
import { formatDate } from "../../helper/formatted-date";

interface INewsItemProps {
  item: INewsItemType;
}

const NewsItem: React.FC<INewsItemProps> = ({ item }) => {
  return (
    <div
      className={cn(styles.item)}
      onClick={() => window.open(item.web_url, "_blank")}
    >
      <h3 className={cn(styles.title)}>{item.source}</h3>
      <div className={cn(styles.content)}>
        <div className={cn(styles.imgWrapper)}>
          {item.multimedia?.length && (
            <img
              src={`https://www.nytimes.com/${item.multimedia[0].url}`}
              alt={item.abstract}
              className={cn(styles.imgNews)}
            />
          )}
        </div>
        <div>
          <div className={cn(styles.description)}>{item.abstract}</div>
          <span className={cn(styles.dateItem)}>
            {formatDate(item.pub_date)}
          </span>
        </div>
      </div>
      <Divider className={cn(styles.divider)} />
    </div>
  );
};

export default NewsItem;
