import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import '../../../styles/pagination/pagCaret.css'
import '../../../styles/pagination/pagButton.css';
import {FC} from "react";

type caretButtonProps = {
    end?: boolean,
    onClick: () => void;
}

export const CaretButton: FC<caretButtonProps> = ({end = false, onClick}: caretButtonProps) => {
  return (
    <li className='pag-item' onClick={onClick}>
      <FontAwesomeIcon icon={end ? faCaretRight :faCaretLeft}/>
    </li>
  )
}