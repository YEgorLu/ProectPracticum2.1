import logo from "../img/logo.png";
import {ProfileButton} from "../UI/buttons/ProfileButton";
import '../styles/header.css'
import {LogInProps} from "../propsTypes/LogInProps";
import {useNavigate} from "react-router-dom";

type PageHeaderProps = LogInProps & {

}

export function PageHeader({logged, changeStatus}: PageHeaderProps) {
    const nav = useNavigate()

    return (
        <header>
            <div className="header__logo-container">
                <div className="header__logo" onClick={() => nav('/')}>
                    <img src={logo} alt="Логотип" width="40" height="46"/>
                    <p>retyt</p>
                </div>
                <div className="header__location">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <p>Екатеринбург</p>
                </div>
                <ProfileButton logged={logged} changeStatus={changeStatus}/>
            </div>
            <label>
                <input className="header__search" placeholder="Поиск"/>
            </label>
        </header>
    )
}