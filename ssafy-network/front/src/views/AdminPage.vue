<template>
    <v-container>
        <h1>admin page</h1>
        <v-btn to="/admin/user">유저관리</v-btn>
        <v-btn to="/admin/chat">채팅방관리</v-btn>
        <v-btn to="/admin/notice">공지사항관리</v-btn>
        <v-btn to='/admin/dep'>부서관리</v-btn>
        <router-view></router-view>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>