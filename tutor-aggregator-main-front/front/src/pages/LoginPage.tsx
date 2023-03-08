import React, {ChangeEvent, Dispatch, FormEvent, FormEventHandler, useState} from "react";
import {LogIn} from "../propsTypes/LogInProps";
import axios, {AxiosError} from 'axios'
import '../styles/login.css'
import logo from "../img/logo.png";
import {AbortedDeferredError, useNavigate} from "react-router-dom";

export type Role = 'Student' | 'Tutor';

type LoginPageProps = {
    changeStatus: (status: LogIn, token?: string, login?: string) => void;
    role: Role;
    setRole: Dispatch<React.SetStateAction<Role>>;
}

interface AxiosResponse {
    request: XMLHttpRequest;
}

interface AxiosPost {
    login: string,
    password: string,
    role: Role,
    firstName: string,
    secondName: string,
    thirdName: string;
    phoneNumber: string;
}


export function LoginPage({changeStatus, role, setRole}: LoginPageProps) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [auth, setAuth] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const [thirdName, setThirdName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const navigate = useNavigate()

    const authorization: FormEventHandler = async (ev: FormEvent) => {
        ev.preventDefault();
        axios.get<AxiosResponse>(`https://localhost:7241/Account/Authenticate?Login=${login}&Password=${password}&Role=${role}`)
            .then(resp => {
                if (resp.status !== 200)
                    throw new Error('Неверный логин или пароль')
                changeStatus(LogIn.LOGGED_IN, resp.request.response, login);
                navigate('/');
            })
            .catch((err: AxiosError) => console.log(err))
    }

    const registration: FormEventHandler = async (ev: FormEvent) => {
        ev.preventDefault()
        axios.post<AxiosResponse, AxiosResponse, AxiosPost>('https://localhost:7241/Account/Register', {
            login: login,
            password: password,
            role: role,
            firstName: name,
            secondName: secondName,
            thirdName: thirdName,
            phoneNumber: phoneNumber
        })
            .then((resp: AxiosResponse) => {
                console.log(resp)
                changeStatus(LogIn.LOGGED_IN, resp.request.response, login);
                navigate('/');
            })
            .catch((err: AxiosError) => console.log(err));
    }

    const buttons = (
        <div className='login__buttons'>
            <a className="login__switch" onClick={(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                ev.preventDefault()
                setAuth(!auth)
            }}>{auth ? 'Регистрация' : 'Вход'}</a>
            {auth
                ?
                <button type='submit'>Авторизоваться</button>
                :
                <button type='submit'>Регистрация</button>
            }
        </div>
    )

    return (
        <main className="login__main">
            <form id='login-form' onSubmit={auth ? authorization : registration}>
                <div className="login__logo">
                    <img src={logo} alt="Логотип" width="40" height="46"/>
                    <p>retyt</p>
                </div>
                <input required name='login' type='login'
                       onInput={(ev: ChangeEvent<HTMLInputElement>) => setLogin(ev.target.value)}
                       placeholder='Телефон или электронная почта'/>
                <input required name='password' type='password'
                       onInput={(ev: ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value)}
                       placeholder='Пароль'/>
                {auth ||
                  <>
                    <input type='text' required name='firstName' placeholder='Имя'
                           onInput={(ev: ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}/>
                    <input type='text' required name='secondName' placeholder='Фамилия'
                           onInput={(ev: ChangeEvent<HTMLInputElement>) => setSecondName(ev.target.value)}/>
                    <input type='text' required name='thirdName' placeholder='Отчество'
                           onInput={(ev: ChangeEvent<HTMLInputElement>) => setThirdName(ev.target.value)}/>
                    <input type='text' required name='phoneNumber' pattern="[789][0-9]{10}" placeholder='Телефон'
                           onInput={(ev: ChangeEvent<HTMLInputElement>) => setPhoneNumber(ev.target.value)}/>
                    <select required name='role' defaultValue="Student"
                            onInput={(ev: ChangeEvent<HTMLSelectElement>) => setRole(ev.target.value as Role)}>
                      <option disabled>Выберите роль</option>
                      <option value="Student">Ученик</option>
                      <option value="Tutor">Репетитор</option>
                    </select>
                  </>
                }
                {buttons}
            </form>
        </main>
    )
}