import styles from "./divider.module.css"
import cn from "classnames"

interface IProps {
    className?:string;
}

const Divider = ({className}: IProps) => {
    return (
        <div className={cn(styles.divider, className || '')}></div>
    )
}
export default Divider