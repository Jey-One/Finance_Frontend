<template>
  <v-app id="app"> 
    <v-navigation-drawer  app v-model="drawer" width="300" style="Background:white !important" temporary>
      <v-list dense >
        <template>
          <v-layout column align-center>
            <v-flex text-xs-center class="mt-4 mb-3">
              <v-btn style="width:90px ; height:90px;" icon class="mt-4 mb-2 prof">
                <img class="img_pro" style="" :src=user.urlImage alt="gg" />
                <v-icon @click="change=true" class="edit" style="position:absolute;">edit</v-icon>
              </v-btn>
              <p class="black--text subheading mt-3" style="font-weight:bold;">{{user.name}}</p>
            </v-flex>
          </v-layout>
        </template>

        <template>
          <v-list-tile :to="{name:'home'}"> 
            <v-list-tile-action style="color:black;">
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title style="color:black;">Inicio</v-list-tile-title>
          </v-list-tile>

        </template>
        <template>
          <v-list-tile :to="{name:'option'}">
            <v-list-tile-action style="color:black;">
              <v-icon>table_chart</v-icon>
            </v-list-tile-action>
            <v-list-tile-title style="color:black;">Calcular</v-list-tile-title>
          </v-list-tile>
        </template>
        <template>
          <v-list-tile :to="{name:'misLetras'}">
            <v-list-tile-action style="color:black;">
              <v-icon>table_chart</v-icon>
            </v-list-tile-action>
            <v-list-tile-title style="color:black;">Mis letras</v-list-tile-title>
          </v-list-tile>
        </template>
          <template>
          <v-list-tile @click="LogOut">
            <v-list-tile-action style="color:black;">
              <v-icon>table_chart</v-icon>
            </v-list-tile-action>
            <v-list-tile-title style="color:black;">Logout</v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="white darken-3" dark app flat>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-1">
        <v-toolbar-side-icon @click="isLoginMethod()" color="black" class="mr-2"></v-toolbar-side-icon>
        <span
          style="background:white !important;  color:black !important; font-family:Times;"
        >Finance</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="black">apps</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-dialog v-model="change" max-width="500px" persistent>
      <v-card>
          <!-- <v-card-title class="pt-0">  
              <v-container style="text-align:center; font-size: 1rem; font-weight:bold;">Cambio de Foto</v-container>
          </v-card-title> -->

          <v-card-text style="font-family:Times;">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12 style="text-align:center;">
                  <label for="changePro"> <v-icon small style="color:white; font-size:18px;">folder_open</v-icon> Upload Image</label>
                  <input id ="changePro" type="file" @change="SelectFile" accept="image/*" label="Image"> 
                  </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions class="justify-center">
              <v-btn color="blue" flat class="mr-2" @click="change=false"  style="text-transform: capitalize;">Cancelar</v-btn>
              <v-btn color="blue" flat class="mr-2" @click="loadFile"  style="text-transform: capitalize;">Confirmar</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
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
                :rules="[rules.min, rules.required]"
              >  
             
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                prepend-icon="lock"
                v-model="user.password"
                color="blue"
                label="Password"
                 type="password"
                 :rules="[rules.min, rules.required]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12 v-if="this.activeBtn==0">
              <v-text-field prepend-icon="edit" :rules="[rules.min, rules.required]" v-model="user.name" label="Name" color="blue"></v-text-field>
            </v-flex>
            <v-flex>
            <p v-if="passErr" style="color:red;text-align:center;font-size=0.9rem">Verifique los datos ingresados son correctos</p>
            </v-flex>
            <!--<v-flex xs12 sm12 md12 v-if="this.activeBtn==0">
              <v-text-field v-model="urlImage" @change="SelectFile()" label="Image" type="file" ref="file" color="green"></v-text-field>
            </v-flex> -->
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions style="justify-content:center; padding-bottom:20px;margin-top:-30px;">
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
  
    <v-content style="background:white;">
      <v-container fluid fill-height style="width:70vw;background:white;">
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import axios from 'axios'
import store from './store';
export default {
  name: "App",
  data() {
    return {
      passErr:false,
      rules: {
          required: value => !!value || 'Requerido.',
          min: v => v.length <= 10 || 'Max 10 caracteres',
        },
      progress:false,
      isLogin:false,
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
  },
  components:
  {
  },
  computed:{
  
  },
   watch: {
      passErr(val) {
        val && setTimeout(() => {
          this.passErr= false;
        }, 3000)
      },
    },
  created()
  {
    
    let me = this;
    if(localStorage.getItem('session') != null)
    me.user = JSON.parse(localStorage.getItem('session'));
  },
   methods: {
    isLoginMethod()
    {
      let me = this;
      if(!me.isLogin && localStorage.getItem('session') == null )
      {
        this.dialog = true;
      }
      else
      {
        this.drawer = !this.drawer;
      }
    },
    SelectFile(e)
    {
      this.file  = e.target.files[0];
    },
    loadFile()
    {
      let me = this;
      let reader = new FileReader();
      reader.readAsDataURL(this.file); 
      reader.onload = e =>
      {
        me.user.urlImage = e.target.result;
        me.actualiza();
        //this.changeLink(e.target.result);
        //this.User.urlImage = e.target.result;
        this.change=false;
      }
    },
    actualiza()
    {
      let me = this;
      axios.put("api/users/",
      {
        id: me.user.id,
        username: me.user.username,
        password: me.user.password,
        name: me.user.name,
        urlImage: me.user.urlImage
      })
      .then(function(response)
      {
        if(response.data == true)
        {
          console.log(response)
        }
      })
      .catch(function(error)
      {
        console.log(error);
      })
    },
    login()
    {
    
      let me = this;
      if(me.user.username.length == 0 && me.user.password.length == 0) 
      {
        me.passErr = true;
        return;
      }
      console.log("Gola")
      axios.get("api/users/"+me.user.username+"/"+me.user.password)
      .then(function(response)
      {
        console.log(response.data);
        let aux = response.data;
        if (aux != null && aux !="")
        {
          me.user = response.data;
          me.isLogin = true;
          me.dialog = false;
          localStorage.setItem("session",JSON.stringify(me.user));
          me.$router.push({name:"progress"});
          me.limpiar();
        }
      })
      .catch(function(error)
      {
        me.passErr=true;
        console.log(error);
      })  
    },
    limpiar()
    {
      let me = this;
      me.isLogin = false;
      me.drawer = false;
      me.user.id = "";
      me.user.username="";
      me.user.password ="";
      me.user.name = "";
      me.user.urlImage ="";
    },
    LogOut()
    {
      let me = this;
      localStorage.removeItem("session");
      me.limpiar();
    },
    register()
    {
      let me = this;
       if(me.user.username.length == 0 && me.user.password.length == 0 && me.user.name.length == 0) 
      {
        me.passErr = true;
        return;
      }
      me.user.urlImage ='https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png';
      axios.post("api/users",
      {
        username: me.user.username,
        password: me.user.password,
        name: me.user.name,
        urlImage: me.user.urlImage
      })
      .then(function(response)
      {
        if(response.data == true)
        {
          me.limpiar();
        }
        console.log(response);
       
      })
      .catch(function(error)
      {
        me.passErr=true;
        console.log(error);
      })
    }
   }
};
</script>

<style >
.edit
{
 display: none;
 color: white;
 width: 90px;
 height: 90px;
 padding-top: 5%;
 border-radius: 50%;
}
.prof:hover .edit
{
  display: inherit;
  background: black;
  color: white;
  opacity: 0.7;

}
label[for="changePro"] {
  font-family: sans-serif, 'Lucida Sans';
  font-style:bold;
  font-size: 14px;
  color: #fff;
  background-color:#2F84DF;
  display: inline-block;
  transition: all .5s;
  cursor: pointer;
  padding: 10px !important;
  text-transform: capitalize;
  width: fit-content;
  text-align: center;
  border-radius: 7%;
 }
#changePro
 {
   display: none;
   visibility: hidden;
 }
.img_pro
{
  width: 85px;
  height: 85px;
  border-radius: 55%;
}
</style>