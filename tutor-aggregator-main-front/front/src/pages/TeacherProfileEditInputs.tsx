import {FormEvent, SetStateAction, useEffect, useState} from "react";
import {Modal} from "../UI/Modal";
import {LessonTemplateEdit} from "../UI/lessonTemplate/LessonTemplateEdit";
import {LogInProps} from "../propsTypes/LogInProps";
import {LessonTemplateDTO, LessonTemplate} from "../UI/lessonTemplate/LessonTemplate";
import axios from "axios";
import {Lesson, LessonDTO} from "../UI/lesson/Lesson";
import {LessonEdit} from "../UI/lesson/LessonEdit";

type teacherProfileEditInputsProps = {
    setName: React.Dispatch<SetStateAction<string>>,
    setSecondName: React.Dispatch<SetStateAction<string>>,
    setThirdName: React.Dispatch<SetStateAction<string>>,
    setCity: React.Dispatch<SetStateAction<string>>,
    setAge: React.Dispatch<SetStateAction<string>>,
    setSex: React.Dispatch<SetStateAction<string>>,
    setAbout: React.Dispatch<SetStateAction<string>>,
    setEducation: React.Dispatch<SetStateAction<string>>,
    setExperience: React.Dispatch<SetStateAction<string>>,
    setMoreInfo: React.Dispatch<SetStateAction<string>>,
    setPrices: React.Dispatch<SetStateAction<string>>,
    setSchedule: React.Dispatch<SetStateAction<string>>,
}

export function TeacherProfileEditInputs({
                                             setName,
                                             setSecondName,
                                             setThirdName,
                                             setCity,
                                             setAge,
                                             setSex,
                                             setAbout,
                                             setEducation,
                                             setExperience,
                                             setMoreInfo,
                                             setPrices,
                                             setSchedule,
                                             token,
                                             login
                                         }: teacherProfileEditInputsProps & { token: string, login: string }) {

    const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
    const [showLessonModal, setShowLessonModal] = useState<boolean>(false);
    const [templates, setTemplates] = useState<LessonTemplateDTO[]>([])
    const [lessons, setLessons] = useState<LessonDTO[]>([]);

    useEffect(() => {
        axios.get<any, { data: LessonTemplateDTO[] }>('https://localhost:7241/LessonTemplate?tutorLogin=' + login)
            .then(response => {
                setTemplates(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get<any, { data: LessonDTO[] }>('https://localhost:7241/Lesson/All?userLogin=' + login)
            .then(response => {
                setLessons(response.data);
            })
    }, [])

    return (
        <>
            <div className="profile-edit__main-info_data">
                <label>
                    <input type="text" className="profile-edit_second-name"
                           onInput={(ev: FormEvent<HTMLInputElement>) => setSecondName(ev.currentTarget.value)}/>
                </label>
                <label>
                    <input type="text" className="profile-edit_name"
                           onInput={(ev: FormEvent<HTMLInputElement>) => setName(ev.currentTarget.value)}/>
                </label>
                <label>
                    <input type="text" className="profile-edit_third-name"
                           onInput={(ev: FormEvent<HTMLInputElement>) => setThirdName(ev.currentTarget.value)}/>
                </label>
                <label>
                    <input type="text" className='profile-edit__city'
                           onInput={(ev: FormEvent<HTMLInputElement>) => setCity(ev.currentTarget.value)}/>
                </label>
                <label>
                    <input type="date" min="0" className='profile-edit__age'
                           onInput={(ev: FormEvent<HTMLInputElement>) => setAge(ev.currentTarget.value)}/>
                </label>
                <label>
                    <select name='sex' className='profile-edit__sex'
                            onInput={(ev: FormEvent<HTMLSelectElement>) => setSex(ev.currentTarget.value)}>
                        <option value="мужской">мужской</option>
                        <option value="женский">женский</option>
                    </select>
                </label>
            </div>
            <section className="profile-edit__about" id='profile-edit__about'>
                <h2>О себе</h2>
                <textarea onInput={(ev: FormEvent<HTMLTextAreaElement>) => setAbout(ev.currentTarget.value)}/>
            </section>
            <section className="profile-edit__education" id='profile-edit__education'>
                <h2>Образование</h2>
                <textarea onInput={(ev: FormEvent<HTMLTextAreaElement>) => setEducation(ev.currentTarget.value)}/>
            </section>
            <section className="profile-edit__experience" id='profile-edit__experience'>
                <h2>Опыт работы</h2>
                <textarea onInput={(ev: FormEvent<HTMLTextAreaElement>) => setExperience(ev.currentTarget.value)}/>
            </section>
            <section className="profile-edit__more-info" id='profile-edit__more-info'>
                <h2>Дополнительная информация</h2>
                <textarea onInput={(ev: FormEvent<HTMLTextAreaElement>) => setMoreInfo(ev.currentTarget.value)}/>
            </section>
            <section className="profile-edit__prices" id="profile-edit__prices">
                <h2>Услуги и цены</h2>
                <div className='profile-edit__templates'>
                {templates.map(t => <LessonTemplate self={true} key={t.id} id={t.id} name={t.name} price={t.price}
                                                    description={t.description}
                                                    lessonFormat={t.lessonFormat} desiredSex={t.desiredSex}
                                                    desiredAge={t.desiredAge} setLessons={setTemplates}/>)}
                <button className="profile-edit__prices_add" onClick={() => setShowTemplateModal(true)}>Добавить</button>
                </div>
                <Modal title='Услуга' onClose={() => setShowTemplateModal(false)} show={showTemplateModal}>
                    <LessonTemplateEdit token={token} onLessonSave={() => setShowTemplateModal(false)}/>
                </Modal>
            </section>
            <section className="profile-edit__schedule" id="profile-edit__schedule">
                <h2>Расписание занятий</h2>
                <div className="profile-edit__lessons">
                    {lessons.map(l => <Lesson setLessons={setLessons} token={token} templates={templates} self={true} key={l.id} {...l}/>)}
                </div>
                <button className="profile-edit__lessons_add" onClick={() => setShowLessonModal(true)}>Добавить</button>
                <Modal title='Урок' onClose={() => setShowLessonModal(false)} show={showLessonModal}>
                    <LessonEdit edit={false} lessons={templates} token={token}/>
                </Modal>
            </section>
        </>
    )
}