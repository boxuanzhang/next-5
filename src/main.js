window.axios = require('axios');

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>'
})
