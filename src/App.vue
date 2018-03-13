<template>
	<div id="app" class="container">
		<race v-if="$store.state.selected_race !== null"></race>
		<meeting v-else></meeting>
	</div>
</template>

<script>
	import Race from './components/Race'
	import Meeting from './components/Meeting'

	export default {
		name: 'App',
		components: {
			Race,
			Meeting
		},
		methods: {
			getRaces(numNeedToAdd) {
				axios.get('/api/races/')
					.then(response => {
						if (numNeedToAdd !== undefined) {
							response.data.races.sort((a, b) => {
								if (a.closing_time > b.closing_time) {
									return 1
								}
								if (a.closing_time < b.closing_time) {
									return -1
								}
								return 0
							})
							for (let index = 0; index < numNeedToAdd; index++) {
								this.races.push(response.data.races[index])
							}
						} else {
							this.races = response.data
						}
					})
					.catch(error => {
						if (error.response.data.errors) {
							alert(error.response.data.errors.join("\n"))
						} else {
							alert('Sorry, something went wrong. Please reload the page and try again.')
						}
					});
			},
		},
		created() {
			this.$store.commit('fakeClosingTime')
			this.$store.dispatch('getClosingTimeDistance')
		}
	}
</script>

<style>
	#app {
		margin-top: 10%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
