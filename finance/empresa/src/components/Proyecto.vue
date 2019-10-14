<template>
  <v-layout align-start>
    <v-flex>
    <v-alert v-model="alert" dismissible type="success">Se ha registrado correctamente  </v-alert>
    <v-alert v-model="error" dismissible type="error">Ha ocurrido un error, verifique los datos</v-alert>
    <v-alert v-model="warning" dismissible type="warning">Se ha eliminado correctamente</v-alert>
      <v-toolbar flat color="white">
        <v-toolbar-title>Proyectos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider> 
        <v-text-field 
          class="text-xs-center ml-4"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-btn color="primary" dark class="mb-1 ml-5" @click="nuevo=true">Nuevo</v-btn>
      </v-toolbar>
    <v-container grid-list-sm class="pa-4 white" v-if="nuevo">
            <v-layout row wrap>
                <v-flex xs12 sm4 md4 lg6 x6>
                  <v-text-field v-model="nombre" label="Nombre" required prepend-icon="account_circle" ></v-text-field>
                </v-flex>

                <v-flex s12 sm4 md4 lg3 x4 >
                    <v-menu v-model="modal" :close-on-content-click="false" :nudge-right="10" lazy transition="scale-transition"
                        offset-y min-width="290px" >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fechaInicio" label="FechaInicio" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaInicio" @input="modal = false" ></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-flex s12 sm4 md4 lg3 x4>
                      
                <v-menu v-model="modal2" :close-on-content-click="false" :nudge-right="10" lazy transition="scale-transition"
                        offset-y min-width="290px" >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fechaFin" label="FechaFin" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaFin" @input="modal2 = false" ></v-date-picker>
                    </v-menu>
                </v-flex>
                
                <v-flex xs12 sm12 md12 lg12 xl4>
                  <v-textarea v-model="descripcion" label="Descripcion" auto-grow rows="1" required prepend-icon="description"></v-textarea>
                </v-flex>
                
                </v-layout>
                <!--text-xs-right colocar botones al final -->
                 <v-flex xs12 sm12 md12 lg12 xl4  >
                    <v-btn @click="nuevo=false,limpiar()" color="success" xs4 sm4 md4 lg4 x4 >Cancelar</v-btn>
                    <v-btn @click="guardar()" color="success" xs4 sm4 md4 lg4 x4 >Guardar</v-btn>
                </v-flex>
    </v-container>

    <v-dialog v-model="elim" persistent max-width="430px">
          <v-card>
              <v-card-title class="justify-start pt-0">  
                  <v-container class="text-center"> ¿Estás seguro de querer eliminar este Proyecto?</v-container>
              </v-card-title>
              <v-card-actions class="justify-center mb-3">
                  <v-btn color="blue"  class="mr-2" @click="elim=false">Cancelar</v-btn>
                  <v-btn color="blue" class="mr-2" @click="deleteItem()">Eliminar</v-btn>
              </v-card-actions>
          </v-card>
    </v-dialog>

     <v-data-table :headers="headers" :items="proyectos" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-start ml-3 layout ">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.descripcion }}</td>
          <td>{{ props.item.fechaInicio }}</td>  
          <td>{{ props.item.fechaFin}}</td>
           <td class="justify-start ml-3 layout ">
            <v-icon small class="mr-2" @click="deletTemp(props.item)">delete</v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>


import axios from "axios";
import moment from "moment"

export default {
  
  data() {
    return {
      proyectos: [],
      proyecto:null,
      nuevo:false,
      modal:false,
      modal2:false,
      fechaInicio:null,
      fechaFin:null,
      alert:false,
      error:false,
      dateFormat : 'yyyy-MM-dd',
      warning:false,
      elim:false,
      confirmDelete:false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Descripcion", value: "descripcion", sortable: false },
        { text: "FechaInicio", value: "fechaInicio" },
        { text: "FechaFin", value: "fechaFin" },
        { text: "Delete", value: "delete", sortable: false }
      ],
    /*nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],*/
      search: "",
      editedIndex: -1,

      //Model
      id: "",
      nombre: "",
      descripcion: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Proyecto" : "Actualizar Proyecto";
    }
  },

  watch: {
    nuevo() {
       setTimeout(() => (this.alert = false), 2000);
    },
    error()
    {
         setTimeout(() => (this.error = false), 2000);
    },
    warning()
    {
        setTimeout(() => (this.warning = false), 2000);
    }
  },

  created() {
    this.listar();


  },
  methods: {

    listar() {
      let me = this;
      axios
        .get("api/proyecto")
        .then(function(response) {
          //console.log(response);
          me.proyectos = response.data;
          me.proyectos.forEach(element => {
        element.fechaInicio = moment(String(element.fechaInicio)).format('YYYY-MM-DD');
        element.fechaFin = moment(String(element.fechaFin)).format('YYYY-MM-DD');
         });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editItem(item) {
      this.id = item.id;
      this.nombre = item.nombre;
      this.descripcion = item.descripcion;
      this.fechaInicio = moment(String(item.fechaInicio)).format('YYYY-MM-DD');
      this.fechaFin = moment(String(item.fechaFin)).format('YYYY-MM-DD');

      this.editedIndex = 1;
      this.nuevo = true;
    },
    deletTemp(item)
    {
      let me = this;
      me.proyecto = item;
      me.elim = true;
    },
    deleteItem()
    {
      let me= this; 
      axios
      .delete("api/proyecto/"+ me.proyecto.id)
      .then(function(response)
      {
        me.listar();
        me.limpiar();
        me.elim = false;
        me.warning = true;
      }).catch(function(error)
      {
        console.log(error);
        me.error=true;
      });
    },
    limpiar() {
      this.id = "";
      this.nombre = "";
      this.descripcion = "";
      this.fechaInicio = "";
      this.fechaFin = "";
    },
    guardar() {
      if (this.editedIndex > -1) {
        //Código para editar

        let me = this;
        axios 
          .put("api/proyecto", {
              id: me.id,
              nombre: me.nombre,
              descripcion: me.descripcion,
              fechaInicio: me.fechaInicio,
              fechaFin: me.fechaFin,
          })
          .then(function(response) {
            me.listar();
            me.limpiar();
            me.alert=true;
            me.nuevo = false;
          })
          .catch(function(error) {
            console.log(error);
            me.error = true;
            me.nuevo = false;
          });
      } else {
        //Código para guardar
        let me = this;
        let boolsave;
        axios
          .post("api/proyecto", {
            nombre: me.nombre,
            descripcion: me.descripcion,
            fechaInicio: me.fechaInicio,
            fechaFin: me.fechaFin,
          })
          .then(function(response) {
       
          if(response.data == true)
          {
            me.alert= true;
            me.nuevo=false;
            me.limpiar();
            me.listar(); 
            }
          else { 
            me.error=true;
          }

          })
          .catch(function(error) {
            console.log(error);
            this.error = true;
            me.nuevo=false;
          });
      }
    }
  }
};
</script>
