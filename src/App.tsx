import React, { useState } from "react";
import { useAppDispatch } from "./store/store";
import { addNewItems } from "./store/news-slice";
import { fetchNews } from "./api/news-api";
import { useInterval } from "./hooks/useInterval";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import NewsList from "./components/news-list/news-list";
import "./App.css";
import Divider from "./components/divider/divider";
import Footer from "./components/footer/footer";


const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  useInterval(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    fetchNews(year, month)
      .then((news) => {
        const now = new Date();
        const thirtySecondsAgo = new Date(now.getTime() - 30000);

        const newItems = news.filter((item) => {
          const itemDate = new Date(item.pub_date);
          return itemDate > thirtySecondsAgo;
        });

        if (newItems.length > 0) {
          dispatch(addNewItems(newItems));
        }
      })
      .catch((error) => {
        console.error("Error fetching new news:", error);
      });
  }, 30000);

  return (
    <div className="container">
      <Header onMenuClick={() => setMenuOpen((prev) => !prev)} />
      <Divider />
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <NewsList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
