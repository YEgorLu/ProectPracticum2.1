import {CommentDTO} from "../../pages/CommentsPage";
import '../../styles/comment.css';
import {RatingStars} from "../RatingStars";
import stUser from '../../img/stUser.jpg'

export function Comment(props: CommentDTO){

    return (
        <div className="comment">
            <div className="comment__header">
                <img className='comment__img' height={50} width={50} src={stUser} alt='Фото'/>
                <RatingStars rating={props.score}/>
            </div>
            <p className='comment__desc'>{props.text}</p>
        </div>
    )
}