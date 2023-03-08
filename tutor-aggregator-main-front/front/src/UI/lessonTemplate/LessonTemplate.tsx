import {SetStateAction, useState} from "react";
import axios from "axios";
import {DesiredAge, DesiredSex, LessonFormat} from "../../LessonTypes";
import '../../styles/lesson-template.css'
import {Modal} from "../Modal";
import {LessonTemplateEdit} from "./LessonTemplateEdit";


export type LessonTemplateDTO = {
    id: number,
    name: string,
    price: number,
    description: string,
    lessonFormat: LessonFormat,
    desiredSex: DesiredSex,
    desiredAge: DesiredAge
}

type LessonProps = {
    name: string,
    price: number | string,
    description: string,
    lessonFormat: LessonFormat,
    desiredSex: DesiredSex,
    desiredAge: DesiredAge
}

export function LessonTemplate({
                                   self,
                                   id,
                                   name,
                                   price,
                                   description,
                                   lessonFormat,
                                   desiredSex,
                                   desiredAge,
                                   token,
                                   setLessons
                               }: LessonTemplateDTO & { self: boolean; token?: string, setLessons: React.Dispatch<SetStateAction<LessonTemplateDTO[]>> }) {

    const [showModal, setShowModal] = useState<boolean>(false);

    function onDelete() {
        axios.delete(`https://localhost:7241/LessonTemplate/Delete?templateId=${id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(() => setLessons((prevState: LessonTemplateDTO[]) => prevState.filter(l => l.id !== id)))
            .catch(console.error)
    }


    return (
        <div className="lesson-template">
            <p className="lesson-template__name">{name}</p>
            <p className="lesson-template__price">{'Стоимость: '}{price}</p>
            <p className="lesson-template__desc">{'Описание: '}{description}</p>
            <p className="lesson-template__format">{'Формат: '}{lessonFormat}</p>
            <p>Предпочтения</p>
            <div className="lesson-template__desired">
                <p className="lesson-template__sex">{'Пол: '}{desiredSex}</p>
                <p className="lesson-template__age">{'Возраст: '}{desiredAge}</p>
            </div>
            {self && token &&
              <div className="lesson-template__buttons">
                <button className="lesson-template__edit" onClick={() => setShowModal(true)}>Редактировать</button>
                <Modal show={showModal} onClose={() => setShowModal(false)} title={name}>
                  <LessonTemplateEdit token={token} defName={name} defAge={desiredAge} defDesc={description}
                                      defFormat={lessonFormat} defPrice={price} defSex={desiredSex}
                                      onLessonChangeSave={(les: LessonTemplateDTO) => {
                                          setShowModal(false);
                                          setLessons(prevState => {
                                              const thisId = prevState.map(l => l.id).indexOf(les.id);
                                              return [...prevState.slice(0, thisId), les, ...prevState.slice(thisId + 1)];
                                          })
                                      }} lessonId={id}/>
                </Modal>
                <button className="lesson-template__delete" onClick={onDelete}>Удалить</button>
              </div>
            }
        </div>
    )
}