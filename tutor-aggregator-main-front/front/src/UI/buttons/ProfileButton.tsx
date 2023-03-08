import user from "../../img/user.png";
import React, {useRef, useState} from "react";
import {LogIn, LogInProps} from "../../propsTypes/LogInProps";
import {useNavigate} from "react-router-dom";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";

type ProfileButtonProps = LogInProps & {

}

export function ProfileButton({logged, changeStatus}: ProfileButtonProps) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const nav = useNavigate()
    const ref = useRef<HTMLUListElement>(null);
    useOnClickOutside(ref, () => setShowMenu(false));
    function goToLogin(){
        nav('/login');
    }

    return (
        <div className='header__header-profile'>
            <p className="header__lessons">Мои занятия</p>
            <img src={user} alt="Пользователь" className="header__user-img" onClick={() => setShowMenu(prev => !prev)}/>
            {showMenu &&
            <ul className="header__profile-menu" ref={ref}>
                {logged === LogIn.LOGGED_IN
                    ?
                    <>
                        <li className='header__profile-button' onClick={() => nav('/profile')}>Профиль</li>
                        <li className='header__profile-button' onClick={() => nav('/password')}>Сменить пароль</li>
                        <li className='header__profile-button' onClick={() => changeStatus(LogIn.NOT_LOGGED)}>Выйти</li>
                    </>
                    :
                    <li className='header__profile-button' onClick={goToLogin}>Войти</li>}
            </ul>}
        </div>
    )
}
