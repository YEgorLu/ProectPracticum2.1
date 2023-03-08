import React, {ChangeEvent, Dispatch, FormEvent, FormEventHandler, useState} from "react";
import {LogIn} from "../propsTypes/LogInProps";
import axios, {AxiosError, AxiosResponse} from 'axios'
import '../styles/login.css'
import logo from "../img/logo.png";
import {useNavigate} from "react-router-dom";
import {pagesURLS} from "../pagesURLS";

type ChangePasswordPageProps = {
    login: string;
}

type AxiosChangePasswordRequest = {
    login: string,
    oldPassword: string;
    newPassword: string;
}

export function ChangePasswordPage({login}: ChangePasswordPageProps) {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const navigate = useNavigate()

    const changePassword: FormEventHandler = async (ev: FormEvent) => {
        ev.preventDefault();
        axios.put<string, AxiosResponse<string>, AxiosChangePasswordRequest>('https://localhost:7241/Account/ChangePassword', {
            login: login,
            oldPassword: oldPassword,
            newPassword: newPassword
        }).then(() => navigate(pagesURLS.MAIN))
            .catch((err: AxiosError<string, AxiosChangePasswordRequest>) => alert(err.response?.data));
    }

    return (
        <main className="login__main">
            <form id='login-form' onSubmit={changePassword}>
                <div className="login__logo">
                    <img src={logo} alt="Логотип" width="40" height="46"/>
                    <p>retyt</p>
                </div>
                <input required name='oldPassword' type='password'
                       onInput={(ev: ChangeEvent<HTMLInputElement>) => setOldPassword(ev.target.value)}
                       placeholder='Старый пароль'/>
                <input required name='newPassword' type='password'
                       onInput={(ev: ChangeEvent<HTMLInputElement>) => setNewPassword(ev.target.value)}
                       placeholder='Новый пароль'/>
                <button type={"submit"}>Сменить пароль</button>
            </form>
        </main>
    )
}