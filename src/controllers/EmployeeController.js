import Employee from "../models/Employee.js";

export default class EmployeeController {
	constructor() {
		this.storageKey = 'employees_data'; // ключ для локалстораджа
		this.employees = this.loadFromStorage(); // загружаем данные при инициализации

		// Если данных нет, добавляем моковы данные
		if (this.employees.length === 0) {
			this.initializeWithDemoData();
		}
	}

	// Начальные данные
	initializeWithDemoData() {
		const demoEmployees = [
			{
				firstName: 'Иван',
				lastName: 'Иванов',
				age: 30,
				experience: 5,
				address: 'г. Москва, ул. Ленина, д. 10'
			},
			{
				firstName: 'Мария',
				lastName: 'Петрова',
				age: 28,
				experience: 3,
				address: 'г. Санкт-Петербург, Невский пр., д. 25'
			},
			{
				firstName: 'Алексей',
				lastName: 'Сидоров',
				age: 35,
				experience: 10,
				address: 'г. Казань, ул. Баумана, д. 15'
			},
			{
				firstName: 'Елена',
				lastName: 'Смирнова',
				age: 32,
				experience: 7,
				address: 'г. Новосибирск, ул. Красный пр., д. 30'
			},
			{
				firstName: 'Дмитрий',
				lastName: 'Козлов',
				age: 27,
				experience: 2,
				address: 'г. Екатеринбург, ул. Малышева, д. 5'
			}
		];

		demoEmployees.forEach(empData => {
			const employee = new Employee(empData);
			this.employees.push(employee);
		});

		this.saveToStorage(); // сохраняем данные в локалсторадже
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
