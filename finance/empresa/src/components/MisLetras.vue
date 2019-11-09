<template>
<v-layout text-xs-center wrapv-layout > 
    <div class = "team">
        <h3 class="display-1 font-weight-bold mb-3">Mis Letras</h3>
        <v-container class="my-5">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
                    <v-card flat class="text-xs-center ma-3" color="#26c6da">
                        <v-responsive class="pt-4">
                            <div class="subheading">{{person.name}}</div>
                        </v-responsive>
                        <v-card-text>
                            <div class="subheading">{{person.valor}}</div>
                            <div class="subheading">{{person.fechaDescuento}}</div>
                            <div class="subheading">{{person.nombreGirado}}</div>
                        </v-card-text>
                        <v-card-actions>
                            <b-button-group>
                            <v-btn small flat color="blue" @click="agregarCartera(person)">
                                <span>Agregar</span>
                            </v-btn>
                            <v-btn small flat color="green">
                                <span>Editar</span>
                            </v-btn>
                            <v-btn small flat color="red" @click="eliminarDetalle(team , person)" >
                                <v-icon>delete</v-icon>
                            </v-btn>
                            </b-button-group>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-row justify="center">
        <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on }">
            <v-btn  dark class="btn btn-primary mt-5" @click="agregarLetra" v-on="on">Agregar Letra</v-btn>
            <v-btn  dark class="btn btn-primary mt-5" @click="calcularCartera">Calcular Cartera</v-btn>
            <v-row>
            <div v-if="res">
                <div style="width:100%;display:flex;border-radius:10px;padding: 20px 40px;background:#454545;color:white;margin-top:40px" v-for="person in carteraLetras" :key="person.letra">
                    <div style="width:50%; display:flex;flex-direction:column;text-align:start" class="ml-4 mt-4">
                        <div style="display:flex; justify-content:space-between">  <p>Letra </p> <p>{{person.letra}}</p></div>
                    </div>
                </div>
                <div style="width:50%; display:flex;flex-direction:column;text-align:start" class="ml-4 mt-4">
                    <div style="display:flex; justify-content:space-between">  <p>TCEA </p> <p> Calculo </p></div>
                </div>
            </div>
            </v-row>
        </template>
        <v-card>
        <v-card-title>
          <span class="headline">Datos de la Letra</span>
        </v-card-title>
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

                <v-col cols="12" sm="6" md="4">
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="FechaVencimiento" label="Fecha de Vencimiento" readonly v-on="on" color="#000000"></v-text-field>
                        </template>
                    <v-date-picker v-model="FechaVencimiento" @input="menu2 = false" color="#0008FF"></v-date-picker>                        
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="Retencion" label="Retencion" color="#000000" required></v-text-field>
                </v-col>

                <div slot="header"> Costes/Gastos Iniciales </div>
                    <v-card >
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
                                    </v-row>

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
                    </v-card>


                    <div slot="header"> Costes/Gastos Finales </div>
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

                                    <v-row>
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

                                    <v-spacer></v-spacer>

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
                    </v-card>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
    </div>

</v-layout>
</template>


<script>
import axios from "axios";
import moment from 'moment';

export default {
  data() {
    return {
      dialog: false,
      team: [
          {name: 'Nombre Letra', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'},
          {name: 'Nombre Letra2', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'},
          {name: 'Nombre Letra3', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'},
          {name: 'Nombre Letra4', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'},
          {name: 'Nombre Letra5', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'},
          {name: 'Nombre Letra6', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'},
          {name: 'Nombre Letra7', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'},
          {name: 'Nombre Letra8', valor: 'Valor Nominal', fechaDescuento: 'Fecha de Descuento', nombreGirado: 'Nombre de Girado'}
      ],

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

      //Agregar a la cartera
      carteraLetras: []      
    };
  },
  computed:{

  },
  watch:{
  },

  created() {
  },
  methods: {
    agregarCartera(letra1){
        this.carteraLetras.push({
            letra: letra1
        });
    },
    agregarLetra(){

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
    eliminarLetra(arr, item){
        var i = arr.indexOf(item);
        if (i !== -1) {
            arr.splice(i, 1);
        }
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
