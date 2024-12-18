import students from "../mock/student.js";

export default class StudentsModel {
  constructor() {
    this.students = students;
  }

  getStudents() {
    return this.students;
  }

  addStudent(student) {
    this.students.push(student);
  }

  deleteStudent(id) {
    this.students = this.students.filter(student => student.id !== id);
  }

  getStudentById(id) {
    return this.students.find(student => student.id === id);
  }

  updateStudent(updatedStudent) {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }
}
