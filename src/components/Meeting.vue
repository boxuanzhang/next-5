<template>
	<div class="box" style="display: inline-block">
		<label class="checkbox">
			<input type="checkbox" v-model="selected_types" value="thoroughbred">Thoroughbred
		</label>
		<label class="checkbox">
			<input type="checkbox" v-model="selected_types" value="greyhounds">Greyhounds
		</label>
		<label class="checkbox">
			<input type="checkbox" v-model="selected_types" value="harness">Harness
		</label>
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Distance To Close</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="race in showingRaces">
					<td>{{ race.name }}</td>
					<td>{{ capitalizeFirstLetter(race.type) }}</td>
					<td>{{ race.closing_time_distance }}</td>
					<td>
						<a class="button is-primary is-small is-outlined" @click="selectRace(race)">View</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import {capitalizeFirstLetter} from '../utils/utils'

	export default {
		methods: {
			selectRace(race) {
				this.$store.dispatch('selectRace', race)
			},
			capitalizeFirstLetter(string){
				return capitalizeFirstLetter(string)
			},
		},
		computed: {
			showingRaces() {
				return this.$store.getters.races
			},
			selected_types: {
				get() {
					return this.$store.state.selected_types
				},
				set(value) {
					this.$store.dispatch('updateSelectedTypes', value)
				}
			}
		},
	}
</script>

<style scoped>
	table {
		display: block;
		height: 260px;
		overflow: auto;
	}
</style>