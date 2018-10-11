import Vue from 'vue'
import {
    Vuetify,
    VApp,
    VGrid,
    VDataTable,
    VBtn,
    VForm,
    VTextField,
    VCheckbox,
    VCard,
    VDivider,
    VSelect,
    VSubheader,
    VTextarea,
    transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
    components: {
        VApp,
        VGrid,
        VDataTable,
        VCard,
        VSelect,
        VCheckbox,
        VBtn,
        VSubheader,
        VTextField,
        VForm,
        VTextarea,
        VDivider,
        transitions
    },
    theme: {
        primary: '#4455ff',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    iconfont: 'fa',
})
