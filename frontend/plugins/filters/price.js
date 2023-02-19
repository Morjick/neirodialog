import Vue from 'vue'

Vue.filter('priceFilter', (count) => String(count).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))