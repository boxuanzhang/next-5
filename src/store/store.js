import Vue from 'vue'
import Vuex from 'vuex'
import {getRandomInt} from '../utils/utils'

Vue.use(Vuex)

const state = {
	info: {},
	fake_races: [
		{
			type: 'thoroughbred',
			name: 'Thoroughbred example.',
			competitors: [
				{
					name: 'fake thoroughbred competitor 1',
					position: '1'
				},
				{
					name: 'fake thoroughbred competitor 2',
					position: '2'
				},
				{
					name: 'fake thoroughbred competitor 3',
					position: '3'
				},
				{
					name: 'fake thoroughbred competitor 4',
					position: '4'
				},
			],
			closing_time: null
		},
		{
			type: 'greyhounds',
			name: 'Greyhounds example.',
			competitors: [
				{
					name: 'fake greyhounds competitor 1',
					position: '1'
				},
				{
					name: 'fake greyhounds competitor 2',
					position: '2'
				},
				{
					name: 'fake greyhounds competitor 3',
					position: '3'
				},
				{
					name: 'fake greyhounds competitor 4',
					position: '4'
				},
			],
			closing_time: null,
			closing_time_distance: ''
		},
		{
			type: 'harness',
			name: 'Harness example.',
			competitors: [
				{
					name: 'fake harness competitor 1',
					position: '1'
				},
				{
					name: 'fake harness competitor 2',
					position: '2'
				},
				{
					name: 'fake harness competitor 3',
					position: '3'
				},
				{
					name: 'fake harness competitor 4',
					position: '4'
				},
			],
			closing_time: null,
			closing_time_distance: ''
		},
		{
			type: 'thoroughbred',
			name: 'Another thoroughbred example.',
			competitors: [
				{
					name: 'fake thoroughbred competitor 1',
					position: '1'
				},
				{
					name: 'fake thoroughbred competitor 2',
					position: '2'
				},
				{
					name: 'fake thoroughbred competitor 3',
					position: '3'
				},
				{
					name: 'fake thoroughbred competitor 4',
					position: '4'
				},
			],
			closing_time: null,
			closing_time_distance: ''
		},
		{
			type: 'greyhounds',
			name: 'Greyhounds example.',
			competitors: [
				{
					name: 'fake greyhounds competitor 1',
					position: '1'
				},
				{
					name: 'fake greyhounds competitor 2',
					position: '2'
				},
				{
					name: 'fake greyhounds competitor 3',
					position: '3'
				},
				{
					name: 'fake greyhounds competitor 4',
					position: '4'
				},
			],
			closing_time: null,
			closing_time_distance: ''
		},
	],
	selected_race: null,
	loading: false,
	selected_types: [],
}

const mutations = {
	API_DATA_PENDING(state) {
		state.loading = true
	},

	API_DATA_SUCCESS(state, payload) {
		state.races   = payload
		state.loading = false
	},

	API_DATA_FAILURE(state, payload) {
		//	do something
	},

	selectRace(state, payload) {
		state.selected_race = payload
	},

	cancelSelectRace(state) {
		state.selected_race = null
	},

	updateSelectedTypes(state, payload) {
		if (state.selected_types.includes(payload)) {
			let index = state.selected_types.indexOf(payload)
			state.selected_types.splice(index, 1)
		} else {
			state.selected_types = (payload)
		}
	},

	fakeClosingTime(state) {
		state.fake_races.forEach(race => {
			race.closing_time = new Date()
			race.closing_time.setMinutes(race.closing_time.getMinutes() + getRandomInt(1, 5))
		})
	},
	getClosingTimeDistance(state) {
		state.fake_races.forEach(race => {
			let current_time = new Date()
			let distance     = race.closing_time.getTime() - current_time
			if (distance < 0) {
				race.closing_time_distance = 'expired'
				let index                  = state.fake_races.indexOf(race)
				state.fake_races.splice(index, 1)
				return
			}
			let temp                   = ''
			temp += Math.floor(distance / (1000 * 60 * 60 * 24)) ? Math.floor(distance / (1000 * 60 * 60 * 24)) + 'd ' : ''
			temp += Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ? Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 'h ' : ''
			temp += Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) ? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + 'm ' : ''
			temp += Math.floor((distance % (1000 * 60)) / 1000) ? Math.floor((distance % (1000 * 60)) / 1000) + 's ' : ''
			race.closing_time_distance = temp
		})
	},
}

const actions = {
	loadRaces(context, payload) {
		context.commit('API_DATA_PENDING')
		return axios.get('')
			.then(response => {
				context.commit('API_DATA_SUCCESS', response.data)
			})
			.catch(error => {
				context.commit('API_DATA_FAILURE', error)
			})
	},
	selectRace(context, payload) {
		context.commit('selectRace', payload)
	},

	cancelSelectRace(context) {
		context.commit('cancelSelectRace')
		context.commit('cancelSelectRace')
	},

	updateSelectedTypes(context, payload) {
		context.commit('updateSelectedTypes', payload)
	},

	getClosingTimeDistance(context) {
		setInterval(function () {
			context.commit('getClosingTimeDistance')
			if (context.state.fake_races.length < 5) {
				//call api
				// context.dispatch('loadRaces',5 - context.state.fake_races.length)
			}
		}, 1000)
	}

}

const getters = {
	races: state => {
		if (state.selected_types === undefined || state.selected_types.length === 0) {
			return state.fake_races.sort((a, b) => {
				if (a.closing_time > b.closing_time) {
					return 1
				}
				if (a.closing_time < b.closing_time) {
					return -1
				}
				return 0
			})
		}
		return state.fake_races.filter(race => state.selected_types.includes(race.type)).sort((a, b) => {
			if (a.closing_time > b.closing_time) {
				return 1
			}
			if (a.closing_time < b.closing_time) {
				return -1
			}
			return 0
		})
	}
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
})