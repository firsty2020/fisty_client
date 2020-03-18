import React from 'react';
import logo from '../../assets/images/logo.png';
import waiter_img from '../../assets/images/firsty_block_illustration1.svg';
import carrier_img from '../../assets/images/firsty_block_illustration2.svg';
import driver_img from '../../assets/images/firsty_block_illustration3.svg';
import cs_image from '../../assets/images/firsty_block_illustration4.svg';
import sales_icon from '../../assets/icons/hr_icons/sales.svg';
import horeca_icon from '../../assets/icons/hr_icons/horeca.svg';
import retailer_icon from '../../assets/icons/hr_icons/retailer.svg';
import driver_icon from '../../assets/icons/hr_icons/drivers.svg';
import promoter_icon from '../../assets/icons/hr_icons/promo.svg';
import warehouse_icon from '../../assets/icons/hr_icons/warehouse.svg';
import team_member_1 from '../../assets/images/team_member_1.jpg';
import team_member_2 from '../../assets/images/team_member_2.jpg';
import team_member_3 from '../../assets/images/team_member_3.jpg';
import logo_white from '../../assets/images/logo_white.png';
import brand_logo_1 from '../../assets/images/brands/brand_logo1.png';
import brand_logo_2 from '../../assets/images/brands/brand_logo2.png';
import brand_logo_3 from '../../assets/images/brands/brand_logo3.png';
import brand_logo_4 from '../../assets/images/brands/brand_logo4.png';
import brand_logo_5 from '../../assets/images/brands/brand_logo5.png';
import './Landing.css';


