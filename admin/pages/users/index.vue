<template>
  <section>
    <div class="primery-flex" style="margin: 0px 0 30px;">
      <h1>Пользователи</h1>
      <ui-button
        text="Создать"
        mod="outline"
      />
    </div>

    <div>
      <div class="users-table">
        <div 
          class="users-table-header"
        >
          <div 
            v-for="h in header"
            :key="h.name"
            class="users-table-header-item"
            :style="`width: ${h.width}`"
          >{{ h.title }}</div>
        </div>
        <div class="users-table-body">
          <div 
            v-for="(item, ind) in users"
            :key="item.id"
            @click="pushToUser(item)"
            class="users-table-item"
          >
            <span 
              v-for="slot in header"
              :key="slot.name"
              :style="`width: ${slot.width}`"
            >{{ item[slot.name] || ind + 1 }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UiButton from '../../components/ui/UiButton.vue'
export default {
  components: { UiButton },
  name: 'UsersPage',
  middleware: ['auth'],
  async asyncData ({ $axios }) {
    try {
      const { data: { users } } = await $axios.get('users/get-users')

      return { users }
    } catch(e) {
      return { users: [], error: e }
    }
  },
  data: () => ({
    header: [
      {
        name: 'index',
        width: 'calc(5%)',
        field: null,
        title: '№'
      },
      {
        name: 'id',
        width: 'calc(5%)',
        field: 'id',
        title: 'ID'
      },
      {
        name: 'name',
        width: 'calc(45%)',
        field: 'name',
        title: 'Имя пользователя'
      },
      {
        name: 'email',
        width: 'calc(45%)',
        field: 'email',
        title: 'Email пользователя'
      },
    ]
  }),
  computed: {
  },
  methods: {
    pushToUser (item) {
      this.$router.push(`/users/${item.id}`)
    }
  },
  mounted() {
  },
}
</script>
