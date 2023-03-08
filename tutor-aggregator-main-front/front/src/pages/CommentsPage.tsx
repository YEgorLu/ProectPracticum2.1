import '../styles/commentsPage.css'
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import {Comment} from "../UI/comment/Comment";
import {Link, useNavigate} from "react-router-dom";
import {CommentCreate} from "../UI/comment/CommentCreate";

export type CommentDTO = {
    id: number,
    tutorLogin: string,
    text: string,
    score: number
}

export function CommentsPage({token, studLogin}: {studLogin: string, token: string}) {
    const [comments, setComments] = useState<CommentDTO[]>([]);
    const nav = useNavigate();
    let {login} = useParams();
    console.log(login)
    useEffect(() => {
        axios.get<any, { data: CommentDTO[] }>('https://localhost:7241/Comment/TutorComments?tutorLogin=' + login)
            .then(r => setComments(r.data))
            .catch(console.error)
    }, [])


    if (!login)
        return <p>Пользователь не найден</p>

    return (
        <main className='comments__main'>
            <aside className='comments__side-menu'>
                <ul className='comments__side-menu_list'>
                    <li className={`comments__side-menu_item`} onClick={() => nav(`/teacherProfile/${login}`)}><Link
                        to='#'>Назад</Link>
                    </li>
                </ul>
            </aside>
            <div className="comments__body">
                <CommentCreate studLogin={studLogin} tutorLogin={login} token={token} onCreate={(newComm) => setComments(prevState => [newComm, ...prevState])}/>
                {comments?.map(c => <Comment {...c}/>)}
            </div>
        </main>
    )
}