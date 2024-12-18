import AbstractComponent from "../framework/view/abstract-component.js";


export default class StudentComponent extends AbstractComponent {
  constructor(student, onDelete) {
    super();
    this.student = student;
    this.onDelete = onDelete;
  }

  getTemplate() {
    return `
      <div class="student-card">
        <h3>${this.student.name}</h3>
        <p>Email: ${this.student.mail}</p>
        <p>Телефон: ${this.student.phoneNumber}</p>
        <p>Факультет: ${this.student.faculty}</p>
        <div class="actions">
          <button class="delete-btn">Удалить</button>
        </div>
      </div>
    `;
  }

  setEventListeners() {
    this.element.querySelector(".delete-btn").addEventListener("click", () => {
      this.onDelete(this.student.id);
    });

  }
}
