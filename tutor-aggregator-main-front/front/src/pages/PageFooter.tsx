import "../styles/footer.css"
import {Link} from "react-router-dom";

export function PageFooter(){
  return(
    <footer className="main-footer">
      <p className="footer__logo">retyt</p>
      <ul className="footer__main-list">
        <li className="footer-main-item">
          <ul className="footer__list">
            <li className="footer__item">
              <Link to='/'>О компании</Link>
            </li>
            <li className="footer__item">
              <Link to='/'>Наши контакты</Link>
            </li>
            <li className="footer__item">
              <Link to='/'>Юридическая информация</Link>
            </li>
            <li className="footer__item">
              <Link to='/'>Вакансии</Link>
            </li>
            <li className="footer__item">
              <Link to='/'>Наши соцсети</Link>
            </li>
          </ul>
        </li>
        <li className="footer-main-item">
          <h2>Наши проекты</h2>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to={'/'}>RETYT</Link>
            </li>
          </ul>
        </li>
        <li className="footer-main-item">
          <h2>Навигация по сайту</h2>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to='/'>Навигация</Link>
            </li>
            <li className="footer__item">
              <Link to='/'>Репетиторы</Link>
            </li>
            <li className="footer__item">
              <Link to='/'>Города</Link>
            </li>
          </ul>
        </li>
        <li className="footer-main-item">
          <h2>Условия пользования</h2>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to='/'>Пользовательское соглашение</Link>
            </li>
            <li className="footer__item">
              <Link to='/'>Обработка персональных данных</Link>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}