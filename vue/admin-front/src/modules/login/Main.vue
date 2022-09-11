<template>
    <div>
        <main id="login">
            <b-container>
                <h2 class="text-center mt-30">Hello user</h2>
                <b-row align-h="center">
                    <b-form class="mt-30" v-on:submit.prevent="submitForm">
                        <b-form-group label="Email address:">
                            <b-form-input type="email" required v-model="email"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Password:">
                            <b-form-input type="password" required v-model="password"></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary" :disabled="!canSubmit || sending" v-html="sending ? '...' : 'SUBMIT'"></b-button>
                    </b-form>
                </b-row>
            </b-container>
        </main>
    </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      sending: false
    }
  },
  methods: {
    submitForm () {
      const self = this
      if (this.canSubmit) {
        self.sending = true
        this.$axios.post('/login', {
          email: this.email,
          password: this.password
        })
          .then(function (success) {
            let token = success.data.access_token
            sessionStorage.setItem('token', token)
            self.sending = false
            self.$router.push({name: 'admin'})
          })
          .catch(function (error) {
            alert(error)
            self.sending = false
          })
      }
    }
  },
  computed: {
    canSubmit () {
      return this.email && this.password
    }
  }
}
</script>

<style lang="scss" src="./assets/sass/app.scss"></style>
