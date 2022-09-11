<template>
    <div>
        <main id="user">
            <b-container>
                <b-row align-h="center">
                  <h2>New User</h2>
                </b-row>
                <b-row align-h="center">
                    <b-form class="mt-30" v-on:submit.prevent="submitForm">
                        <b-form-group label="Name:">
                            <b-form-input type="text" required v-model="name"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Email address:">
                            <b-form-input type="email" required v-model="email"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Password:">
                            <b-form-input type="password" v-model="password" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Roles:">
                            <b-form-select label="Roles:" v-model="roles[0].id" required>
                                <option value="1">Administrator</option>
                            </b-form-select>
                        </b-form-group>
                        <b-button type="submit" :disabled="!canSubmit || sending" v-html="sending ? '...' : 'SUBMIT'" variant="primary"></b-button>
                    </b-form>
                </b-row>
            </b-container>
            <router-link :to="{ name: 'admin' }">TO ADMIN</router-link>
        </main>
    </div>
</template>

<script>
export default {
  name: 'userCreate',
  data () {
    return {
      id: '',
      name: '',
      email: '',
      password: '',
      roles: [
        {'id': ''}
      ],
      sending: false
    }
  },
  methods: {
    submitForm () {
      const self = this
      let token = sessionStorage.getItem('token')
      if (this.canSubmit) {
        self.sending = true
        this.$axios.post('/users/create', {
          email: this.email,
          password: this.password.trim(),
          name: this.name,
          roles: this.roles
        }, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
          .then(function (success) {
            self.sending = false
            self.$router.push({name: 'admin'})
          })
          .catch(function (error) {
            if (error.response.status === 401) {
              self.$router.push({name: 'login'})
            } else {
              alert(error)
            }
            self.sending = false
          })
      }
    }
  },
  mounted () {
    if (!sessionStorage.getItem('token')) {
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    canSubmit () {
      return this.email && this.name && this.roles[0].id && this.password
    }
  }
}
</script>
<style lang="scss" src="./assets/app.scss"></style>
