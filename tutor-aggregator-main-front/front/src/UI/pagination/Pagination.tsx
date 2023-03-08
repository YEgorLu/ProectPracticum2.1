//import {pag, pag-list} from ''
import '../../styles/pagination/pagList.css'

import {PagButton} from "../buttons/pug_buttons/PagButton";
import {CaretButton} from "../buttons/pug_buttons/CaretButton";
import {Dispatch, MouseEventHandler, SetStateAction, useState} from "react";
import {TeachersFromTo} from "../../pages/MainPage";

type PaginationProps = {
    count: number,
    set: Dispatch<SetStateAction<TeachersFromTo>>
}

export function Pagination({count, set}: PaginationProps) {
    const [curr, setCurr] = useState<number>(1)

    const buttons = []
    for (let i = 1; i <= count; i++) {
        const onClick: MouseEventHandler = (ev) => {
            set({
                from: 5 * (i - 1),
                to: 5 + 5 * (i - 1)
            });
            setCurr(i);
        }

        buttons.push(<PagButton onClick={onClick} isActive={() => curr === i}>{i}</PagButton>)
    }

    const toLeft = () => {
        set(({from, to}) => {
            if (count === 0)
                return {from: from, to: to}
            let newFrom = from - 5;
            let newTo = to - 5;
            if (newFrom < 0) {
                newFrom = 0;
                newTo = 5;
            }

            setCurr((curr) => curr === 1 ? 1 : curr - 1)
            return {from: newFrom, to: newTo}
        })
    }

    const toRight = () => {
        set(({from, to}) => {
            if (count === 0)
                return {from: from, to: to}
            let newFrom = from + 5;
            let newTo = to + 5;
            if (newTo > count * 5) {
                newFrom = count * 5 - 5;
                newTo = count * 5;
            }

            setCurr((curr) => curr === count ? count : curr + 1)
            return {from: newFrom, to: newTo}
        })
    }

    return (
        <div className='pag'>
            <ul className='pag-list'>
                <CaretButton onClick={toLeft}/>
                {buttons}
                <CaretButton onClick={toRight} end/>
            </ul>
        </div>
    )
}