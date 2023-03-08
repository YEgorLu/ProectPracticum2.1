import {Link} from "react-router-dom";
import '../../../styles/pagination/pagButton.css';
import {FC, MouseEventHandler} from "react";

type pagButtonProps = {
    children: number,
    onClick: MouseEventHandler<HTMLElement>,
    isActive: () => boolean
}

export const PagButton: FC<pagButtonProps> = ({children, onClick, isActive}: pagButtonProps) => {
    const active: boolean = isActive();
    const addCls = active ? ' active' : '';
    const onclick = active ? undefined : onClick;

    return (
        <li className={'pag-item' + addCls} onClick={onclick}>
            <Link to='/'>{children}</Link>
        </li>
    )
}