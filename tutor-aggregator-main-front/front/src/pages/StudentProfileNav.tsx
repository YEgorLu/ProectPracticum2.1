import {Link, useNavigate} from "react-router-dom";
import {useAnchors} from "../hooks/useAnchors";

export type profileNavProps = {
    self: boolean,
    classPrefix: string,
    editing: boolean
}

export function StudentProfileNav({self, classPrefix, editing}: profileNavProps) {
    const nav = useNavigate();

    useAnchors();

    return (
        <aside className={`${classPrefix}__side-menu`}>
            <ul className={`${classPrefix}__side-menu_list`}>
                {
                    self && editing ?
                        <li className={`${classPrefix}__side-menu_item`}
                            onClick={() => nav('/profile')}><Link to='#'>Назад</Link>
                        </li>
                        : self
                            ?
                            <li className={`${classPrefix}__side-menu_item`} onClick={() => nav('./edit')}><Link
                                to='#'>Редактировать</Link></li>
                            :
                            <li className={`${classPrefix}__side-menu_item`}
                                onClick={() => nav('/profile')}><Link to='#'>Назад</Link>
                            </li>
                }
                <li className={`${classPrefix}__side-menu_item`}><Link to='#profile__main-info'>Основное</Link></li>
                <li className={`${classPrefix}__side-menu_item`}><Link to='#profile__about'>О себе</Link></li>
                <li className={`${classPrefix}__side-menu_item`}><Link to='#profile__schedule'>Расписание</Link></li>
            </ul>
        </aside>
    )
}