<template>
    <div>
        <main id="home">
            <router-link :to="{ name: 'admin' }">ADMIN</router-link>
        </main>
    </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<style lang="scss" src="../assets/app.scss"></style>
