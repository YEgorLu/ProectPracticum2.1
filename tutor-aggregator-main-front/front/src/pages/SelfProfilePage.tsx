import React from "react";
import {LogIn, LogInProps} from "../propsTypes/LogInProps";
import {useNavigate} from "react-router-dom";
import {pagesURLS} from "../pagesURLS";
import {Role} from "./LoginPage";
import {StudentProfile} from "./StudentProfile";
import {TeacherProfile} from "./TeacherProfile";

type SelfProfilePageProps =  {
    token: string;
    role: Role;
    login: string;
    logged: LogIn
}

export const SelfProfilePage: React.FC<SelfProfilePageProps> = ({logged, token, role, login}: SelfProfilePageProps) => {
    const navigate = useNavigate()

    if (logged === LogIn.NOT_LOGGED) {
        navigate(pagesURLS.LOGIN);
    }

    return (
        <>
            {
                "Student" as Role === role
                    ?
                    <StudentProfile self={true} login={login} token={token}/>
                    :
                    <TeacherProfile self={true} login={login} token={token}/>
            }
        </>
    );
}