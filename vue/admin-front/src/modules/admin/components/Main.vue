<template>
    <div>
        <main id="admin">
            <Dash v-if="proceed" />
            <router-link :to="{ name: 'home' }">TO HOME</router-link>
        </main>
    </div>
</template>

<script>
import Dash from './dash/Main'

export default {
  name: 'admin',
  components: { Dash },
  data () {
    return {
      proceed: false
    }
  },
  mounted () {
    if (sessionStorage.getItem('token')) {
      this.proceed = true
    } else {
      this.$router.push({name: 'login'})
    }
  }
}
</script>
<style lang="scss" src="../assets/sass/app.scss"></style>
