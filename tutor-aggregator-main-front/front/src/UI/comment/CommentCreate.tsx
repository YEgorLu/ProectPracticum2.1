import {FormEvent, useState} from "react";
import axios, {AxiosError} from "axios";
import '../../styles/commentCreate.css'
import {CommentDTO} from "../../pages/CommentsPage";
import {Simulate} from "react-dom/test-utils";

type CommentCreateProps = {
    tutorLogin: string;
    token: string;
    studLogin: string;
    onCreate?: (newComm: CommentDTO) => void;
}

export function CommentCreate({tutorLogin,studLogin, token, onCreate}: CommentCreateProps) {
    const [score, setScore] = useState<number>(5)
    const [text, setText] = useState<string>('');

    function onSubmit(ev: FormEvent) {
        ev.preventDefault();
        axios.post('https://localhost:7241/Comment/Create', {
            tutorLogin: tutorLogin,
            text: text,
            score: score,
            studentLogin: studLogin
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(r => {
                console.log(r)
                if (onCreate)
                    onCreate({id: 0, score: score, text: text, tutorLogin: tutorLogin});
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === 400)
                    alert('Вы уже оставили комментарий');
                console.error(err);
            })
    }

    return (
        <form className='comment comment-create' onSubmit={onSubmit}>
            <div className="comment-create__fields">
                <label>{'Оценка: '}
                    <input defaultValue={score} required={true} type="number" min={1} max={5} step={1} className="comment-create__score"
                           onChange={(ev: FormEvent<HTMLInputElement>) => setScore(+ev.currentTarget.value)}/>
                </label>
                <label className='comment-create__text_label'>{'Комментарий: '}
                    <textarea className="comment-create__text"
                              onChange={(ev: FormEvent<HTMLTextAreaElement>) => setText(ev.currentTarget.value)}/>
                </label>
            </div>
            <button className="comment-create__save" type='submit'>Сохранить</button>
        </form>
    )
}