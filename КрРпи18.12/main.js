import StudentsModel from "./model/students-model.js";
import StudentsPresenter from "./presenter/students-presenter.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".applicants-list");
  const studentsModel = new StudentsModel();
  const studentsPresenter = new StudentsPresenter(container, studentsModel);

  studentsPresenter.init();
});
