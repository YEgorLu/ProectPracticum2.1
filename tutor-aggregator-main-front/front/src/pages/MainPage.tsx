import '../styles/index.css';
import {Pagination} from "../UI/pagination/Pagination";
import {MainNav} from "../UI/MainNav";
import {TeacherCard} from "../UI/TeacherCard";
import {Teacher, teachersSet} from "../data/teachers";
import {useEffect, useState} from "react";
import {useTeachers} from "../hooks/useTeachers";

type MainPageProps = {}

export type TeachersFromTo = {
    from: number,
    to: number
}

export function MainPage() {
    const [pagCount, teachersToShow, setShowTeachers] = useTeachers();

    return (
        <>
            <main className='main-page__main'>
                <MainNav/>
                <div className='cards'>
                    {teachersToShow.map((t) => <TeacherCard key={t.id} id={t.id} teacher={t}/>)}
                </div>
                <Pagination count={pagCount} set={setShowTeachers}/>
            </main>
        </>
    )
}