<template>

  <v-layout align-start>
    <v-flex>
    <v-alert v-model="alert" dismissible type="success">Se ha registrado correctamente  </v-alert>
    <v-alert v-model="error" dismissible type="error">Ha ocurrido un error, no se pudo completar la operación</v-alert>
    <v-alert v-model="warning" dismissible type="warning">Se ha eliminado correctamente</v-alert>
      <v-toolbar flat color="white">
        <v-toolbar-title>Programadores</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-divider v-model="sueldoVal" append-icon="search" class="mx-2" inset vertical style="width:10px;"></v-divider>
        <v-text-field v-model="sueldoVal" class="mt-3 mr-4 ml-2 " width=10 placeholder="Buscar por Sueldo" @keyup="ListarBySueldo()"></v-text-field>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn>
          <v-card>
            <v-card-title class="justify-center pt-4" >
              <span class="headline" >{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="apellidos" label="Apellidos"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="direccion" label="Direccion"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="telefono" label="Telefono"></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="sueldo" label="Sueldo"></v-text-field>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="elim" persistent max-width="430px">
          <v-card>
              <v-card-title class="justify-start pt-0">  
                  <v-container class="text-center"> ¿Estás seguro de querer eliminar a este programador?</v-container>
              </v-card-title>
              <v-card-actions class="justify-center mb-3">
                  <v-btn color="blue"  class="mr-2" @click="elim=false">Cancelar</v-btn>
                  <v-btn color="blue" class="mr-2" @click="deleteItem()">Eliminar</v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="programadores" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-start ml-3 layout ">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.apellidos }}</td>
          <td>{{ props.item.direccion }}</td>
          <td>{{ props.item.telefono }}</td>
          <td>{{ props.item.sueldo }}</td>
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
export default {
  data() {
    return {
      programadores: [],
      programador: null,
      dialog: false,
      alert:false,
      error:false,
      warning:false,
      elim:false,
      sueldoVal:"",
      confirmDelete:false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Apellidos", value: "apellidos", sortable: false },
        { text: "Direccion", value: "direccion" },
        { text: "Telefono", value: "telefono" },
        { text: "Sueldo", value: "sueldo" },
        { text: "Delete", value: "delete", sortable: false }
      ],
      search: "",
      editedIndex: -1,

      //TODO:Model
      id: "",
      nombre: "",
      apellidos: "",
      direccion: "",
      telefono: "",
      sueldo:"",

    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Programador" : "Actualizar Programador";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
       setTimeout(() => (this.alert = false), 2000);
       setTimeout(() => (this.warning = false), 2000);
       setTimeout(() => (this.error = false), 2000);
    },
  },

  created() {
    this.listar();

  },
  methods: {

    ListarBySueldo()
    {
      let me = this;
      axios
      .get("api/programador/getAllBySueldo/"+ me.sueldoVal)
      .then(function(response)
      {
          me.programadores = response.data;
      })
      .catch(function(error)
      {
          console.error(error);
      });
    },
    listar() {
      //TODO
      let me = this;
      axios
      .get("api/programador")
      .then(function(response)
      {
          me.programadores = response.data;
      })
      .catch(function(error)
      {
          console.error(error);
      });
    },
    editItem(item) {
      //TODO
      this.id = item.id;
      this.nombre = item.nombre;
      this.apellidos = item.apellidos;
      this.direccion = item.direccion;
      this.telefono = item.telefono;

      this.editedIndex = 1;
      this.dialog = true;
    },
    deletTemp(item)
    {
      let me = this;
      me.programador = item;
      me.elim = true;
    },
    deleteItem()
    {
      let me= this; 
      axios
      .delete("api/programador/"+ me.programador.id)
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
    close() {
      this.dialog = false;
      this.limpiar();
    },
    limpiar() {
      this.id = "";
      this.nombre = "";
      this.apellidos = "";
      this.direccion = "";
      this.telefono = "";
      this.programador = "{}";
    },
    guardar() {
     //TODO
     if(this.editedIndex > -1)
     {
         // editar
         let me = this;
         axios
         .put("api/programador", 
         {
             id: me.id,
             nombre: me.nombre,
             apellidos: me.apellidos,
             direccion: me.direccion,
             telefono: me.telefono,
            sueldo:me.sueldo
         })
         .then(function(response)
         {
             me.close();
             me.limpiar();
             me.listar();
             me.alert = true;
         })
         .catch(function(error)
         {
             console.log(error);
             me.error = true;
             me.close();
         });
     }
     else
     {
         // Guardar
         let me = this;
         axios
         .post("api/programador", 
         {
             nombre: me.nombre,
             apellidos: me.apellidos,
             direccion: me.direccion,
             telefono: me.telefono,
             sueldo:me.sueldo
         })
         .then(function(response)
         {
             me.close();
             me.limpiar();
             me.listar();
             me.alert=true;
          
         })
         .catch(function(error)
         {
             console.log(error);
             me.alert=false;
          
         });
     }
    }
  }
};
</script>
