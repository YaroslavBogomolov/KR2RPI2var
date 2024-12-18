import AbstractComponent from "../framework/view/abstract-component.js";

export default class StudentsListComponent extends AbstractComponent {
  getTemplate() {
    return `<div id="applicants-container" class="students-list"></div>`;
  }
}
