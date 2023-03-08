import {useEffect, useState} from "react";
import {Teacher, teachersSet} from "../data/teachers";
import {TeachersFromTo} from "../pages/MainPage";
import axios from "axios";

export type TutorSearchDTO = {
    id: number,
    secondName?: string,
    firstName?: string,
    thirdName?: string,
    fullName?: string,
    birthDate?: string,
    sex?: string,
    photoRelativePath?: string,
    aboutMyself?: string,
    region?: string,
    howToCommunicate?: string,
    isVerifiedProfile?: boolean,
}

export function useTeachers(): readonly [number, TutorSearchDTO[], React.Dispatch<React.SetStateAction<TeachersFromTo>>] {
    const [teachers, setTeachers] = useState<TutorSearchDTO[]>([])
    const [pagCount, setPagCount] = useState<number>(0)
    const [showTeachers, setShowTeachers] = useState<TeachersFromTo>({from: 0, to: 5})
    const [teachersToShow, setTeachersToShow] = useState<TutorSearchDTO[]>(teachers.slice(showTeachers.from, showTeachers.to))

    useEffect(() => {
        axios.get<any, {data: TutorSearchDTO[]}>('https://localhost:7241/Search/GetItems')
            .then(r => {
                setTeachers(r.data)
                setTeachersToShow(r.data.slice(showTeachers.from, showTeachers.to));
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        console.log(teachers.slice)
        setTeachersToShow(teachers.slice(showTeachers.from, showTeachers.to))
    }, [showTeachers])

    useEffect(() => {
        setPagCount(Math.floor(teachers.length / 5));
    }, [teachers])

    return [pagCount, teachersToShow, setShowTeachers] as const;
}