import React from "react";
import styles from "./header.module.css";
import cn from "classnames";
import { Menu } from "lucide-react";

interface IHeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<IHeaderProps> = ({ onMenuClick }) => (
  <header className={cn(styles.header)}>
    <button onClick={onMenuClick} className={cn(styles.button)}>
      <Menu className={cn(styles.burgerMenu)} />
    </button>
    <h2 className={cn(styles.title)}>BESIDER</h2>
  </header>
);

export default Header;
