import { createApp } from 'vue'
import App from './App.vue'
import store from './store'; // Import the Vuex store
import './styles/index.css'


import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret)
library.add(faChevronRight)
library.add(faCircleCheck)
library.add(faCircleXmark)
library.add(faPerson)




createApp(App).use(store).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');