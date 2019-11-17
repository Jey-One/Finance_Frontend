<template>
<v-layout text-xs-center wrapv-layout > 
    <div class = "team" style="width:80vw;" >
        <h2 class=" font-weight-bold mb-1">Mis Letras</h2>
        <v-container class="my-5" >
            <v-layout row wrap style="width:100%">
                <v-flex xs12 sm6 md4 lg3 v-for="letra in misLetras" :key="letra.id">
                    <v-card flat class="text-xs-center ma-3" color="#26c6da">
                        <v-responsive class="pt-4">
                            <div class="title">{{letra.denominacion}}</div>
                        </v-responsive>
                        <v-card-text>
                            <div style="display:flex; justify-content:space-between"> Valor Nominal: <p></p> {{letra.valorNominal}}</div>
                            <div style="display:flex; justify-content:space-between"> Nombre Girado: <p></p> {{letra.nombreGirado}}</div>
                            <div style="display:flex; justify-content:space-between"> F. Vencimiento: <p></p> {{moment(letra.fechaVencimiento).format('DD-MM-YYYY')}}</div>
                            <div style="display:flex; justify-content:space-between"> Lugar Pago: <p></p> {{letra.lugarPago}}</div>
                        </v-card-text>
                        <v-card-actions>
                            <b-button-group>
                            <v-btn small flat color="blue" @click="agregarCartera(letra)">
                                <span>Agregar</span>
                            </v-btn>
                            <v-btn small flat color="green" @click="editarLetra(letra)">
                                <span>Editar</span>
                            </v-btn>
                            <v-btn small flat color="red" @click="eliminarLetra(letra)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                            </b-button-group>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-row justify="center">
        <v-dialog v-model="dialog" max-width="70VW" light no-click-animation > 
        <template v-slot:activator="{ on }" >
            <v-btn  dark class="btn btn-primary mt-5" v-on="on">Agregar Letra</v-btn>
            <v-btn  dark class="btn btn-primary mt-5" @click="calcularCartera">Calcular Cartera</v-btn>
            <v-row>
  <!--           <div v-if="res">
                <div style="width:100%;display:flex;border-radius:10px;padding: 20px 40px;background:#454545;color:white;margin-top:40px" v-for="person in carteraLetras" :key="person.letra">
                    <div style="width:50%; display:flex;flex-direction:column;text-align:start" class="ml-4 mt-4">
                        <div style="display:flex; justify-content:space-between">  <p>Letra </p> <p>{{letra.id}}</p></div>
                    </div>
                </div>
                <div style="width:50%; display:flex;flex-direction:column;text-align:start" class="ml-4 mt-4">
                    <div style="display:flex; justify-content:space-between">  <p>TCEA </p> <p> Calculo </p></div>
                </div>
            </div> -->
            </v-row>
        </template>
        <div style="width:100%;margin: 0 auto">
        <v-stepper v-model="e1">
        <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" color="blue" step="1">Datos de la Letra</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" color="blue" step="2">Personas asociadas</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" color="blue" step="3">Gastos Iniciales</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step  color="blue" step="4">Gastos Finales</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
        <v-stepper-content step="1">
        <v-card>
        <v-card-text>
            <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="Denominacion" label="Titulo de la Letra" color="#000000" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="LugarGiro" label="Lugar de Giro" color="#000000" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="FechaGiro" label="Fecha de Giro" readonly v-on="on" color="#000000"></v-text-field>
                        </template>
                    <v-date-picker v-model="FechaGiro" @input="menu1 = false" color="#0008FF"></v-date-picker>                        
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" v-model="ValorNominal" label="Valor Nominal" color="#000000"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="FechaVencimiento" label="Fecha de Vencimiento" readonly v-on="on" color="#000000"></v-text-field>
                        </template>
                    <v-date-picker v-model="FechaVencimiento" @input="menu2 = false" color="#0008FF"></v-date-picker>                        
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="LugarPago" label="Lugar Pago" color="#000000" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="Retencion" label="Retencion" color="#000000" required></v-text-field>
                </v-col>

                </v-row>
            </v-container>
            </v-card-text>
              <v-card-actions style="display:flex;justify-content:center">
                        <v-btn
                        color="blue"
                          outline
                        round
                        @click="e1 = 2"
                        >
                        Continue
                        </v-btn>
                     </v-card-actions>
            </v-card>
       
        </v-stepper-content>

        <v-stepper-content step="2">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="NombreGirado" label="Nombre Girado" color="#000000" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field type="number" v-model="DniGirado" label="Dni Girado" color="#000000"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="NombreBeneficiario" label="Nombre Beneficiario" color="#000000" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="NombreGirador" label="Nombre Girador" color="#000000" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field type="number" v-model="DniGirador" label="Dni Girador" color="#000000"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                     <v-card-actions style="display:flex;justify-content:center">
                            <v-btn
                        color="blue"
                          outline
                        round
                        @click="e1 = 1"
                        >
                        Atras
                        </v-btn>
                        <v-btn
                        color="blue"
                          outline
                        round
                        @click="e1 = 3"
                        >
                        Continue
                        </v-btn>
                     </v-card-actions>
            </v-card>

       
            
        </v-stepper-content>

        <v-stepper-content step="3">
            <v-card>
                <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>

                                    <v-row>
                                    <v-col>
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-select v-model="MotivoInicial" :items="Motivo" label="Motivo" color="#000000"></v-select>

                                        <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Estos corresponden a los costes o gastos que deben pagarse al acreedor para realizar la operación, y que se descontarán del Valor Neto</span>                             
                                        <v-spacer></v-spacer>
                                        <span>(diferencia entre el Valor Nominal y Descuento); estos montos afectarán al cálculo de la Tasa de Coste Efectivo Anual (T.C.E.A.).</span>
                                        </v-tooltip>

                                    </v-flex>
                                    </v-col>
                                    </v-row>
