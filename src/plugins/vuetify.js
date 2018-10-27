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
    VMenu,
    VFooter,
    VToolbar,
    VNavigationDrawer,
    VList,
    VTooltip,
    VIcon,
    VImg,
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
        VNavigationDrawer,
        VCheckbox,
        VBtn,
        VFooter,
        VTooltip,
        VSubheader,
        VTextField,
        VForm,
        VTextarea,
        VDivider,
        VMenu,
        VToolbar,
        VList,
        VImg,
        VIcon,
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
