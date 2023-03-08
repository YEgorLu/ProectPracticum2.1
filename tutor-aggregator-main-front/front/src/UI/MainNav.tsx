import {Link} from "react-router-dom";
import '../styles/mainNav.css'

export function MainNav() {
  return (
    <aside className="nav">
      <h2>Навигация</h2>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to={'/'}>Подготовка к ЕГЭ</Link>
        </li>
        <li className="nav-item">
          <Link to={'/'}>Подготовка к ОГЭ</Link>
        </li>
        <li className="nav-item">
          <Link to={'/'}>Физика</Link>
        </li>
        <li className="nav-item">
          <Link to={'/'}>Математика</Link>
        </li>
        <li className="nav-item">
          <Link to={'/'}>Литература</Link>
        </li>
        <li className="nav-item">
          <Link to={'/'}>Русский язык</Link>
        </li>
        <li className="nav-item">
          <Link to={'/'}>Программирование</Link>
        </li>
        <li className="nav-item">
          <Link to={'/'}>Английский язык</Link>
        </li>
      </ul>
    </aside>
  )
}