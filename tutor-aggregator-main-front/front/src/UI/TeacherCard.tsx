import teacherIMG from "../img/teacher.png";
import '../styles/teacherCard.css'
import {Link, useNavigate} from "react-router-dom";
import {pagesURLS} from "../pagesURLS";
import {Teacher} from "../data/teachers";
import {useParams} from "react-router";
import {TutorSearchDTO} from "../hooks/useTeachers";

type TeacherCardProps = {
    id: number,
    teacher: TutorSearchDTO
}

export function TeacherCard({id, teacher}: TeacherCardProps) {
    const {fullName, aboutMyself, region} = teacher

    return (
        <article className='teacher-card'>
            <img src={teacherIMG} alt={'Фото'}/>
            <h2>{fullName}</h2>
            <p className="teacher-skills">{}</p>
            <address className="teacher-address">{region}
            </address>
            <div className="stars"></div>
            <p className="feedback">{}</p>
            <div className="about">
                <p>О себе:</p>
                <p className="about-content">{aboutMyself?.slice(0, 50) + '...'}</p>
            </div>
            <Link to={pagesURLS.TEACHER_PROFILE + '/' + id} className="enroll">Записаться</Link>
        </article>
    )
}