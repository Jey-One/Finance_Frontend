<template>
<v-layout text-xs-center wrapv-layout >
    <v-flex>
        <h1 class="display-2 font-weight-bold mb-3">Descuento Por Letras</h1>

        <v-flex xs12 sm12 md12>
            <v-text-field v-model="Descripcion" label="Breve Descripcion" color="#000000"></v-text-field>
        </v-flex>

        <v-flex xs12 sm12 md12>
            <v-select v-model="TipoTasa" :items="TipoTasaOperacion" label="Elige el tipo de Tasa" color="#000000"></v-select>
        </v-flex>
        
        <v-expansion-panel dark>

            <v-expansion-panel-content>
                <div slot="header"> Datos de la Letra </div>
                <v-card color="#2196F3">
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12 >
                                    <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="FechaGiro" label="Fecha de Giro" prepend-icon="event" readonly v-on="on" color="#000000"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FechaGiro" @input="menu1 = false" color="#0008FF"></v-date-picker>
                                    </v-menu>
                                    
                                    
                                </v-flex>
                                </v-col>
                                </v-row>
                                
                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="FechaVencimiento" label="Fecha de Vencimiento" prepend-icon="event" readonly v-on="on" color="#000000"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FechaVencimiento" @input="menu2 = false" color="#0008FF"></v-date-picker>
                                    </v-menu>
                                </v-flex> 
                                </v-col>
                                </v-row>
                                
                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field type="number" v-model="ValorNominal" label="Valor Nominal" color="#000000"></v-text-field>
                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field type="number" v-model="Retencion" label="Retención" color="#000000"></v-text-field>
                                </v-flex>
                                </v-col>
                                </v-row>

                                

                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
                <div slot="header"> Tasa y Plazo </div>
                <v-card color="#2196F3">
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="DiasPorAño" :items="Dias" label="Dias por Año" color="#000000"></v-select>
                                </v-flex>

                                <v-flex xs12 sm12 md12>
                                    <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="FechaDescuento" label="Fecha de Descuento" prepend-icon="event" readonly v-on="on" color="#000000"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FechaDescuento" @input="menu3 = false" color="#0008FF"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="PlazoTasa" :items="Plazo" label="Plazo de Tasa" color="#000000"></v-select>
                                    <div v-if="PlazoTasa ==='Especial'" >
                                         <v-text-field type="number" v-model="ValorEspecialPer" label="Valor Especial" color="#000000"></v-text-field>
                                    </div>
                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <template v-if="TipoTasa ==='Nominal'">
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field type="number" v-model="PorcentajeTasaNominal" label="Tasa Nominal" color="#000000"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12>
                                        <v-select v-model="PeriodoCapitalizacion" :items="Plazo" label="Periodo de Capitalizacion" color="#000000"></v-select>
                                        <div v-if="PeriodoCapitalizacion ==='Especial'" >
                                            <v-text-field type="number" v-model="ValorEspecialCap" label="Valor Especial" color="#000000"></v-text-field>
                                        </div>
                                    </v-flex>
                                </template>
                                </v-col>
                                </v-row>

                                <v-row>
                                <v-col>
                                <template v-if="TipoTasa ==='Efectiva'">
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field type="number" v-model="PorcentajeTasaEfectiva" label="Tasa Efectiva" color="#000000"></v-text-field>
                                    </v-flex>
                                </template>
                                </v-col>
                                </v-row>

                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
                <div slot="header"> Costes/Gastos Iniciales </div>
                <v-card color="#2196F3">
                    <v-card-text class="px-4">
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="MotivoInicial" :items="Motivo" label="Motivo" color="#000000"></v-select>
                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="TipoVI" :items="TipoValor" label="Valor Expresado en: " color="#000000"></v-select>
                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                <v-text-field type="number" v-model="ValorCosteI" label="Valor: " color="#000000"></v-text-field>
                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-btn class="mx-2" fab dark color="indigo" @click.native="agregarCosteInicial(MotivoInicial,ValorCosteI)">ADD</v-btn>
                                </v-col>
                                </v-row>

                                <v-flex xs12 sm12 md12 lg12 xl12>
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
            </v-expansion-panel-content>

            <v-expansion-panel-content>
                <div slot="header"> Costes/Gastos Finales </div>
                <v-card color="#2196F3">
                    <v-card-text class="px-4">
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="MotivoFinal" :items="Motivo" label="Motivo" color="#000000"></v-select>
                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="TipoVF" :items="TipoValor" label="Valor Expresado en: " color="#000000"></v-select>
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
                                        <template slot="items" slot-scope="props">
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
            </v-expansion-panel-content>
            
        </v-expansion-panel>
    </v-flex>
</v-layout>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      menu3: false,
      
      TipoTasaOperacion:[
          {text: "Nominal", value: 'Nominal'},
          {text: "Efectiva", value: 'Efectiva'},
      ],
      Dias:[
          {text: "360", value: '360'},
          {text: "365", value: '365'},
      ],
      Plazo:[
          {text: "Diario", value: '1'},
          {text: "Quincenal", value: '15'},
          {text: "Mensual", value: '30'},
          {text: "Bimestral", value: '60'},
          {text: "Trimestral", value: '90'},
          {text: "Cuatrimestral", value: '120'},
          {text: "Semestral", value: '180'},
          {text: "Anual", value: '360'},
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

    };
  },
  computed: {
  },

  watch: {
  },

  created() {
  },
  
  methods: {
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


  }
};
</script>
