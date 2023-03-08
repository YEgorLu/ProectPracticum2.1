import {FormEvent, useEffect, useState} from "react";
import {LessonTemplateDTO} from "../lessonTemplate/LessonTemplate";
import axios from "axios";
import '../../styles/lesson.css'

export enum Week {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

type LessonCreateProps = {
    edit: false;
    lessons: LessonTemplateDTO[];
    token: string;
}

type LessonEditProps = {
    edit: true;
    lessons: LessonTemplateDTO[];
    token: string;
    id: number;
    defLessonsId: number[];
    defWeek: Week;
    defStartTime: string;
    defEndTime: string;
    defDateTime: string;
    defMinutesLength: number;
}

export function LessonEdit({
                               lessons, token,  ...props
                           }: LessonCreateProps | LessonEditProps) {
    const [week, setWeek] = useState<Week>(props.edit ? props.defWeek : Week.Monday);
    const [startTime, setStartTime] = useState<string>(props.edit ? props.defStartTime : '00:00');
    const [endTime, setEndTime] = useState<string>(props.edit ? props.defEndTime : '00:00');
    const [startDate, setStartDate] = useState<Date>(props.edit ? new Date(props.defDateTime) : new Date());
    const [minutesLength, setMinutesLength] = useState<number>(props.edit ? props.defMinutesLength : 0);
    const [allowedLessonsId, setAllowedLessonsId] = useState<number[]>(props.edit ? props.defLessonsId : lessons.length > 0 ? [lessons[0].id] : []);
    const [place, setPlace] = useState<string>('');

    useEffect(() => {
        const date = new Date();
        const [hour, minute] = startTime.split(':');
        date.setHours(+hour);
        date.setMinutes(+minute);
        date.setDate(date.getDate() + week + 1 - date.getDay())
        setStartDate(date)
    }, [startTime, week])

    useEffect(() => {
        const [h1, m1] = startTime.split(':');
        const [h2, m2] = endTime.split(':');
        const hDif = +h2 - +h1 - 1;
        const minutes1 = 60 - +m1;
        const minutes2 = +m2;
        setMinutesLength(hDif * 60 + minutes1 + minutes2);

    }, [startTime, endTime])

    function onSubmit(ev: FormEvent) {
        ev.preventDefault();
        axios.post('https://localhost:7241/Lesson/Create',
            {
                dateTime: startDate,
                lengthInMinutes: minutesLength,
                allowedTemplatesId: allowedLessonsId,
                place: place
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(console.log)
            .catch(console.error)
    }

    function lessonChange(ev: FormEvent) {
        ev.preventDefault();
        console.log('меняю урок епта');
        if (props.edit) {
            axios.put('https://localhost:7241/Lesson/Change',
                {
                    id: props.id,
                    dateTime: startDate,
                    lengthInMinutes: minutesLength,
                    allowedTemplatesId: allowedLessonsId
                }, {
                    headers: {Authorization: `Bearer ${token}`}
                }).then(console.log)
                .catch(console.error)
        }
    }

    return (
        <form className={'lesson'} onSubmit={props.edit ? lessonChange : onSubmit}>
            <label className='edit'>День недели:
                <select className={'lesson__week'}
                        onInput={(ev: FormEvent<HTMLSelectElement>) => setWeek(+ev.currentTarget.value as Week)}>
                    <option value='0' selected>Понедельник</option>
                    <option value='1'>Вторник</option>
                    <option value='2'>Среда</option>
                    <option value='3'>Четверг</option>
                    <option value='4'>Пятница</option>
                    <option value='5'>Суббота</option>
                    <option value='6'>Воскресенье</option>
                </select>
            </label>
            <label className='edit'>Начало:
                <input className={'lesson__time lesson__start-time'} type="time"
                       onInput={(ev: FormEvent<HTMLInputElement>) => setStartTime(ev.currentTarget.value)}/>
            </label>
            <label className='edit'>Конец:
                <input className={'lesson__time lesson__end-time'} type="time"
                       onInput={(ev: FormEvent<HTMLInputElement>) => setEndTime(ev.currentTarget.value)}/>
            </label>
            <label className='edit'>Место:
                <input className={'lesson__place'} type="text"
                onInput={(ev: FormEvent<HTMLInputElement>) => setPlace(ev.currentTarget.value)}/>
            </label>
            <label className='edit'>Услуги на выбор:
                <select multiple={true} className={'lesson__templates'}
                        onChange={(ev: FormEvent<HTMLSelectElement>) => setAllowedLessonsId([...ev.currentTarget.options].filter(o => o.selected).map(o => +o.value))
                        }>
                    {lessons.map(les => (
                        <option className={'lesson__template'} key={les.id}
                                value={les.id}>{les.name}</option>
                    ))}
                </select>
            </label>
            <button className={'lesson__save'} type={"submit"}>Сохранить</button>
        </form>
    )
}