<!-- 
                                    <v-spacer></v-spacer>

                                    <v-row>
                                    <v-col>
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-select v-model="TipoVI" :items="TipoValor" label="Valor Expresado en: " color="#000000" ></v-select>

                                        <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Ingresar el monto en efectivo o en porcentaje, segun sea el caso</span>                             
                                        </v-tooltip>

                                    </v-flex>
                                    </v-col>
                                    </v-row> -->

                                    <v-spacer></v-spacer>

                                    <v-row>
                                    <v-col>
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-text-field type="number" v-model="ValorCosteI" label="Valor: " color="#000000"></v-text-field>
                                    </v-flex>
                                    </v-col>
                                    </v-row>

                                    <v-spacer></v-spacer>

                                    <v-row>
                                    <v-col>
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-btn class="mx-2" fab dark color="indigo" @click.native="agregarCosteInicial(MotivoInicial,ValorCosteI)">ADD</v-btn>
                                    </v-flex>
                                    </v-col>
                                    </v-row>
                                    
                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-spacer></v-spacer>
                                        <v-spacer></v-spacer>
                                        <v-data-table :headers="cabeceraDetalles" :items="CInicial" hide-actions class="elevation-1">
                                            <template slot="items" slot-scope="props">
                                                
                                                <td class="justify-center layout px-0">
                                                    <v-icon small class="mr-2" @click="eliminarDetalle(CInicial,props.item)">delete</v-icon>
                                                </td>
                                                        
                                                <td>
                                                    <v-text-field type="string" v-model="props.item.motivo"></v-text-field>
                                                </td>

                                                <td>
                                                    <v-text-field type="number" v-model="props.item.valor" ></v-text-field >
                                                </td>   
                                            </template>
                                        </v-data-table>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                        </v-card-text>
                           <v-card-actions style="display:flex;justify-content:center">
                            <v-btn
                             
                        color="blue"
                        outline
                        round
                        @click="e1 = 2"
                        >
                        Atras
                        </v-btn>
                        <v-btn
                        color="blue"
                          outline
                        round
                        @click="e1 = 4"
                        >
                        Continue
                        </v-btn>
                     </v-card-actions>
                    </v-card>
        </v-stepper-content>
           <v-stepper-content step="4">
         <v-card >
                        <v-card-text class="px-4">
                            <v-container grid-list-md>
                                <v-layout wrap>

                                    <v-row>
                                    <v-col>
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-select v-model="MotivoFinal" :items="Motivo" label="Motivo" color="#000000"></v-select>

                                        <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Estos corresponden a los costes o gastos que deben pagarse al acreedor al finalizar la operación, y que se agregarán al Valor Nominal.</span>                             
                                        <v-spacer></v-spacer>
                                        <span>Estos montos afectarán al cálculo de la Tasa de Coste Efectivo Anual (T.C.E.A.).</span>
                                        </v-tooltip>


                                    </v-flex>
                                    </v-col>
                                    </v-row>

                                    <v-spacer></v-spacer>

                                 <!--    <v-row>
                                    <v-col>
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-select v-model="TipoVF" :items="TipoValor" label="Valor Expresado en: " color="#000000"></v-select>

                                        <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Ingresar el monto en efectivo o en porcentaje, segun sea el caso</span>                             
                                        </v-tooltip>
                                        
                                    </v-flex>
                                    </v-col>
                                    </v-row>

                                    <v-spacer></v-spacer> -->

                                    <v-row>
                                    <v-col>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field type="number" v-model="ValorCosteF" label="Valor: " color="#000000"></v-text-field>
                                    </v-flex>
                                    </v-col>
                                    </v-row>

                                    <v-spacer></v-spacer>

                                    <v-row>
                                    <v-col>
                                    <v-btn class="mx-2" fab dark color="indigo" @click.native="agregarCosteFinal(MotivoFinal,ValorCosteF)">ADD</v-btn>
                                    </v-col>
                                    </v-row>

                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                        <v-data-table :headers="cabeceraDetalles" :items="CFinal" hide-actions class="elevation-1">
                                            <template slot="items" slot-scope="props" >
                                                <td class="justify-center layout px-0">
                                                    <v-icon small class="mr-2" @click="eliminarDetalle(CFinal,props.item)">delete</v-icon>
                                                </td>
                                                        
                                                <td>
                                                    <v-text-field type="string" v-model="props.item.motivo"></v-text-field>
                                                </td>

                                                <td>
                                                    <v-text-field type="number" v-model="props.item.valor"></v-text-field>
                                                </td>   
                                            </template>
                                        </v-data-table>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                               <v-card-actions style="display:flex;justify-content:center">
                            <v-btn
                        color="blue"
                          outline
                        round
                        @click="e1 = 3"
                        >
                        Atras
                        </v-btn>
                        <v-btn
                        color="blue"
                          outline
                        round
                        @click="e1 = 4"
                        >
                        Guardar
                        </v-btn>
                     </v-card-actions>
                    </v-card>

        </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
    </div>
        </v-dialog>

    </v-row>
    </div>

