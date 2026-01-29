<template>
	<div>
		<div class="header">
			<h1>Управление сотрудниками</h1>
			<button class="btn-primary" @click="openForm()">
				<span class="btn-icon">+</span> Добавить сотрудника
			</button>
		</div>

		<div class="card">
			<EmployeeTable :employees="controller.getAllEmployees()" @edit="openForm" @delete="deleteEmployee" />
		</div>

		<EmployeeForm :visible="formVisible" :employee="selectedEmployee" @save="saveEmployee" @close="closeForm" />
	</div>
</template>

<script>
import EmployeeController from "../controllers/EmployeeController.js";
import EmployeeForm from "../components/EmployeeForm.vue";
import EmployeeTable from "../components/EmployeeTable.vue";

export default {
	components: { EmployeeForm, EmployeeTable },

	data() {
		return {
			controller: new EmployeeController(),
			formVisible: false,
			selectedEmployee: {}
		};
	},
	methods: {
		openForm(employee = {}) { // открытие формы
			this.selectedEmployee = employee;
			this.formVisible = true;
		},
		saveEmployee(employeeData) {
			if (employeeData.id) {
				this.controller.updateEmployee(employeeData.id, employeeData);
			} else {
				this.controller.addEmployee(employeeData);
			}
			this.closeForm();
		},
		deleteEmployee(id) {
			if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
				this.controller.deleteEmployee(id);
			}
		},
		closeForm() {
			this.formVisible = false;
			this.selectedEmployee = {};
		}
	}
};
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	flex-wrap: wrap;
	gap: 1rem;
}

.btn-icon {
	font-size: 1.5rem;
	line-height: 1;
	margin-right: 0.5rem;
}

@media (max-width: 768px) {
	.header {
		flex-direction: column;
		align-items: stretch;
	}

	.header button {
		width: 100%;
	}
}
</style>
