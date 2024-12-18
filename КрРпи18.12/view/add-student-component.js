import AbstractComponent from "../framework/view/abstract-component.js";

export default class AddStudentComponent extends AbstractComponent {
  getTemplate() {
    return `
      <form id="applicant-form">
        <input type="text" id="fullname" name="fullname" placeholder="ФИО" required>
        <input type="email" id="email" name="email" placeholder="Email" required>
        <input type="tel" id="phone" name="phone" placeholder="Телефон" required>
        <select id="faculty" name="faculty" required>
          <option value="">Выберите факультет</option>
          <option value="IT">Информационных технологий</option>
          <option value="ECONOMICS">Экономический</option>
          <option value="MEDICINE">Медицинский</option>
          <option value="HUMANITIES">Гуманитарный</option>
        </select>
        <button type="submit">Зарегистрировать</button>
      </form>
    `;
  }
}