</v-layout>
</template>

<script>
import axios from "axios";
import moment from 'moment';
import store from '../store';

export default {
  data() {
    return {
      e1:0,
      moment: moment,
      dialog: false,
      misLetras: [],
      user: 
      {   
        id : "",
        username:"",
        password:"",
        name:"",
        urlImage:""
      },

      menu1: false,
      menu2: false,
      menu3: false,
      res:false,
      diasTrans: 0,
      tasaEfectiva: 0,
      tasaDescuento:0,
      solesDescuento:0,
      valorNeto:0,
      valorRecibir: 0,
      valorEntregar:0,
      tcea:0,
      TipoTasaOperacion:[
          {text: "Nominal", value: 'Nominal'},
          {text: "Efectiva", value: 'Efectiva'},
      ],
      Dias:[
          {text: "360", value: 360},
          {text: "365", value: 365},
      ],
      Plazo:[
          {text: "Diario", value: 1},
          {text: "Quincenal", value: 15},
          {text: "Mensual", value: 30},
          {text: "Bimestral", value: 60},
          {text: "Trimestral", value: 90},
          {text: "Cuatrimestral", value: 120},
          {text: "Semestral", value: 180},
          {text: "Anual", value: 360},
          {text: "Especial", value: 'Especial'},
      ],
      Motivo:[
          {text: "Portes", value: 'Portes'},
          {text: "Fotocopias", value: 'Fotocopias'},
          {text: "Comision de Estudio", value: 'Comision de Estudio'},
          {text: "Gastos de Administracion", value: 'Gastos de Administracion'},
          {text: "Seguro", value: 'Seguro'},
          {text: "Otros Gastos", value: 'Otros Gastos'},
      ],

      TipoValor:[
          {text: "Efectivo", value: 'Efectivo'},
          {text: "Porcentaje", value: 'Porcentaje'},
      ],

      cabeceraDetalles:[{
          text: 'Borrar',
          value: 'borrar',
          sortable: false
          },
        {
          text: 'Motivo',
          value: 'motivo',
          sortable: false
        },
        {
          text: 'Valor Calculado',
          value: 'valor',
          sortable: false
        }
      ],

      Descripcion: "",
      TipoTasa: "Nominal",

      //Datos de la Letra
      FechaGiro: "",
      FechaVencimiento: "",
      ValorNominal: "",
      Retencion: "",

      //Tasa y Plazo
      DiasPorAño: "",
      PlazoTasa: "",
      ValorEspecialPer: "",
      PorcentajeTasaNominal: "",
      PeriodoCapitalizacion: "",
      ValorEspecialCap: "",

      PorcentajeTasaEfectiva: "",
      FechaDescuento: "",

      //Costes y Gastos Iniciales
      MotivoInicial: "",
      TipoVI: "",
      ValorCosteI: "",
      CInicial: [],

      //Costes y Gastos Finales
      MotivoFinal: "",
      TipoVF: "",
      ValorCosteF: "",
      CFinal: [],


      //Solo usamos esto y agregamos al arreglo
      motivo: "",
      valor: "",

      //Datos de la letra
      Denominacion: "",
      LugarGiro: "",
      FechaGiro: "",
      NombreGirado: "",
      DniGirado: "",
      NombreBeneficiario: "",
      NombreGirador: "",
      DniGirador: "",
      LugarPago: "",

      Id: "",
      editedIndex: -1,
      //Agregar a la cartera
      carteraLetras: []      
    };
  },
  computed:{

  },
  watch:{
      
  },

  created() {
    let me = this;
    me.e1=0;
    if(localStorage.getItem('session') != null)
    me.user = JSON.parse(localStorage.getItem('session'));
    this.listar();
  },
  methods: {
    listar() {
      let me = this;
      axios.get('api/letras/GetLetrasByUserId/'+ me.user.id).then(function(response) {
          //console.log(response);
          me.misLetras = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    editarLetra(letra) {
      let me = this;
      this.Id = letra.id,
      this.Denominacion = letra.denominacion,
      this.LugarGiro = letra.lugarGiro,
      this.FechaGiro= letra.fechaGiro,
      this.ValorNominal= letra.valorNominal,
      this.NombreGirado= letra.nombreGirado,
      this.DniGirado= letra.dniGirado,
      this.NombreBeneficiario= letra.nombreBeneficiario,
      this.NombreGirador= letra.nombreGirador,
      this.DniGirador= letra.dniGirador,
      this.FirmaGirador= letra.firmaGirador,
      this.FechaVencimiento= letra.fechaVencimiento,
      this.LugarPago= letra.lugarPago,
      this.Retencion= letra.retencion,
      this.CFinal= [],
      this.UserId= me.user.id,

      this.editedIndex = 1;
      this.dialog = true;
    },
    resetPasos()
    {   
        let me=this;
        me.e1=0;
    },
    guardarLetra(){
        if (this.editedIndex > -1) {
        let me = this;
        axios 
          .put("api/letras", {
            id: me.Id,
            denominacion: me.Denominacion,
            lugarGiro: me.LugarGiro,
            fechaGiro: me.FechaGiro,
            valorNominal: me.ValorNominal,
            nombreGirado: me.NombreGirado,
            dniGirado: me.DniGirado,
            nombreBeneficiario: me.NombreBeneficiario,
            nombreGirador: me.NombreGirador,
            dniGirador: me.DniGirador,
            firmaGirador: me.FirmaGirador,
            fechaVencimiento: me.FechaVencimiento,
            lugarPago: me.LugarPago,
            retencion: me.Retencion,
            gastos: [],
            userId: me.user.id,
          })
          .then(function (response) {
              me.listar();
           })
          .catch(function(error) {
            console.log(error);
          });
      } else{
          let me =this;
        axios
        .post("api/letras", {
            denominacion: me.Denominacion,
            lugarGiro: me.LugarGiro,
            fechaGiro: me.FechaGiro,
            valorNominal: me.ValorNominal,
            nombreGirado: me.NombreGirado,
            dniGirado: me.DniGirado,
            nombreBeneficiario: me.NombreBeneficiario,
            nombreGirador: me.NombreGirador,
            dniGirador: me.DniGirador,
            firmaGirador: me.FirmaGirador,
            fechaVencimiento: me.FechaVencimiento,
            lugarPago: me.LugarPago,
            retencion: me.Retencion,
            gastos: [],
            userId: me.user.id,
        })
        .then(function (response) {
            me.listar();
        })
        .catch(function(error) {
            console.log(error);
          });
    }
    },
    agregarCartera(letra1){
        this.carteraLetras.push({
            letra: letra1
        });
    },
    calcularCartera(){
        let me = this;
        me.res = true;
    },
    agregarCosteInicial( motivo1,valor1) {
        this.CInicial.push({
            motivo: motivo1,
            valor: valor1
        }); 
    },

    agregarCosteFinal( motivo1,valor1) {
        this.CFinal.push({
            motivo: motivo1,
            valor: valor1
        }); 
     },
    
    eliminarDetalle(arr, item) {
        var i = arr.indexOf(item);
        if (i !== -1) {
            arr.splice(i, 1);
        }
    },
    eliminarLetra(item){
        let me = this
        axios.delete('api/letras/'+ item.id ).then(function(response) {
          //console.log(response);
          //me.misLetras = response.data;
        })
        .then(function (response) {
            me.listar();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    calcular()
    {
        let me = this;
        // Falta arreglar la fecha 
        var diasDif = moment(me.FechaVencimiento).diff(moment(me.FechaDescuento), "days")
        var tasa = 0;
        var tasaDes = 0;
        var neto = 0;
        var totalR = 0;
        var totalE = 0;
        var tcea = 0;
        var solesDes = 0;
        if(me.TipoTasa == "Nominal" )
        {
            if(me.PlazoTasa != "Especial" ){
                if(me.PeriodoCapitalizacion != "Especial")
                    tasa = Math.pow((1+((me.PorcentajeTasaNominal/100)/(me.PlazoTasa/me.PeriodoCapitalizacion))),(diasDif/me.PeriodoCapitalizacion))-1;
                if(me.PeriodoCapitalizacion == "Especial")
                    tasa = Math.pow((1+((me.PorcentajeTasaNominal/100)/(me.PlazoTasa/me.ValorEspecialCap))),(diasDif/me.ValorEspecialCap)) -1;
            }    
            if(me.PlazoTasa == "Especial"){
                if(me.PeriodoCapitalizacion != "Especial")
                    tasa = Math.pow((1+((me.PorcentajeTasaNominal/100)/(me.ValorEspecialPer/me.PeriodoCapitalizacion))),(diasDif/me.PeriodoCapitalizacion)) -1;
                if(me.PeriodoCapitalizacion == "Especial")
                     tasa = Math.pow((1+((me.PorcentajeTasaNominal/100)/(me.ValorEspecialPer/me.ValorEspecialCap))),(diasDif/me.ValorEspecialCap)) -1;
            }
        }
        else{
            if(me.TipoTasa == "Efectiva" )
            {
                if(me.PlazoTasa != "Especial")
                    tasa = Math.pow((1+(me.PorcentajeTasaEfectiva/100)),(diasDif/me.PlazoTasa))-1;
                if(me.PlazoTasa == "Especial")
                    tasa = Math.pow((1+(me.PorcentajeTasaEfectiva/100)),(diasDif/me.ValorEspecialPer))-1;
            }
        }
        tasaDes = (tasa/(1+tasa))
        neto = me.ValorNominal*(1-tasaDes);
        totalR = neto - me.Retencion;
        me.CInicial.forEach(element => {
            totalR -= element.valor;
        });
        totalE = me.ValorNominal - me.Retencion;
        me.CFinal.forEach(element => {
            totalE += element.valor; 
        });

        tcea = Math.pow((totalE/totalR),(me.DiasPorAño/diasDif))- 1;
        solesDes = me.ValorNominal * tasaDes;

        me.tcea = tcea*100;
        me.tasaDescuento = tasaDes*100;
        me.diasTrans = diasDif;
        me.tasaEfectiva = tasa*100;
        me.solesDescuento = solesDes;
        me.valorRecibir = totalR;
        me.valorEntregar = totalE;
        me.valorNeto = neto;

        me.res = true;
    },
  }
};
</script>
