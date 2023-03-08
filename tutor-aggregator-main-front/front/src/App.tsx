import {BrowserRouter, Routes} from 'react-router-dom'
import {Route} from "react-router";
import {MainPage} from "./pages/MainPage";
import {LoginPage, Role} from "./pages/LoginPage";
import {useEffect, useState} from "react";
import {LogIn} from "./propsTypes/LogInProps";
import {TeacherProfile} from "./pages/TeacherProfile";
import {pagesURLS} from "./pagesURLS";
import {Layout} from "./pages/Layout";
import {SelfProfilePage} from "./pages/SelfProfilePage";
import {SelfProfileEditPage} from "./pages/SelfProfileEditPage";
import {ChangePasswordPage} from "./pages/ChangePasswordPage";
import jwt_decode from 'jwt-decode'
import {CommentsPage} from "./pages/CommentsPage";

type DecodedJWTToken = {
    exp: number;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
}

function App() {
    const [logged, setLogged] = useState<LogIn>(LogIn.NOT_LOGGED);
    const [token, setToken] = useState<string>('');
    const [role, setRole] = useState<Role>('Student');
    const [login, setLogin] = useState<string>('');

    function changeStatus(status: LogIn, token?: string, login?: string): void {
        setLogged(status);
        localStorage.setItem('logged', status)
        if (login) {
            setLogin(login);
            localStorage.setItem('login', login)
        } else {
            setLogin('');
            localStorage.setItem('login', '')
        }
        if (token) {
            setToken(token)
            localStorage.setItem('token', token)
            const _role = jwt_decode<DecodedJWTToken>(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as Role
            setRole(_role)
            localStorage.setItem('role', role)
        } else {
            setToken('')
            localStorage.setItem('token', '')
        }
    }

    useEffect(() => {
        let status = localStorage.getItem('logged')
        let _login = localStorage.getItem('login')
        let _token = localStorage.getItem('token')
        console.log(status ? Object.values(LogIn).includes(status as LogIn): 'hueta');
        if (status && Object.values(LogIn).includes(status as LogIn)) {
            setLogged(LogIn[status as LogIn])
            console.log(LogIn[status as LogIn])
            console.log(logged)
            console.log(1)
        }
        if (_login){
            setLogin(_login)
            console.log(2)
        }
        if (_token){
            setToken(_token)
            const _role = jwt_decode<DecodedJWTToken>(_token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as Role
            setRole(_role)
            console.log(3)
        } else {
            changeStatus(LogIn.NOT_LOGGED, '', '')
        }
    }, [])


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout logged={logged} changeStatus={changeStatus}/>}>
                    <Route path={pagesURLS.MAIN} element={<MainPage/>}/>
                    <Route path={pagesURLS.TEACHER_PROFILE + '/:id'}
                           element={<TeacherProfile self={false} login={login} token={token}/>}/>
                        <Route path={pagesURLS.TEACHER_PROFILE + '/:login' + '/comments'} element={<CommentsPage studLogin={login} token={token}/>}/>
                    <Route path={pagesURLS.SELF_PROFILE}>
                        <Route path={'edit'} element={<SelfProfileEditPage login={login} role={role} token={token}/>}/>
                        <Route index
                               element={<SelfProfilePage role={role} logged={logged} token={token} login={login}/>}/>
                    </Route>
                </Route>
                <Route path={pagesURLS.LOGIN} element={<LoginPage changeStatus={changeStatus} role={role}
                                                                  setRole={setRole}/>}/>
                <Route path={'/password'} element={<ChangePasswordPage login={login}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
