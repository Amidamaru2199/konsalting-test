import Employee from "../models/Employee.js";

export default class EmployeeController {
	constructor() {
		this.storageKey = 'employees_data'; // ключ для локалстораджа
		this.employees = this.loadFromStorage(); // загружаем данные при инициализации
	}

	// загрузка данных из localStorage
	loadFromStorage() {
		try {
			const data = localStorage.getItem(this.storageKey); // получили данные из локалстораджа
			if (data) {
				const parsed = JSON.parse(data); // парсим дынные из локалстораджа
				// Преобразуем обычные объекты в экземпляры Employee
				return parsed.map(emp => new Employee(emp));
			}
		} catch (error) {
			console.error('Ошибка загрузки данных из localStorage:', error);
		}
		return [];
	}

	// метод сохранения данных в локалсторадже
	saveToStorage() {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(this.employees)); // записываем ключ в локалсторадж
		} catch (error) {
			console.error('Ошибка сохранения данных в localStorage:', error);
		}
	}
	
	// добавление сотрудника
	addEmployee(employeeData) {
		// console.log(employeeData);
		const employee = new Employee(employeeData); // создаем экземпляр сотрудника
		// console.log(employee);
		this.employees.push(employee); // пушим его в массив сотркдников
		this.saveToStorage(); // сохраняем после добавления
		return employee; // возвращаем массив
	}

	//обновление сотрудника
	updateEmployee(id, updatedData) {
		const index = this.employees.findIndex(emp => emp.id === id); // находим индекс сотрудника по id
		if (index !== -1) { // tckb jy tcnm
			this.employees[index] = { ...this.employees[index], ...updatedData }; // обновляем данные сотрудника
			this.saveToStorage(); // сохраняем после обновления
		}
	}

	// удаление
	deleteEmployee(id) {
		this.employees = this.employees.filter(emp => emp.id !== id); // фильтруем и возвращаем все кроме того кто совпал
		this.saveToStorage(); // сохраняем после удаления
	}


	getAllEmployees() {
		return this.employees; // возвращаем сотрудников
	}

	// очистка всех сотрудникав
	clearAllData() {
		this.employees = []; // возвращаем сотрудников
		localStorage.removeItem(this.storageKey); // удаляе из локалстораджа
	}
}
