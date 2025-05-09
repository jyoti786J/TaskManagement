import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Import Quasar components you're using
import { 
  QLayout, QHeader, QDrawer, QPageContainer, QPage, 
  QToolbar, QToolbarTitle, QBtn, QIcon, QList, QItem, 
  QItemSection, QItemLabel, QTable, QTr, QTd, QTh, 
  QDialog, QCard, QCardSection, QForm, QInput, 
  QSelect, QCheckbox, QRouteTab, QTabs
} from 'quasar'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
  components: {
    QLayout, QHeader, QDrawer, QPageContainer, QPage,
    QToolbar, QToolbarTitle, QBtn, QIcon, QList, QItem,
    QItemSection, QItemLabel, QTable, QTr, QTd, QTh,
    QDialog, QCard, QCardSection, QForm, QInput,
    QSelect, QCheckbox, QRouteTab, QTabs
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')