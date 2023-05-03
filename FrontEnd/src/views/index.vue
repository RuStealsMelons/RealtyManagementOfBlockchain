<script setup>
import Login from './login.vue'



</script>

<template>
    <div class="top-bar"></div>
    <div class="nr">
        <router-view></router-view>
        <!-- <Login /> -->
    </div>

</template>

<style scoped>
.top-bar{
    width: 100%;
    height: 50px;
    background-color: antiquewhite;
}
.nr{
    width: 100%;
}
</style>