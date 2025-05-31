import React from "react";
import styles from "./menu.module.css";
import cn from "classnames";
import { X } from "lucide-react";

interface IMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<IMenuProps> = ({ isOpen, onClose }) => (
  <div
    className={cn(styles.menu, {
      [styles.open]: isOpen,
    })}
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>
      <button className={cn(styles.closeBtn)} onClick={onClose}>
        <X />
      </button>
      <ul className={cn(styles.list)}>
        <li>SCIENCE</li>
        <li>GENERAL</li>
        <li>ENTERTAINMENT</li>
        <li>TECHNOLOGY</li>
        <li>BUSINESS</li>
        <li>HEALTH</li>
        <li>SPORTS</li>
      </ul>
    </div>
  </div>
);

export default Menu;
