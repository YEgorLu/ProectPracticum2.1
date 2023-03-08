import userFoto from "../img/nekit.png";
import '../styles/profileEdit.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {useAnchors} from '../hooks/useAnchors';
import {StudentProfileEditInputs} from "./StudentProfileEditInputs";
import {TeacherProfileEditInputs} from "./TeacherProfileEditInputs";
import {StudentProfileNav} from "./StudentProfileNav";
import axios from "axios";
import {Role} from "./LoginPage";

type SelfProfileEditPageProps = {
    role: Role;
    token: string;
    login: string;
}

export function SelfProfileEditPage({role, token, login}: SelfProfileEditPageProps) {
    const nav = useNavigate();
    const [name, setName] = useState<string>('Имя');
    const [secondName, setSecondName] = useState<string>('Фамилия');
    const [thirdName, setThirdName] = useState<string>('Отчество');
    const [city, setCity] = useState<string>('Город');
    const [age, setAge] = useState<string>('2000-01-01');
    const [sex, setSex] = useState<string>('мужской');
    const [about, setAbout] = useState<string>('Обо мне');
    const [education, setEducation] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [moreInfo, setMoreInfo] = useState<string>('');
    const [prices, setPrices] = useState<string>('');
    const [schedule, setSchedule] = useState<string>('');

    const settersForStudent = {
        setName: setName,
        setSecondName: setSecondName,
        setThirdName: setThirdName,
        setCity: setCity,
        setAge: setAge,
        setSex: setSex,
        setAbout: setAbout
    }

    const settersForTeacher = {
        ...settersForStudent,
        setEducation,
        setExperience,
        setMoreInfo,
        setPrices,
        setSchedule
    }

    return (
        <main className='profile-edit__main'>
            <StudentProfileNav self={true} classPrefix={'profile-edit'} editing={true}/>
            <div className="profile-edit__info">
                {
                    role === 'Student'
                        ?
                        <StudentProfileEditInputs {...settersForStudent}/>
                        :
                        <TeacherProfileEditInputs {...settersForTeacher} token={token} login={login}/>
                }
                <button type='submit' className="profile-edit__save"
                        onClick={() => {
                            console.log(name, secondName, thirdName, age, city, sex, about);
                            axios.put('https://localhost:7241/Profile/ChangeInfo', {
                                firstName: name,
                                secondName: secondName,
                                thirdName: thirdName,
                                phoneNumber: null,
                                email: null,
                                birthDate: age,
                                sex: sex,
                                photoRelativePath: null,
                                aboutMyself: about,
                                region: city,
                                howToCommunicate: null
                            }, {headers: {Authorization: 'Bearer ' + token}})
                                .then(() => nav('/profile'))
                                .catch(console.error)
                        }}>Сохранить
                </button>
            </div>
        </main>
    )
}