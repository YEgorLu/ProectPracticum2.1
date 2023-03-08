import '../styles/studentProfile.css';
import userFoto from '../img/nekit.png';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {StudentProfileNav} from "./StudentProfileNav";
import {Lesson, LessonDTO} from "../UI/lesson/Lesson";
import {LessonShow} from "../UI/lesson/LessonShow";

export type AxiosProfileResponse = {
    secondName: string,
    firstName: string,
    thirdName: string,
    phoneNumber: string,
    email: string,
    birthDate: string,
    sex: string,
    photoRelativePath: string,
    aboutMyself: string,
    region: string,
    howToCommunicate: string
}

type studentProfileProps = {
    self: boolean;
    login: string;
    token: string;
}

export const StudentProfile: React.FC<studentProfileProps> = ({self, login, token}: studentProfileProps) => {
    const nav = useNavigate()
    const [data, setData] = useState<AxiosProfileResponse>();
    const [lessons, setLessons] = useState<LessonDTO[]>([]);

    useEffect(() => {
        axios.get<AxiosProfileResponse>('https://localhost:7241/Profile/GetInfo?login=' + login, {headers: {Authorization: 'Bearer ' + token}})
            .then(r => {
                console.log(r);
                return r
            })
            .then((resp) => setData(resp.data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios.get<any, { data: LessonDTO[] }>('https://localhost:7241/Lesson/All?userLogin=' + login)
            .then(response => {
                setLessons(response.data);
            })
    }, [])

    const {
        secondName,
        firstName,
        thirdName,
        phoneNumber,
        email,
        birthDate,
        sex,
        photoRelativePath,
        aboutMyself,
        region,
        howToCommunicate
    } = data ?? {}

    function getAge(dateString: string): number {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const age = birthDate ? getAge(birthDate) : "";

    return (
        <>
            <main className='profile__main'>
                <StudentProfileNav self={self} classPrefix={'profile'} editing={false}/>
                <div className="profile__info">
                    <section className="profile__main-info" id='profile__main-info'>
                        <img src={userFoto} alt="Фото пользователя" className="profile__user-photo"/>
                        <div className="profile__main-info_data">
                            <h1 className="profile__fio">
                                {firstName} {secondName} {thirdName}
                            </h1>
                            <address className="profile__city">
                                Город:
                                {region}
                            </address>
                            <p className="profile__age">
                                Возраст:
                                {birthDate ? getAge(birthDate) : ""}
                            </p>
                            <p className="profile__sex">
                                Пол:
                                {sex}
                            </p>
                        </div>
                    </section>
                    <section className="profile__about" id='profile__about'>
                        <h2>О себе</h2>
                        <p>
                            {aboutMyself}
                        </p>
                    </section>
                    {self &&
                      <section className="profile__schedule" id='profile__schedule'>
                        <h2>Расписание занятий</h2>
                        <div className="profile__lessons">
                            {lessons.map((l: LessonDTO) => {
                                const onUnsub = () => {
                                    setLessons(lessons.filter(les => les.id !== l.id))
                                }
                                return <LessonShow onUnsub={onUnsub} token={token} key={l.id} l={l}/>
                            })}
                        </div>
                      </section>
                    }
                </div>
            </main>
        </>
    );
}