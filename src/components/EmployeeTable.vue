<template>
	<div>
		<div v-if="employees.length === 0" class="empty-state">
			<AvatarIcon />
			<p>Список сотрудников пуст</p>
		</div>

		<table v-else>
			<thead>
				<tr>
					<th>Имя</th>
					<th>Фамилия</th>
					<th>Возраст</th>
					<th>Стаж (лет)</th>
					<th>Адрес</th>
					<th>Действия</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="employee in employees" :key="employee.id">
					<td>{{ employee.firstName }}</td>
					<td>{{ employee.lastName }}</td>
					<td>{{ employee.age }}</td>
					<td>{{ employee.experience }}</td>
					<td>{{ employee.address }}</td>
					<td class="actions">
						<button class="btn-edit" @click="$emit('edit', employee)">
							Редактировать
						</button>
						<button class="btn-delete" @click="$emit('delete', employee.id)">
							Удалить
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import AvatarIcon from './icons/AvatarIcon.vue';

export default {
	components: {
		AvatarIcon
	},
	props: {
		employees: Array
	},
	emits: ['edit', 'delete']
};
</script>

<style scoped>
.empty-state {
	text-align: center;
	padding: 4rem 2rem;
	color: var(--text-light);
}

.empty-state svg {
	color: var(--border-color);
	margin-bottom: 1rem;
}

.actions {
	white-space: nowrap;
}

.actions button {
	margin-right: 0.5rem;
	margin-bottom: 0.25rem;
}

@media (max-width: 768px) {
	table {
		display: block;
		overflow-x: auto;
		white-space: nowrap;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.actions button {
		margin: 0;
		width: 100%;
	}
}
</style>
