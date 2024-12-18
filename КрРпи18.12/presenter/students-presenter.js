import StudentsListComponent from "../view/students-list-component.js";
import StudentComponent from "../view/student-component.js";
import AddStudentComponent from "../view/add-student-component.js";
import { render } from "../framework/render.js";

export default class StudentsPresenter {
  constructor(container, studentsModel) {
    this.container = container;
    this.studentsModel = studentsModel;
    this.currentFilter = ""; 
  }

  init() {
    const addStudentComponent = new AddStudentComponent();
    const studentsListComponent = new StudentsListComponent();
    const filterElement = document.querySelector("#faculty-filter");

    render(document.querySelector(".registration-form"), addStudentComponent);
    render(this.container, studentsListComponent);

    this.setAddStudentHandler(addStudentComponent);
    this.setFilterHandler(filterElement);

    this.updateStudentsView();
  }

  updateStudentsView() {
    const students = this.studentsModel.getStudents();
    const filteredStudents = this.filterStudents(students, this.currentFilter);

    const listElement = document.querySelector("#applicants-container");
    listElement.innerHTML = ""; 

    if (filteredStudents.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "Нет совпадений по данным фильтрам";
        noResultsMessage.classList.add("no-results-message"); 
        listElement.appendChild(noResultsMessage);
    } else {
        this.renderStudents(filteredStudents);
    }

    document.querySelector("#total-applicants").textContent = students.length;
}



  filterStudents(students, filter) {
    if (!filter) return students;
  
    return students.filter(student => {
      const facultyMatch = student.faculty === filter;

      const nameMatch = student.name.includes(filter);

      return facultyMatch || nameMatch;
    });
  }


  renderStudents(students) {
    const listElement = document.querySelector("#applicants-container");
    listElement.innerHTML = "";

    students.forEach(student => {
      const studentComponent = new StudentComponent(
        student,
        this.handleDeleteStudent.bind(this),
      );
      render(listElement, studentComponent);
      studentComponent.setEventListeners();
    });
  }

  handleDeleteStudent(studentId) {
    this.studentsModel.deleteStudent(studentId);
    this.updateStudentsView();
  }

  setAddStudentHandler(formComponent) {
    formComponent.getElement().addEventListener("submit", event => {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const name = formData.get("fullname");
      const mail = formData.get("email");
      const phoneNumber = formData.get("phone");
      const faculty = formData.get("faculty");
  
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(mail)) {
        alert("Пожалуйста, введите корректный email.");
        return; 
      }

      const phonePattern = /^\+?\d{1,4}[-\s]?\(?\d{1,3}\)?[-\s]?\d{1,3}[-\s]?\d{1,4}[-\s]?\d{1,4}$/;
      if (!phonePattern.test(phoneNumber)) {
        alert("Пожалуйста, введите корректный номер телефона.");
        return;
      }
  
      const newStudent = {
        id: Date.now(),
        name,
        mail,
        phoneNumber,
        faculty
      };
  
      this.studentsModel.addStudent(newStudent);
      this.updateStudentsView();
      event.target.reset();
    });
  }
  

  setFilterHandler(filterElement) {
    filterElement.addEventListener("change", event => {
        this.currentFilter = event.target.value;
        this.updateStudentsView();
    });

    const nameFilterElement = document.querySelector("#search-input");
    nameFilterElement.addEventListener("input", event => {
        this.currentFilter = event.target.value;
        this.updateStudentsView();
    });
}


  
}
