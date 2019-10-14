<template>
  <v-layout align-start>
    <v-flex>
    <v-alert v-model="alert" dismissible type="success">Se ha registrado correctamente  </v-alert>
    <v-alert v-model="error" dismissible type="error">Ha ocurrido un error, no se pudo completar la operación</v-alert>
    <v-alert v-model="warning" dismissible type="warning">Se ha eliminado correctamente</v-alert>
      <v-toolbar flat color="white">
        <v-toolbar-title>Actividades</v-toolbar-title>
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
                     
                <v-flex xs12 sm12 md12 lg12 xl4>
                  <v-textarea v-model="descripcion" label="Descripcion" auto-grow rows="1" required prepend-icon="description"></v-textarea>
                </v-flex>

                <v-flex s12 sm4 md4 lg4 x4 >
                    <v-menu v-model="modal" :close-on-content-click="false" :nudge-right="10" lazy transition="scale-transition"
                        offset-y min-width="290px" >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fechaInicio" label="FechaInicio" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaInicio" @input="modal = false"></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-flex s12 sm4 md4 lg4 x4>
                      
                <v-menu v-model="modal2" :close-on-content-click="false" :nudge-right="10" lazy transition="scale-transition"
                        offset-y min-width="290px" >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fechaFin" label="FechaInicio" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="fechaFin" @input="modal2 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                
                 <v-flex s12 sm4 md4 lg4 x4>
                     <v-select v-model="prioridad" :items="prioridades" label="Prioridad" > </v-select>
                </v-flex>

                <v-flex xs12 sm12 md12 lg4 xl4>
                     <v-select v-model="estado" :items="estados" label="Estado" prepend-icon="edit"> </v-select>
                </v-flex>

                <v-flex xs12 sm12 md12 lg4 xl4>
                    <v-select v-model="proyectoId" :items="proyectos" label="Proyecto" prepend-icon="edit"> </v-select>
                </v-flex>

                <v-flex xs12 sm12 md12 lg4 xl4>
                    <v-select v-model="programadorId" :items="programadores" label="Programador" prepend-icon="edit"> </v-select>
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
                  <v-container class="text-center"> ¿Estás seguro de querer eliminar este Poryecto?</v-container>
              </v-card-title>
              <v-card-actions class="justify-center mb-3">
                  <v-btn color="blue"  class="mr-2" @click="elim=false">Cancelar</v-btn>
                  <v-btn color="blue" class="mr-2" @click="deleteItem()">Eliminar</v-btn>
              </v-card-actions>
          </v-card>
     </v-dialog>

     <v-data-table :headers="headers" :items="actividades" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-start ml-3 layout ">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>
          <td>{{ props.item.descripcion }}</td>
          <td>{{ props.item.prioridad }}</td>
          <td>{{ props.item.fechaInicio }}</td>
          <td>{{ props.item.fechaFin }}</td>
          <td>{{ props.item.estado }}</td>  
          <td>{{ props.item.programador.nombre }}</td>
          <td>{{ props.item.proyecto.nombre }}</td>
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
      actividades: [],
      nuevo:false,
      actividad: null,
      proyectos:[],
      programadores:[],
      modal:false,
      modal2:false,
      dialog: false,
      alert:false,
      error:false,
      warning:false,
      elim:false,
      confirmDelete:false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Descripcion", value: "descripcion", sortable: false },
        { text: "Prioridad", value: "prioridad", sortable: false },
        { text: "FechaInicio", value: "fechaInicio" },
        { text: "FechaFin", value: "fechaFin" },
        { text: "Estado", value: "estado", sortable: false },
        { text: "ProgramadorName", value: "programadorName", sortable: false },
        { text: "ProyectoName", value: "proyectoName", sortable: false }
      ],
       estados: [
        { text: "Emitido", value: 1, sortable: false },
        { text: "Cancelado", value: 0, sortable: false }
      ],
      prioridades: ['Baja', 'Alta'],
      search: "",
      editedIndex: -1,

      //TODO:Model
      id: "",
      descripcion: "",
      prioridad: "",
      fechaInicio: "",
      fechaFin: "",
      estado:"",
      programadorId:"",
      proyectoId:"",

    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Actividad" : "Actualizar Actividad";
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
    this.listarProgramdores();
    this.listarProyectos();

  },
  methods: {
    listar() {
      //TODO
      let me = this;
      axios
      .get("api/actividad")
      .then(function(response)
      {
          me.actividades = response.data;
          me.actividades.forEach(element => {
        element.fechaInicio = moment(String(element.fechaInicio)).format('YYYY-MM-DD');
        element.fechaFin = moment(String(element.fechaFin)).format('YYYY-MM-DD');
         });
      })
      .catch(function(error)
      {
          console.error(error);
      });
    },
    listarProgramdores()
    {
        let me = this;
            var programadoresArray = [];
            axios.get('api/programador')
            .then(function (response) {
                programadoresArray = response.data;
                programadoresArray.map((p) => {
                    me.programadores.push({
                        text: p.nombre,
                        value: p.id
                    });
                });
            }).catch(function (error) {
                console.log(error);
            });
    },
    listarProyectos()
    {
            let me = this;
            var proyectosArray = [];
            axios.get('api/proyecto')
            .then(function (response) {
                proyectosArray = response.data;
                proyectosArray.map((p) => {
                    me.proyectos.push({
                        text: p.nombre,
                        value: p.id
                    });
                });
            }).catch(function (error) {
                console.log(error);
            });
    },
    editItem(item) {
      //TODO
      this.id= item.id;
      this.descripcion=item.descripcion;
      this.prioridad= item.prioridad;
      this.fechaInicio= moment(String(item.fechaInicio)).format('YYYY-MM-DD');
      this.fechaFin= moment(String(item.fechaFin)).format('YYYY-MM-DD');
      this.estado = item.estado;
      this.programadorId= item.programadorId;
      this.proyectoId=item.proyectoId;

      this.editedIndex = 1;
      this.nuevo = true;
    },
    deletTemp(item)
    {
      let me = this;
      me.actividad = item;
      me.elim = true;
    },
    deleteItem()
    {
      let me= this; 
      axios
      .delete("api/actividad/"+ me.actividad.id)
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
    },
    limpiar() {

       this.id= "";
       this.descripcion="";
       this.prioridad= "";
       this.fechaInicio= "";
       this.estado= "";
       this.fechaFin= "";
       this.programadorId="";
       this.proyectoId="";
    },
    guardar() {
     //TODO
     if(this.editedIndex > -1)
     {
         // editar
         let me = this;
         axios
         .put("api/actividad", 
         {
             id: me.id,
             descripcion: me.descripcion,
             prioridad: me.prioridad,
             fechaInicio: me.fechaInicio,
             fechaFin: me.fechaFin,
             estado:me.estado,
             programadorId: me.programadorId,
             proyectoId:me.proyectoId,
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
         .post("api/actividad", 
         {
             descripcion: me.descripcion,
             prioridad: me.prioridad,
             fechaInicio: me.fechaInicio,
             fechaFin: me.fechaFin,
             estado:me.estado,
             programadorId: me.programadorId,
             proyectoId:me.proyectoId,
         })
         .then(function(response)
         {
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
