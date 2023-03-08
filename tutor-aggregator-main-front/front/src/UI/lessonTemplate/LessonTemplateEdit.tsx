import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {DesiredAge, DesiredSex, LessonFormat} from "../../LessonTypes";
import {LessonTemplateDTO} from "./LessonTemplate";


type LessonCreateProps = {
    token: string;
    onLessonSave?: () => void;
}

type LessonChangeProps = LessonCreateProps & {
    lessonId: number;
    onLessonChangeSave?: (les: LessonTemplateDTO) => void;
    defName: string;
    defPrice: number;
    defDesc: string;
    defFormat: LessonFormat;
    defSex: DesiredSex;
    defAge: DesiredAge;
}


export function LessonTemplateEdit(props: LessonCreateProps | LessonChangeProps) {
    const [name, setName] = useState<string>('lessonId' in props ? props.defName : '');
    const [price, setPrice] = useState<number>('lessonId' in props ? props.defPrice :0);
    const [desc, setDesc] = useState<string>('lessonId' in props ? props.defDesc :'');
    const [format, setFormat] = useState<LessonFormat>('lessonId' in props ? props.defFormat :LessonFormat.Offline);
    const [sex, setSex] = useState<DesiredSex>('lessonId' in props ? props.defSex :DesiredSex.Male);
    const [age, setAge] = useState<DesiredAge>('lessonId' in props ? props.defAge :DesiredAge.HighSchoolers);

    const onSubmit = 'lessonId' in props ? (ev: FormEvent) => {
        ev.preventDefault();
        axios.put('https://localhost:7241/LessonTemplate/Change', {
            id: props.lessonId,
            name: name,
            price: price,
            description: desc,
            lessonFormat: format,
            desiredSex: sex,
            desiredAge: age
        }, {headers: {Authorization: `Bearer ${props.token}`}})
            .then((r) => {
                console.log(r);
                if (props.onLessonChangeSave)
                    props.onLessonChangeSave({
                        id: props.lessonId,
                        name: name,
                        price: price,
                        description: desc,
                        lessonFormat: format,
                        desiredSex: sex,
                        desiredAge: age
                    })
            })
            .catch(console.error)
    } : (ev: FormEvent) => {
    ev.preventDefault();
    axios.post('https://localhost:7241/LessonTemplate/Create', {
        name: name,
        price: price,
        description: desc,
        lessonFormat: format,
        desiredSex: sex,
        desiredAge: age
    }, {headers: {Authorization: `Bearer ${props.token}`}})
        .then((r) => {
            console.log(r);
            if (props.onLessonSave)
                props.onLessonSave()
        })
        .catch(console.error)
}

return (
    <form className="lesson-template" onSubmit={onSubmit}>
        <label>
            <input type="text" className="lesson-template__name" defaultValue={name}
                   onInput={(ev: FormEvent<HTMLInputElement>) => setName(ev.currentTarget.value)}/>
        </label>
        <label>
            <input type="text" pattern='\d*' className="lesson-template__price" defaultValue={'lessonId' in props ? props.defPrice : ''}
                   onChange={(ev: FormEvent<HTMLInputElement>) => setPrice(+ev.currentTarget.value)}/>
        </label>
        <label>
            <input type="text" className="lesson-template__desc" defaultValue={'lessonId' in props ? props.defDesc : ''}
                   onInput={(ev: FormEvent<HTMLInputElement>) => setDesc(ev.currentTarget.value)}/>
        </label>
        <label>
            <select className="lesson-template__format" defaultValue={'lessonId' in props ? props.defFormat : ''}
                    onInput={(ev: FormEvent<HTMLSelectElement>) => setFormat(+ev.currentTarget.value as LessonFormat)}>
                <option value="0">Онлайн</option>
                <option value="1" selected={true}>Офлайн</option>
            </select>
        </label>
        <label>
            <select className="lesson-template__sex" defaultValue={'lessonId' in props ? props.defSex : ''}
                    onInput={(ev: FormEvent<HTMLSelectElement>) => setSex(+ev.currentTarget.value as DesiredSex)}>
                <option value="0" selected={true}>Мужчины</option>
                <option value="1">Женщины</option>
            </select>
        </label>
        <label>
            <select className="lesson-template__sex" defaultValue={'lessonId' in props ? props.defAge : ''}
                    onInput={(ev: FormEvent<HTMLSelectElement>) => setAge(+ev.currentTarget.value as DesiredAge)}>
                <option value="0" selected={true}>Дошкольники</option>
                <option value="1">Младшеклассники</option>
                <option value="2">Ученики средней школы</option>
                <option value="3">Старшеклассники</option>
                <option value="4">Студенты</option>
                <option value="5">Взрослые</option>
            </select>
        </label>
        <button type='submit' className="lesson-template__save">Сохранить</button>
    </form>
)
}