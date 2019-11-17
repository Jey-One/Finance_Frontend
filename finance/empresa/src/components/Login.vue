<template>
    <v-layout text-xs-center wrapv-layout> 
        <v-btn @click.native="dialog=!dialog" color=primary> Click me</v-btn>
        
    <v-dialog v-model="dialog" max-width="500px" height="500px" persistent>
    <v-card>
      <div style="font-family:Times;">
        <v-tabs v-model="activeBtn" white slider-color="blue" grow background-color="transparent">
          <v-tab :key="0" ripple>Registrase</v-tab>
          <v-tab :key="1" ripple>Iniciar Sesión</v-tab>
        </v-tabs>
      </div>
      <v-card-text style="font-family:Times;">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field
                prepend-icon="person"
                v-model="user.username"
                label="Username"
                color="blue"
              >  
              <v-icon>home</v-icon>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                prepend-icon="lock"
                v-model="user.password"
                color="blue"
                label="Password"
                 type="password"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12 v-if="this.activeBtn==0">
              <v-text-field prepend-icon="edit" v-model="user.name" label="Name" color="blue"></v-text-field>
            </v-flex>
            <!--<v-flex xs12 sm12 md12 v-if="this.activeBtn==0">
              <v-text-field v-model="urlImage" @change="SelectFile()" label="Image" type="file" ref="file" color="green"></v-text-field>
            </v-flex> -->
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions style="justify-content:center; padding-bottom:20px;">
        <v-btn color="blue darken-1" flat @click.native="dialog=false" >Exit</v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click.native="login"
          v-if="this.activeBtn==1"
        >Log In</v-btn>
        <v-btn color="blue darken-1" flat @click.native="register" v-if="this.activeBtn==0"
        >Registrarse</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
   </v-layout>
  </template>

<script>
  export default {
    data () {
      return {
        overlay: false,
        isLogin:true,
        file:"",
        change:false,
        drawer: false,
        dialog:false,
        activeBtn:0,
        user: 
        {   
            id : "",
            username:"",
            password:"",
            name:"",
            urlImage:""
        }
    };
    }
  }
</script>