<template>
    <div>
        <main id="dash">
            <b-container>
                <b-row align-h="center">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <b-button variant="success">
                                        <router-link :to="{ name: 'create.user' }" class="my-btn">NEW</router-link>
                                    </b-button>
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Permission</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="index">
                                <td></td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td v-for="(role, index) in user.roles" :key="`roles-${index}`">{{ role.display_name }}</td>
                                <td class="text-right">
                                    <b-button variant="primary">
                                      <router-link :to="`/user-edit/${user.id}`" class="my-btn" >EDIT</router-link>
                                    </b-button>
                                    <b-button variant="danger" @click="showModal(index, user.id)">DELETE</b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-row>
            </b-container>
            <b-modal ref="my-modal" hide-footer title="ALERT">
                <div class="d-block text-center">
                    <h3>Hello From My Modal!</h3>
                </div>
                <b-button class="mt-3" variant="danger" block @click="deleteUser()">DELETE</b-button>
                <b-button class="mt-2" variant="primary" block @click="hideModal">CANCEL</b-button>
            </b-modal>
        </main>
    </div>
  </template>

<script>

export default {
  name: 'dash',
  data () {
    return {
      users: {},
      index: 0,
      userId: 0
    }
  },
  methods: {
    showModal (index, userId) {
      this.index = index
      this.userId = userId
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    deleteUser () {
      const self = this
      let token = sessionStorage.getItem('token')
      this.$axios.delete('/users/delete/' + this.userId, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(function (success) {
          self.users.splice(self.index, 1)
          self.$refs['my-modal'].hide()
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            self.$router.push({name: 'login'})
          } else {
            alert(error)
          }
        })
    }
  },
  mounted () {
    const self = this
    this.$axios.get('/users', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then(function (success) {
        self.users = success.data
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          self.$router.push({name: 'login'})
        } else {
          alert(error)
        }
      })
  }
}
</script>
