import emptyStar from '../img/emptyStar.png'
import star from '../img/star.png'
import {useEffect, useState} from "react";

export function RatingStars({rating, clsName = 'rating'}: {rating: number, clsName?: string}){
    const [stars, setStars] = useState<(typeof emptyStar)[5]>([emptyStar,emptyStar,emptyStar,emptyStar,emptyStar])

    useEffect(() => {
        const newStars: (typeof emptyStar)[] = [...stars]
        for (let i = 0; i < rating; i++){
            newStars[i] = star;
        }
        for (let i = rating; i < 5; i++){
            newStars[i] = emptyStar;
        }
        setStars(newStars);
    }, [rating])

    return (
        <div className={clsName}>
            {stars.map((s: typeof emptyStar, i: number) => <img key={i} height={23} width={22} src={s} alt="Звезда"/>)}
        </div>
    )
}