const Landing = () => {
    return (
        <div>
            <header className="header">
                <div className="wrapper">
                    <div className="logo_wrapper">
                        <a href="#!">
                            <img src={logo} className="logo" alt="firsty logo"/></a>
                    </div>
                    <div className="header_panel">
                        <div className="work_time_data">
                            <a href="tel:+79216507521"
                               className="company_phone">+7 (921) 650-75-21</a>
                            <div className="time_data">
                                <time className="working_hours">Пн-Вс с
                                    10:00-20:00
                                </time>
                                <span className="working_location">По всей России</span>
                            </div>
                        </div>
                        <button
                            className="button--big button--color-main main">заказать
                            подбор
                        </button>
                        <div className="lang_block">
                            <p className="selected_lang" tabIndex="0">rus
                                <span className="icon-chevron"></span></p>
                            <div className="available_lang_wrapper">
                                <ul className="available_lang_list">
                                    <li className="available_lang_li"
                                        data-title="eng">english
                                    </li>
                                    <li className="available_lang_li"
                                        data-title="rus">russian
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <section className="hero_block">
                    <div className="wrapper">
                        <div className="hero_text_content">
                            <h1 className="hero_title">Соберем команду надежных
                                сотрудников</h1>
                            <p className="hero_paragraph">Сервис по массовому
                                подбору персонала по всей России и СНГ с оплатой
                                за результат: от водителей и кассиров до
                                аниматоров и бариста</p>
                            <form className="hero_form">
                                <input placeholder="Полное Имя"
                                       name="full-name"/>
                                <input placeholder="Номер Телефона"
                                       name="phone-num"/>
                                <button
                                    className="button--full button--color-main hero_button main"
                                    type="submit">заказать подбор
                                </button>
                            </form>
                        </div>
                        <div className="hero_illustrations">
                            <ul className="hero_ill_list">
                                <li className="hero_ill">
                                    <img
                                        src={waiter_img}
                                        alt="waiter"/></li>
                                <li className="hero_ill">
                                    <img
                                        src={carrier_img}
                                        alt="carrier"/></li>
                                <li className="hero_ill">
                                    <img
                                        src={driver_img}
                                        alt="driver"/></li>
                                <li className="hero_ill">
                                    <img
                                        src={cs_image}
                                        alt="cs"/></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="services_section">
                    <div className="wrapper">
                        <div className="we_will_help">
                            <h3 className="we_will_help_title">Мы заменим вам
                                полноценный отдел рекрутмента.<br/>Вы платите
                                только за результат.</h3>
                            <ul className="we_will_help_list">
                                <li>
                                    <h4 className="we_will_help_num">1 452
                                        000</h4>
                                    <p className="we_will_help_label">резюме в
                                        нашей базе</p>
                                </li>
                                <li>
                                    <h4 className="we_will_help_num">94</h4>
                                    <p className="we_will_help_label">Рекрутера</p>
                                </li>
                                <li>
                                    <h4 className="we_will_help_num">32 000</h4>
                                    <p className="we_will_help_label">закрытых
                                        вакансий в год</p>
                                </li>
                                <li>
                                    <h4 className="we_will_help_num">5 лет</h4>
                                    <p className="we_will_help_label">на рынке
                                        массового подбора</p>
                                </li>
                            </ul>
                        </div>
                        <div className="services_block">
                            <h3 className="services_block_title">Наши услуги по
                                массовому подбору</h3>
                            <div className="services_content_block">
                                <div className="services_content_inner">
                                    <h3 className="services_content_inner_title">Потоковый
                                        массовый подбор</h3>
                                    <p className="services_content_inner_paragraph">Для
                                        компаний, которым нужно обеспечить
                                        непрерывный набор персонала в любом
                                        объеме</p>
                                    <ul className="services_content_inner_list">
                                        <li>Настраиваем лидогенерацию в любых
                                            объемах по всей России и СНГ
                                        </li>
                                        <li>Проводим первичный скрининг
                                            кандидатов
                                        </li>
                                        <li>Делаем интеграцию с вашими
                                            внутренними сервисам
                                        </li>
                                        <li>Предоставляем аналитику по подбору
                                        </li>
                                    </ul>
                                </div>
                                <div className="services_right_block">
                                    <h3 className="services_content_inner_title">Проектный
                                        подбор персонала</h3>
                                    <p className="services_content_inner_paragraph">Если
                                        у вас сезонный бизнес или необходим
                                        персонал под конкретное мероприятие,
                                        промо-акцию в короткие сроки</p>
                                    <ul className="services_content_inner_list">
                                        <li>Поиск кандидатов в малых объемах
                                        </li>
                                        <li>Нет лишнего документаоборота и
                                            согласований
                                        </li>
                                        <li>Выгодные цены на подбор персонала
                                        </li>
                                        <li>Первые кандидаты уже на 3 день
                                            работ
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="personnel_selection_section">
                    <div className="wrapper">
                        <div className="section_title_wrapper"><h1
                            className="section_title">Сферы подбора
                            персонала</h1></div>
                        <div className="personnel_selection_grid">
                            <div className="personnel_selection_grid_el">
                                <img
                                    className="personnel_selection_icon"
                                    src={sales_icon}
                                    alt="sales"
                                />
                                <h3 className="personnel_selection_title">Продажи</h3>
                                <p className="personnel_selection_desc">Менеджеры
                                    по продажам b2b и b2c, надомники,
                                    специалисты полевых продаж</p>
                            </div>
                            <div className="personnel_selection_grid_el">
                                <img
                                    className="personnel_selection_icon"
                                    src={horeca_icon}
                                    alt="horeca"
                                />
                                <h3 className="personnel_selection_title">HoReCa</h3>
                                <p className="personnel_selection_desc">Официанты,
                                    повара, бармены, хостес, администраторы,
                                    бариста, горничные</p>
                            </div>
                            <div className="personnel_selection_grid_el">
                                <img
                                    className="personnel_selection_icon"
                                    src={retailer_icon}
                                    alt="retailer"
                                />
                                <h3 className="personnel_selection_title">Розничная
                                    торговля</h3>
                                <p className="personnel_selection_desc">Продавцы,
                                    кассиры, консультанты, мерчендайзеры,
                                    торговые представители, работники
                                    торгового зала</p>
                            </div>
                            <div className="personnel_selection_grid_el">
                                <img
                                    className="personnel_selection_icon"
                                    src={driver_icon}
                                    alt="drivers"
                                />
                                <h3 className="personnel_selection_title">Водители</h3>
                                <p className="personnel_selection_desc">Водители
                                    такси, грузового автотранспорта, специальных
                                    категорий транспорта</p>
                            </div>
                            <div className="personnel_selection_grid_el">
                                <img
                                    className="personnel_selection_icon"
                                    src={promoter_icon}
                                    alt="promoters"
                                />
                                <h3 className="personnel_selection_title">Промо
                                    персонал</h3>
                                <p className="personnel_selection_desc">Промоутеры,
                                    тайные покупатели, супервайзеры,
                                    аниматоры</p>
                            </div>
                            <div className="personnel_selection_grid_el">
                                <img
                                    className="personnel_selection_icon"
                                    src={warehouse_icon}
                                    alt="logistics"
                                />
                                <h3 className="personnel_selection_title">Склад
                                    и логистика</h3>
                                <p className="personnel_selection_desc">Кладовщики,
                                    Грузчики</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="how_we_work">
                    <div className="wrapper">
                        <div className="section_title_wrapper"><h1
                            className="section_title">Как мы работаем с
                            кандидатами</h1></div>
                        <div className="how_we_work_grid">
                            <div className="how_we_work_grid_el">
                                <h3 className="how_we_work_title">Скрининг
                                    кандидатов</h3>
                                <ul className="how_we_work_list">
                                    <li>Проверка кандидатов на соответствие
                                        требованиям клиента
                                    </li>
                                    <li>Тестирование</li>
                                    <li>Проверка мотивации</li>
                                    <li>Проверка владения русским языком</li>
                                    <li>Проверка наличия необходимых для
                                        трудоустойства документов
                                    </li>
                                    <li>Скоринг кандидата за 1 день</li>
                                </ul>
                            </div>
                            <div className="how_we_work_grid_el">
                                <h3 className="how_we_work_title">Различные виды
                                    интервью</h3>
                                <ul className="how_we_work_list">
                                    <li>Телефонное интервью</li>
                                    <li>Видео интервью</li>
                                    <li>Очное интервью</li>
                                </ul>
                            </div>
                            <div className="how_we_work_grid_el">
                                <h3 className="how_we_work_title">Информирование
                                    кандидатов</h3>
                                <ul className="how_we_work_list">
                                    <li>Рассказ о вакансии, условиях работы и
                                        обязанностях
                                    </li>
                                    <li>Работа с возражениями</li>
                                    <li>Ответы на вопросы кандидатов</li>
                                </ul>
                            </div>
                            <div className="how_we_work_grid_el">
                                <h3 className="how_we_work_title">Сопровождение
                                    кандидата</h3>
                                <ul className="how_we_work_list">
                                    <li>Координация приглашения на интервью к
                                        клиенту
                                    </li>
                                    <li>Пушинг кандидатов</li>
                                    <li>Сопровождение на оформление</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="book_block">
                    <div className="wrapper">
                        <h1 className="book_block_title">Закажите подбор и вы
                            получите первых<br/>кандидатов уже на 3-й день</h1>
                        <form className="book_block_form">
                            <input type="text" name="name"
                                   placeholder="Полное Имя"/>
                            <input type="text" name="phone"
                                   placeholder="Номер Телефона"/>
                            <button className="main">заказать подбор</button>
                        </form>
                    </div>
                </section>
                <section className="process_block">
                    <div className="process_block_inner">
                        <div className="process_title_wrapper">
                            <h2 className="process_title">Процесс работы с
                                нами</h2>
                        </div>
                        <div className="process_desc_and_nav">
                            <p className="process_paragraph">Удобный формат
                                сотрудничества: просто, прозрачно, без
                                рисков.</p>
                            <ul className="process_slider_nav">
                                <li className="process_slider_nav_item"
                                    data-index="prev"><span
                                    className="icon-arrow"></span></li>
                                <li className="process_slider_nav_item"
                                    data-index="next"><span
                                    className="icon-arrow"></span></li>
                            </ul>
                        </div>
                        <div className="process_slider">
                            <div className="owl-carousel owl-theme"
                                 id="process_slider">
                                <div className="item">
                                    <div className="process_slider_el">
                                        <span className="process_step">1<br/>этап</span>
                                        <h2 className="process_slide_title">Бриф.
                                            Профили. Сроки</h2>
                                        <p className="process_slide_desc">Детально
                                            изучаем особенности вашего бизнеса и
                                            ставим цели к проекту: уточняем
                                            объем работ, профили кандидатов и
                                            определяем сроки проекта.
                                            Подписываем договор.</p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="process_slider_el">
                                        <span className="process_step">2<br/>этап</span>
                                        <h2 className="process_slide_title">Настройка
                                            лидогенерации и первичного скрининга
                                            кандидатов</h2>
                                        <p className="process_slide_desc">Выстраиваем
                                            систему привлечения кандидатов
                                            (онлайн и оффлайн), проводим
                                            скрининг кандидатов и их
                                            тестирование по вашим
                                            требованиям</p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="process_slider_el">
                                        <span className="process_step">3<br/>этап</span>
                                        <h2 className="process_slide_title">Анализ
                                            и масштабирование</h2>
                                        <p className="process_slide_desc">Согласовываем
                                            с вами соответствие первых
                                            кандидатов с вашими потребностям,
                                            проводим оптимизацию и
                                            масштабируем.</p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="process_slider_el">
                                        <span className="process_step">4<br/>этап</span>
                                        <h2 className="process_slide_title">Координация
                                            и сопровождение</h2>
                                        <p className="process_slide_desc">Координация
                                            интервью кандидатов с нанимающими
                                            менеджерами, сбор обратной связи,
                                            вывод одобренных кандидатов на
                                            работу</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="compare_section">
                    <div className="wrapper">
                        <div className="section_title_wrapper"><h1
                            className="section_title">Сравнение нашей команды с
                            фрилансером, крупным агенством, штатным отделом
                            найма</h1></div>
                    </div>
                </section>
                <section className="our_team">
                    <div className="wrapper">
                        <div className="section_title_wrapper"><h1
                            className="section_title">Наша команда</h1></div>
                        <div className="team_members">
                            <div className="team_member">
                                <img
                                    className="team_member_thumbnail"
                                    src={team_member_1}
                                    alt="team member"
                                />
                                <h2 className="team_member_name">Виталий
                                    Регулян</h2>
                                <h4 className="team_member_role">Business
                                    Development</h4>
                                <p className="team_member_desc">Генеральный
                                    директор ООО «ЦентрПроф». На протяжении
                                    более 4 лет реализовывает проекты по
                                    подбору </p>
                                <a href="#!"
                                   className="team_member_more_button">Подробнее</a>
                            </div>
                            <div className="team_member">
                                <img
                                    className="team_member_thumbnail"
                                    src={team_member_2}
                                    alt="team member"
                                />
                                <h2 className="team_member_name">Эльвира Эршлер</h2>
                                <h4 className="team_member_role">Recruitment
                                    Operations</h4>
                                <p className="team_member_desc">Руководитель
                                    массового подбора и рекрутмента в Яндекс.Еда
                                    и Яндекс.Такси, Кидзании, Анкор. Опыт работы
                                    в рекрутменте 11 лет и </p>
                                <a href="#!"
                                   className="team_member_more_button">Подробнее</a>
                            </div>
                            <div className="team_member">
                                <img
                                    className="team_member_thumbnail"
                                    src={team_member_3}
                                    alt="team member"/>
                                <h2 className="team_member_name">Екатерина
                                    Августинович</h2>
                                <h4 className="team_member_role">Project
                                    Manager</h4>
                                <p className="team_member_desc">На протяжении
                                    3-х лет успешно реализовывает проекты в
                                    области рекрутмента и массового подбора </p>
                                <a href="#!"
                                   className="team_member_more_button">Подробнее</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="brands">
                    <div className="wrapper">
                        <a href="#!" className="brand_item">
                            <img src={brand_logo_1} alt="brand logo"/></a>
                        <a href="#!" className="brand_item">
                            <img src={brand_logo_2} alt="brand logo"/></a>
                        <a href="#!" className="brand_item"><img
                            src={brand_logo_3} alt=""/></a>
                        <a href="#!" className="brand_item"><img
                            src={brand_logo_4} alt="brand logo"/></a>
                        <a href="#!" className="brand_item"><img
                            src={brand_logo_5} alt="brand logo"/></a>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <div className="wrapper">
                    <div className="footer_col">
                        <a href="#!" className="footer_logo"><img
                            src={logo_white} alt=""/></a>
                        <p className="footer_info_paragraph">По вопросам
                            сотрудничества: ООО «Департамент успеха»<br/>ИНН
                            7839118920<br/>ОГРН 1197847142987</p>
                    </div>
                    <div className="footer_col">
                        <h3 className="footer_col_title">Контакты</h3>
                        <p className="footer_contact_paragraph"><a
                            href="mailto:hello@befirsty.com">hello@befirsty.com</a><br/><a
                            href="tel:+74951440334">+7 (495)
                            144-03-34</a><br/><a href="tel:+79216507521">+7
                            (921) 650-75-21</a></p>
                    </div>
                    <div className="footer_col">
                        <form className="footer_form">
                            <input className="footer_form_input" type="text"
                                   placeholder="Полное Имя"/>
                            <input className="footer_form_input" type="text"
                                   placeholder="Номер телефона"/>
                            <button className="footer_form_button main">заказать
                                подбор
                            </button>
                        </form>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;

