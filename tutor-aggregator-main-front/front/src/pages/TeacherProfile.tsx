import {LogIn} from "../propsTypes/LogInProps";
import {useParams} from "react-router";
import {useAnchors} from "../hooks/useAnchors";
import '../styles/studentProfile.css';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {AxiosProfileResponse} from "./StudentProfile";
import userFoto from "../img/nekit.png";
import {LessonTemplateDTO, LessonTemplate} from "../UI/lessonTemplate/LessonTemplate";
import '../styles/teacherProfile.css'
import {Modal} from "../UI/Modal";
import {LessonEdit} from "../UI/lesson/LessonEdit";
import {Lesson, LessonDTO} from "../UI/lesson/Lesson";

type TeacherProfileProps = {
    self: boolean,
    logged?: LogIn,
    login: string;
    token: string
}


export function TeacherProfile({logged, self, login, token}: TeacherProfileProps) {
    useAnchors();
    const nav = useNavigate();
    let {id} = useParams();
    let studLogin;
    if (id !== undefined) {
        studLogin = login;
        login = id;
    }
    let content: JSX.Element;
    const [gotTeacher, setGotTeacher] = useState<boolean>(false);
    const [data, setData] = useState<AxiosProfileResponse>();
    const [templates, setTemplates] = useState<LessonTemplateDTO[]>([]);
    const [loadText, setLoadText] = useState<string>('Загрузка');
    const [lessons, setLessons] = useState<LessonDTO[]>([]);
    const [show, setShow] = useState<boolean>(true);

    function loadLessons() {
        axios.get<any, { data: LessonDTO[] }>('https://localhost:7241/Lesson/All?userLogin=' + login)
            .then(response => {
                setLessons(response.data);
            })
    }

    function loadLessonTemplates() {
        axios.get<any, { data: LessonTemplateDTO[] }>('https://localhost:7241/LessonTemplate?tutorLogin=' + login)
            .then(response => {
                setTemplates(response.data);
            })
    }

    useEffect(() => {
        axios.get<AxiosProfileResponse>('https://localhost:7241/Profile/GetInfo?login=' + login)
            .then(r => {
                console.log('GetInfo' + login)
                console.log(r)
                setGotTeacher(true);
                setData(r.data)
            })
            .catch(() => setLoadText('Преподаватель не найден'))
    }, [])

    useEffect(() => {
        loadLessonTemplates();
        loadLessons();
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

    if (gotTeacher === false)
        content = <p>{loadText}</p>
    else {
        content = (
            <div className='profile__info'>
                <section className="profile__main-info">
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
                <section className="profile__about" id="profile__about">
                    <h2>О себе</h2>
                    {aboutMyself}
                </section>
                <section className='profile__education' id="profile__education">
                    <h2>Образование</h2>

                </section>
                <section className="profile__experience" id="profile__experience">
                    <h2>Опыт работы</h2>
                </section>
                <section className="profile__more-info" id="profile__more-info">
                    <h2>Дополнительная информация</h2>
                </section>
                <footer className="profile__footer">
                    <section className='profile__footer_prices' id='profile__footer_prices'>
                        <h3>Услуги и цены</h3>
                        <div className="profile__lessons">
                            {login && templates.length !== 0 && templates.map(template => <LessonTemplate self={self} {...template}
                                                                                                          token={token}
                                                                                                          setLessons={setTemplates}/>)}
                        </div>
                    </section>
                    <section className="profile__footer_schedule" id="profile__footer_schedule">
                        <h3>График</h3>
                        <div className="profile__lessons">
                            {lessons.map(l => <Lesson self={self} {...l} templates={templates} token={token} setLessons={setLessons} lessons={templates}/>)}
                        </div>
                    </section>
                </footer>
            </div>);
    }
    return (
        <>
            <main className='profile__main'>
                <aside className='profile__side-menu'>
                    <ul className='profile__side-menu_list'>
                        {
                            self
                                ?
                                <li className='profile__side-menu_item' onClick={() => nav('./edit')}><Link
                                    to='#'>Редактировать</Link></li>
                                :
                                <li className="profile__side-menu_item">
                                    <Link to='/'>Назад</Link>
                                </li>
                        }
                        <li className="profile__side-menu_item">
                            <Link to='#profile__about'>О репетиторе</Link>
                        </li>
                        <li className="profile__side-menu_item">
                            <Link to='#profile__education'>Образование</Link>
                        </li>
                        <li className="profile__side-menu_item">
                            <Link to='#profile__experience'>Опыт работы</Link>
                        </li>
                        <li className="profile__side-menu_item">
                            <Link to='#profile__more-info'>Доп информация</Link>
                        </li>
                        <li className="profile__side-menu_item">
                            <Link to='#profile__footer_prices'>Услуги и цены</Link>
                        </li>
                        <li className="profile__side-menu_item">
                            <Link to='#profile__footer_schedule'>Расписание</Link>
                        </li>
                        <li className="profile__side-menu_item" onClick={() => nav(`../teacherProfile/${login}/comments`)}>
                            <Link to='#'>Комментарии</Link>
                        </li>
                    </ul>
                </aside>
                {content}
            </main>
        </>
    );
}