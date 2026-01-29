export default class Employee { // класс для создания сотрудника
  constructor({ id, firstName, lastName, age, experience, address }) {
    this.id = id || Date.now(); // уникальный id
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.age = age || 0;
    this.experience = experience || 0;
    this.address = address || '';
  }
}
