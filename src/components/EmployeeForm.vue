<template>
	<div v-if="visible" class="modal" @click.self="closeForm">
		<div class="modal-content">
			<div class="modal-header">
				<h3>{{ employee.id ? 'Редактировать' : 'Добавить' }} сотрудника</h3>
				<button type="button" class="close-btn" @click="closeForm" aria-label="Закрыть">
					<CloceIcon />
				</button>
			</div>

			<form @submit.prevent="handleSubmit">
				<div class="form-group">
					<label for="firstName">Имя <span class="required">*</span></label>
					<input id="firstName" v-model="localEmployee.firstName" type="text" placeholder="Введите имя"
						required autocomplete="given-name" />
				</div>

				<div class="form-group">
					<label for="lastName">Фамилия <span class="required">*</span></label>
					<input id="lastName" v-model="localEmployee.lastName" type="text" placeholder="Введите фамилию"
						required autocomplete="family-name" />
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="age">Возраст <span class="required">*</span></label>
						<input id="age" type="number" v-model.number="localEmployee.age" min="18" max="100"
							placeholder="18" required />
					</div>

					<div class="form-group">
						<label for="experience">Стаж (лет) <span class="required">*</span></label>
						<input id="experience" type="number" v-model.number="localEmployee.experience" min="0" max="80"
							placeholder="0" required />
					</div>
				</div>

				<div class="form-group">
					<label for="address">Адрес <span class="required">*</span></label>
					<input id="address" v-model="localEmployee.address" type="text" placeholder="Введите адрес" required
						autocomplete="street-address" />
				</div>

				<div class="buttons">
					<button type="submit" class="btn-primary">
						Сохранить
					</button>
					<button type="button" @click="closeForm">
						Отмена
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import CloceIcon from './icons/CloceIcon.vue';	

export default {
	components: {
		CloceIcon
	},
	props: {
		visible: Boolean,
		employee: Object
	},
	emits: ['save', 'close'],
	data() {
		return {
			localEmployee: { ...this.employee } // создаем локальную копию для редактирования
		};
	},
	watch: {
		employee(newVal) {
			this.localEmployee = { ...newVal }; // обновляем форму при изменении prop
		}
	},
	methods: {
		handleSubmit() {
			this.$emit('save', this.localEmployee);
			this.closeForm();
		},
		closeForm() {
			this.$emit('close');
		}
	}
};
</script>

<style scoped>
.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 2px solid var(--border-color);
}

.modal-header h3 {
	margin: 0;
}

.close-btn {
	background: transparent;
	border: none;
	font-size: 2rem;
	line-height: 1;
	cursor: pointer;
	color: var(--text-light);
	padding: 0;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	transition: all 0.2s ease;
}

.close-btn:hover {
	background: var(--bg-light);
	color: var(--text-dark);
	transform: none;
}

.form-group {
	margin-bottom: 1.25rem;
}

.form-group:last-of-type {
	margin-bottom: 0;
}

.form-group label {
	margin-top: 0;
	margin-bottom: 0.5rem;
}

.form-row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
}

.required {
	color: var(--danger-color);
}

input::placeholder {
	color: var(--text-light);
	opacity: 0.6;
}

@media (max-width: 480px) {
	.form-row {
		grid-template-columns: 1fr;
	}
}
</style>
