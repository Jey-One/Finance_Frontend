<template>
    <v-layout wrapv-layout width="100vw">

    <div style="width:90%;margin: 0 auto">
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
    </v-layout>
</template>


<script>
  export default {
    data () {
      return {
        e1: 0,
      }
    },
  }
</script>