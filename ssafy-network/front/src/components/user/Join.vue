<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <form>
                        <v-text-field v-model="id" label="ID" required></v-text-field>
                        <v-text-field :type="password" v-model="pwd" label="Password" required></v-text-field>
                        <v-text-field :type="password" v-model="pwdCheck" label="PasswordCheck" required></v-text-field>
                        <v-text-field v-model="name" label="Name" required></v-text-field>
                        <v-text-field v-model="nickname" label="NickName" required></v-text-field>
                        <v-select v-model="region" label="지역" :items="regions" :rules="[v => !!v || '지역을 선택해주세요.']" required></v-select>
                        <v-select v-model="year" label="기수" :items="years" :rules="[v => !!v || '기수를 선택해 주세요.']" required></v-select>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            id:'',
            pwd:'',
            pwdCheck:'',
            name:'',
            nickname:'',
            region:'',
            year:'',
            membership: false,
            regions:['서울','대전','구미','광주'],
            years:['1','2']
        }
    }
}
</script>
