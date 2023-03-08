import {FormEvent, useEffect, useState} from "react";
import {LessonEdit, Week} from "./LessonEdit";
import {LessonTemplateDTO} from "../lessonTemplate/LessonTemplate";
import '../../styles/lesson.css'
import {Translator} from "../../Translator";
import axios from "axios";
import {Modal} from "../Modal";
//
// type LessonProps = {
//     week: Week;
//     templates: LessonTemplateDTO[];
//     startTime: Date;
//     duration: number | string;
// }

export type LessonDTO = {
    id: number,
    dateTime: string,
    lengthInMinutes: number,
    studentId?: number,
    chosenTemplateId?: number,
    allowedTemplatesId: number[];
}

export function Lesson({
                           id,
                           dateTime,
                           lengthInMinutes,
                           allowedTemplatesId,
                           templates,
                           self,
                           token,
                           setLessons,
                           lessons
                       }: LessonDTO & {
    token: string,
    templates: LessonTemplateDTO[], self: boolean;
    setLessons?: React.Dispatch<React.SetStateAction<LessonDTO[]>>;
    lessons?: LessonTemplateDTO[]
}) {
    const date = new Date(dateTime)
    let minutes = date.getMinutes().toString();
    let hours = date.getHours().toString();
    if (minutes.length === 1)
        minutes = '0' + minutes;
    if (hours.length === 1)
        hours = '0' + hours;
    const endDate = new Date(dateTime + lengthInMinutes * 60000);
    let endMinutes = endDate.getMinutes().toString();
    let endHours = endDate.getHours().toString();
    if (endMinutes.length === 1)
        endMinutes = '0' + endMinutes;
    if (endHours.length === 1)
        endHours = '0' + endHours;
    const weekName = Translator.getWeekName(date.getDay());
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [templateId, setTemplateId] = useState<number | undefined>(lessons && lessons.length > 0 ? lessons[0].id : undefined);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {

    }, [])

    function subscribe() {
        console.log(id, templateId)
        if (templateId === undefined) {
            console.error(`templateId=${templateId} не задан`)
            return
        }
        axios.put(`https://localhost:7241/Lesson/Subscribe?lessonId=${id}&chosenTemplateId=${templateId}`,
            {
                // lessonId: id,
                // chosenTemplateId: templateId
            }, {headers: {Authorization: `Bearer ${token}`}})
            .then(console.log)
            .catch(console.error)
    }

    function lessonDelete() {
        axios.delete('https://localhost:7241/Lesson/Delete?lessonId=' + id,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then((r) => {
                console.log(r);
                setLessons!(prevState => prevState.filter(l => l.id !== id))
            })
            .catch(console.error)
    }

    return (
        <div className={'lesson'}>
            <h5 className="lesson__week">{weekName}</h5>
            <div className="lesson__time-container">
                <time className={'lesson__time lesson__start-time'}>{'Начало: '}{date.getHours() + ':' + minutes}</time>
                <p className="lesson__dur">{'Продолжительность: '}{lengthInMinutes}{' минут'}</p>
            </div>
            <label>Услуги:
                <select className={'lesson__templates'}
                        onInput={(ev: FormEvent<HTMLSelectElement>) => {
                            console.log(+ev.currentTarget.value)
                            setTemplateId(+ev.currentTarget.value)
                        }}>
                    {templates.filter(t => allowedTemplatesId.includes(t.id)).map(les => (
                        <option className={'lesson__template'} key={les.id}
                                value={les.id}>{les.name}</option>
                    ))}
                </select>
            </label>
            {self && setLessons && lessons &&
              <>
                <button className='lesson__change' onClick={() => setShowModal(true)}>Изменить</button>
                <Modal title={'Урок'} show={showModal} onClose={() => setShowModal(false)}>
                  <LessonEdit id={id} edit={true}
                              defLessonsId={allowedTemplatesId} defWeek={date.getDay()} defDateTime={dateTime}
                              defEndTime={endHours + ':' + endMinutes}
                              defMinutesLength={lengthInMinutes} defStartTime={hours + ':' + minutes}
                              lessons={lessons} token={token}/>
                </Modal>
              </>
            }
            {self && setLessons &&
              <button className='lesson__delete' onClick={lessonDelete}>Удалить</button>
            }
            {self ||
              <button className={'lesson__save'} onClick={subscribe}>Записаться</button>
            }
        </div>
    )
}