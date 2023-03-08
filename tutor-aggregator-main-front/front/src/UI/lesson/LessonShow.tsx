import {FormEvent, useEffect, useState} from "react";
import {Week} from "./LessonEdit";
import {LessonTemplate, LessonTemplateDTO} from "../lessonTemplate/LessonTemplate";
import axios from "axios";
import {LessonDTO} from "./Lesson";
import {Translator} from "../../Translator";
import {Modal} from "../Modal";

export function LessonShow({l, token, onUnsub}: { l: LessonDTO, token: string, onUnsub?: () => void }) {
    const [template, setTemplate] = useState<LessonTemplateDTO>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const date = new Date(l.dateTime)
    let minutes = date.getMinutes().toString();
    let hours = date.getHours().toString();
    if (minutes.length === 1)
        minutes = '0' + minutes;
    if (hours.length === 1)
        hours = '0' + hours;

    useEffect(() => {
        axios.get<any, { data: LessonTemplateDTO }>('https://localhost:7241/LessonTemplate/' + l.id)
            .then(r => setTemplate(r.data))
            .catch(console.error);
    }, [])

    function unsubscribe() {
        axios.put('https://localhost:7241/Lesson/Unsubscribe?lessonId=' + l.id,
            {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(r => {
                console.log(r)
                if (onUnsub)
                    onUnsub();
            })
            .catch(console.error);
    }

    return (
        <div className={'lesson'}>
            <h5 className="lesson__week">{Translator.getWeekName(date.getDay())}</h5>
            <div className="lesson__time-container">
                <time className={'lesson__time lesson__start-time'}>{'Начало: '}{hours + ':' + minutes}</time>
                <p className="lesson__dur">{'Продолжительность: '}{l.lengthInMinutes}{' минут'}</p>
            </div>
            <p className='lesson__chosen-template'>{'Услуга: '}{template?.name}</p>
            {template &&
              <>
                <button className='lesson__more' onClick={() => setShowModal(true)}>Подробнее</button>
                <Modal title={template?.name} show={showModal} onClose={() => setShowModal(false)}>
                  <LessonTemplate id={template.id} name={template.name} price={template.price}
                                  description={template.description} lessonFormat={template.lessonFormat}
                                  desiredSex={template.desiredSex} desiredAge={template.desiredAge} self={false}
                                  setLessons={() => null}/>
                </Modal>
              </>
            }
            <button className={'lesson__save'} onClick={unsubscribe}>Отписаться</button>
        </div>
    )
}