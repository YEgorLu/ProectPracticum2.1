import {Week} from "./UI/lesson/LessonEdit";

export class Translator{
    static getWeekName(week: Week): string{
        switch(week){
            case Week.Sunday: return 'Воскресенье'
            case Week.Monday: return 'Понедельник'
            case Week.Tuesday: return 'Вторник'
            case Week.Wednesday: return 'Среда'
            case Week.Thursday: return 'Четверг'
            case Week.Friday: return 'Пятница'
            case Week.Saturday: return 'Суббота'
        }
    }
}