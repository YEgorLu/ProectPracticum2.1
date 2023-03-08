import userFoto from "../img/nekit.png";
import {FormEvent, SetStateAction} from "react";

type studentProfileEditInputsProps = {
    setName: React.Dispatch<SetStateAction<string>>,
    setSecondName: React.Dispatch<SetStateAction<string>>,
    setThirdName: React.Dispatch<SetStateAction<string>>,
    setCity: React.Dispatch<SetStateAction<string>>,
    setAge: React.Dispatch<SetStateAction<string>>,
    setSex: React.Dispatch<SetStateAction<string>>,
    setAbout: React.Dispatch<SetStateAction<string>>
}

export function StudentProfileEditInputs({
                                             setName,
                                             setSecondName,
                                             setThirdName,
                                             setCity,
                                             setAge,
                                             setSex,
                                             setAbout
                                         }: studentProfileEditInputsProps){
    return(
        <>
            <section className="profile-edit__main-info" id={'profile-edit__main-info'}>
                <img src={userFoto} alt="Фото пользователя" className="profile-edit__user-photo"/>
                <div className="profile-edit__main-info_data">
                    <label>Фамилия: 
                        <input type="text" className="profile-edit_second-name"
                               onInput={(ev: FormEvent<HTMLInputElement>) => setSecondName(ev.currentTarget.value)}/>
                    </label>
                    <label>Имя: 
                        <input type="text" className="profile-edit_name"
                               onInput={(ev: FormEvent<HTMLInputElement>) => setName(ev.currentTarget.value)}/>
                    </label>
                    <label>Отчество: 
                        <input type="text" className="profile-edit_third-name"
                               onInput={(ev: FormEvent<HTMLInputElement>) => setThirdName(ev.currentTarget.value)}/>
                    </label>
                    <label>Город: 
                        <input type="text" className='profile-edit__city'
                               onInput={(ev: FormEvent<HTMLInputElement>) => setCity(ev.currentTarget.value)}/>
                    </label>
                    <label>Дата рождения: 
                        <input type="date" min="0" className='profile-edit__age'
                               onInput={(ev: FormEvent<HTMLInputElement>) => setAge(ev.currentTarget.value)}/>
                    </label>
                    <label>Пол: 
                        <select name='sex' className='profile-edit__sex' defaultValue='мужской'
                                onInput={(ev: FormEvent<HTMLSelectElement>) => setSex(ev.currentTarget.value)}>
                            <option selected={true} value="мужской">мужской</option>
                            <option value="женский">женский</option>
                        </select>
                    </label>
                </div>
            </section>
            <section className="profile-edit__about" id='profile-edit__about'>
                <h2>О себе</h2>
                <textarea onInput={(ev: FormEvent<HTMLTextAreaElement>) => setAbout(ev.currentTarget.value)}/>
            </section>
        </>
    )
}