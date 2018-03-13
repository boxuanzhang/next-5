<template>
	<div class="card" style="display: inline-block">
		<div class="card-content">
			<p class="title">{{ race.name }}</p>
			<p class="subtitle">
				{{ capitalizeFirstLetter(race.type) }}
			</p>
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="competitor in race.competitors">
						<td>{{ competitor.name }}</td>
						<td>{{ competitor.position }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<footer class="card-footer">
			<p class="card-footer-item">
      <span>
		  <a class="button is-primary is-small is-outlined" @click="cancelSelectRace">Back</a>
      </span>
			</p>
		</footer>
	</div>
</template>

<script>
	import {capitalizeFirstLetter} from '../utils/utils'

	export default {
		methods: {
			cancelSelectRace() {
				this.$store.dispatch('cancelSelectRace')
			},
			capitalizeFirstLetter(string){
				return capitalizeFirstLetter(string)
			}
		},
		computed: {
			race(){
				return this.$store.state.selected_race
			}
		},
	}
</script>