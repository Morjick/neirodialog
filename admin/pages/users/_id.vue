<template>
  <section>
    <div class="primery-flex" style="margin: 0px 0 30px;">
      <h1>{{ user.name }}</h1>
      <div class="flex align-center">
        <ui-button
          text="Сохранить"
          mod="outline"
          @click="save"
          style="margin-right: 10px;"
        />
        <ui-button
          :text="user.banned ? 'Разблокироавть' : 'Заблокировать'"
          mod="danger"
          @click="banned"
        />
      </div>
    </div>

    <div class="user-data">
      <div v-if="!updateUser">
        Email: <span>{{ user.email }}</span>
      </div>
      <div v-if="updateUser">
        Email:
        <input 
          type="text" 
          v-model="user.email"
          style="border: 1px solid #000; border-radius: 4px; margin-left: 5px; padding: 1px 3px; font-size: 16px;"
        >
      </div>
      <div v-if="updateUser">
        Имя: 
        <input 
          type="text" 
          v-model="user.name"
          style="border: 1px solid #000; border-radius: 4px; margin-left: 5px; padding: 1px 3px; font-size: 16px;"
        >
      </div>
      <div v-if="!updateUser">
        Имя: <span>{{ user.name }}</span>
      </div>
      <div>Разрешено добавлять продукты: <span>{{ user.legalProduct || 'Нет' }}</span></div>
    </div>

    <div class="user-permissions">
      <div 
        v-for="item in userPermissions" 
        :key="item.id" 
        class="user-item"
      >
        <h3>{{ item.title }}</h3>

        <label class="user-item-check" v-for="permission in item.child" :key="permission.id" :for="`userPermission-${permission.field}`">
          <input type="checkbox" v-model="permission.checked" :id="`userPermission-${permission.field}`">
          <p>{{ permission.title }}</p>
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserPage',
  middleware: ['auth'],
  async asyncData ({ $axios, params }) {
    try {
      const { data: { user: user} } = await $axios.get(`users/get-user/${params.id}`)

      return { user }
    } catch(e) {
      return {
        error: e,
        user: {}
      }
    }
  },
  data: () => ({
    userPermissions: [],
    name: ''
  }),
  computed: {
    ...mapGetters('permissions', ['getAllPermiddions']),
    ...mapGetters('app', ['permissions']),
    permissions() {
      return this.getAllPermiddions || []
    },
    updateUser () {
      return this.getPermission
    }
  },
  methods: {
    ...mapActions('app', ['getPermission']),
    async save () {
      try {
        const permissions = []
        this.userPermissions.forEach( el => {
          el.child.forEach( child => {
            if(child.checked) permissions.push(child.field)
          })
        })

        const user = {
          email: this.user.email,
          name: this.user.name,
          permissions,
          id: this.user.id,
          banned: this.user.banned
        }

        const data = await this.$axios.post('users/update', user)

        if (data.status == 200 || data.status == 204) {
          this.$router.push('/users')
        }
      } catch(e) {
        console.warn(e)
      }
    },
    banned () {
      this.user.banned = !this.user.banned
      console.log(this.user.banned)
    },
    readPermissions () {
      let permissons = []

      permissons = this.permissions.map( permission => {
        const child = permission.child.map( childElement => {
          const result = this.user.permissins.find(el => el == childElement.field)

          return {
            ...childElement,
            checked: result ? true : false
          }
        })
        return {
          ...permission,
          checked: false,
          child
        }
      })
      this.userPermissions = permissons || []
      
      return this.userPermissions
    }
  },
  mounted() {
    this.readPermissions()
  },
}
</script>
