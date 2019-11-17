<template>
<v-layout text-xs-center wrapv-layout class="mt-5" >
    <v-flex>
        <template v-if="TasaPlazoActivo ==='activado'">
       <!--  <v-flex xs12 sm12 md12>
            <v-text-field v-model="Descripcion" label="Breve Descripcion" color="#000000"></v-text-field>
        </v-flex> -->

        <v-flex xs12 sm12 md12>
            <v-select v-model="TipoTasa" :items="TipoTasaOperacion" label="Elige el tipo de Tasa" color="#000000"></v-select>
        </v-flex>
        </template>

        <template v-if="TasaPlazoActivo ==='desactivado'">
        <!--<v-flex xs12 sm12 md12>
            <v-text-field v-model="Descripcion" label="Breve Descripcion" color="#000000" disabled></v-text-field>
        </v-flex>-->

        <v-flex xs12 sm12 md12>
            <v-select v-model="TipoTasa" :items="TipoTasaOperacion" label="Elige el tipo de Tasa" color="#000000" disabled></v-select>
        </v-flex>
        </template>
        
        <v-expansion-panel>
            <v-expansion-panel-content style="background:#454545;color:white">
                <div slot="header"> Tasa y Plazo </div>
                <v-card >
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <template v-if="TasaPlazoActivo ==='activado'">
                                <v-row>
                                <v-col>
                                
                                <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-select v-model="DiasPorAño" :items="Dias" label="Dias por Año" color="#000000"></v-select>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Aquí deberá ser muy cauteloso y elegir el número de días con los que la Legislación del Estado</span>
                                    <v-spacer></v-spacer>
                                    <span>donde se descuenta el instrumento, idealiza al año, pudiendo ser un año de 360 o de 365 días</span>
                                    </v-tooltip>


                                </v-flex>

                                <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="FechaDescuento" label="Fecha de Descuento" readonly v-on="on" color="#000000"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FechaDescuento" @input="menu3 = false" color="#0008FF"></v-date-picker>
                                    </v-menu>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Es aquella fecha en la que se descontará el instrumento financiero. En ese momento el acreedor </span>
                                    <v-spacer></v-spacer>
                                    <span>calculará los intereses que se producirán en el tiempo comprendido entre la fecha de descuento y </span>
                                    <v-spacer></v-spacer>
                                    <span> la fecha de vencimiento y procederá a cobrar por adelantado dichos intereses</span>                                   
                                    </v-tooltip>


                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-select v-model="PlazoTasa" :items="Plazo" label="Plazo de Tasa" color="#000000"></v-select>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Representa al tiempo en el que se expresa el plazo de la tasa de interés dada como dato.</span>
                                    <v-spacer></v-spacer>
                                    <span>Por el contrario, si le informan que se utilizará en su contrato una Tasa Nominal a 75 días (T.N.75d.),</span>
                                    <v-spacer></v-spacer>
                                    <span> se tratará de un plazo especial, entonces deberá seleccionar la opción: Especial</span>                                   
                                    </v-tooltip>



                                </v-flex>
                                
                                <v-flex>
                                <div v-if="PlazoTasa ==='Especial'">
                                    <v-text-field type="number" v-model="ValorEspecialPer" label="Valor Especial" color="#000000"></v-text-field>
                                </div>
                                </v-flex>


                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <template v-if="TipoTasa ==='Nominal'">
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-text-field type="number" v-model="PorcentajeTasaNominal" label="Tasa Nominal" color="#000000"></v-text-field>

                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Es aquella que se paga por un préstamo o una cuenta de ahorros y no se suma al capital,</span>
                                        <v-spacer></v-spacer>
                                        <span> es expresada en términos anuales con una frecuencia de tiempo de pago</span>                             
                                        </v-tooltip>
                                        </v-flex>


                                    <v-flex xs12 sm12 md12 style="display:flex;">
                                        <v-select v-model="PeriodoCapitalizacion" :items="Plazo" label="Capitalizacion" color="#000000" style="max-width:180px"></v-select>
                                        
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Es el periodo de tiempo en el que los intereses generados se convierten en </span>
                                        <v-spacer></v-spacer>
                                        <span>nuevo capital o deuda para el siguiente periodo de pago o cobranza.</span>                                
                                        </v-tooltip>

                                    </v-flex>

                                    <v-flex>
                                        <div v-if="PeriodoCapitalizacion ==='Especial'">
                                            <v-text-field type="number" v-model="ValorEspecialCap" label="Valor Especial" color="#000000"></v-text-field>
                                        </div>
                                    </v-flex>

                                </template>
                                </v-col>
                                </v-row>

                                <v-row>
                                <v-col>
                                <template v-if="TipoTasa ==='Efectiva'">
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-text-field type="number" v-model="PorcentajeTasaEfectiva" label="Tasa Efectiva" color="#000000"></v-text-field>

                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Es la tasa de interés efectiva con la que se compensará al acreedor.</span>                             
                                        </v-tooltip>

                                    </v-flex>
                                </template>
                                </v-col>
                                </v-row>
                                </template>



                                <template v-if="TasaPlazoActivo ==='desactivado'">
                                <v-row>
                                <v-col>
                                
                                <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-select v-model="DiasPorAño" :items="Dias" label="Dias por Año" color="#000000" disabled></v-select>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Aquí deberá ser muy cauteloso y elegir el número de días con los que la Legislación del Estado</span>
                                    <v-spacer></v-spacer>
                                    <span>donde se descuenta el instrumento, idealiza al año, pudiendo ser un año de 360 o de 365 días</span>
                                    </v-tooltip>


                                </v-flex>

                                <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="FechaDescuento" label="Fecha de Descuento" readonly v-on="on" color="#000000" disabled></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FechaDescuento" @input="menu3 = false" color="#0008FF"></v-date-picker>
                                    </v-menu>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Es aquella fecha en la que se descontará el instrumento financiero. En ese momento el acreedor </span>
                                    <v-spacer></v-spacer>
                                    <span>calculará los intereses que se producirán en el tiempo comprendido entre la fecha de descuento y </span>
                                    <v-spacer></v-spacer>
                                    <span> la fecha de vencimiento y procederá a cobrar por adelantado dichos intereses</span>                                   
                                    </v-tooltip>


                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12  style="display:flex;">
                                    <v-select v-model="PlazoTasa" :items="Plazo" label="Plazo de Tasa" color="#000000" disabled></v-select>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Representa al tiempo en el que se expresa el plazo de la tasa de interés dada como dato.</span>
                                    <v-spacer></v-spacer>
                                    <span>Por el contrario, si le informan que se utilizará en su contrato una Tasa Nominal a 75 días (T.N.75d.),</span>
                                    <v-spacer></v-spacer>
                                    <span> se tratará de un plazo especial, entonces deberá seleccionar la opción: Especial</span>                                   
                                    </v-tooltip>



                                </v-flex>
                                
                                <v-flex>
                                <div v-if="PlazoTasa ==='Especial'">
                                    <v-text-field type="number" v-model="ValorEspecialPer" label="Valor Especial" color="#000000" disabled></v-text-field>
                                </div>
                                </v-flex>


                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <template v-if="TipoTasa ==='Nominal'">
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-text-field type="number" v-model="PorcentajeTasaNominal" label="Tasa Nominal" color="#000000" disabled></v-text-field>

                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Es aquella que se paga por un préstamo o una cuenta de ahorros y no se suma al capital,</span>
                                        <v-spacer></v-spacer>
                                        <span> es expresada en términos anuales con una frecuencia de tiempo de pago</span>                             
                                        </v-tooltip>
                                        </v-flex>


                                    <v-flex xs12 sm12 md12 style="display:flex;">
                                        <v-select v-model="PeriodoCapitalizacion" :items="Plazo" label="Capitalizacion" color="#000000" style="max-width:180px" disabled></v-select>
                                        
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Es el periodo de tiempo en el que los intereses generados se convierten en </span>
                                        <v-spacer></v-spacer>
                                        <span>nuevo capital o deuda para el siguiente periodo de pago o cobranza.</span>                                
                                        </v-tooltip>

                                    </v-flex>

                                    <v-flex>
                                        <div v-if="PeriodoCapitalizacion ==='Especial'">
                                            <v-text-field type="number" v-model="ValorEspecialCap" label="Valor Especial" color="#000000" disabled></v-text-field>
                                        </div>
                                    </v-flex>

                                </template>
                                </v-col>
                                </v-row>

                                <v-row>
                                <v-col>
                                <template v-if="TipoTasa ==='Efectiva'">
                                    <v-flex xs12 sm12 md12  style="display:flex;">
                                        <v-text-field type="number" v-model="PorcentajeTasaEfectiva" label="Tasa Efectiva" color="#000000" disabled></v-text-field>

                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                        <v-layout align-center justify-space-around>
                                        <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                        </v-layout>
                                        </template>
                                        <span>Es la tasa de interés efectiva con la que se compensará al acreedor.</span>                             
                                        </v-tooltip>

                                    </v-flex>
                                </template>
                                </v-col>
                                </v-row>
                                </template>





                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content style="background:#454545;color:white">
                <div slot="header" > Datos de la Letra </div>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12 style="display:flex;">
                                   
                                    <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="FechaGiro" label="Fecha de Giro" readonly v-on="on" color="#000000"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FechaGiro" @input="menu1 = false" color="#0008FF"></v-date-picker>
                                        
                                    </v-menu>

                                
                                    <v-tooltip bottom >
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2" color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Es aquella fecha, en la que se origina el instrumento financiero</span>
                                    </v-tooltip>


                                </v-flex>
                                </v-col>
                                </v-row>
                                
                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12s style="display:flex;">
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="FechaVencimiento" label="Fecha de Vencimiento" readonly v-on="on" color="#000000"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FechaVencimiento" @input="menu2 = false" color="#0008FF"></v-date-picker>
                                    </v-menu>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Es aquella fecha en la que vencerá el compromiso originado por el instrumento financiero</span>
                                    <v-spacer></v-spacer>
                                    <span>En ese momento el deudor deberá honrar su palabra cancelando el documento.</span>
                                    </v-tooltip>


                                    
                                </v-flex> 
                                </v-col>
                                </v-row>
                                
                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12 style="display:flex;">
                                    <v-text-field type="number" v-model="ValorNominal" label="Valor Nominal" color="#000000"></v-text-field>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon  small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Llamado también Valor Facial, es el valor que toma el instrumento financiero en la fecha de vencimiento,</span>
                                    <v-spacer></v-spacer>
                                    <span> y que usualmente se imprime/escribe sobre el mismo.</span>
                                    </v-tooltip>

                                </v-flex>
                                </v-col>
                                </v-row>

                                <v-spacer></v-spacer>

                                <v-row>
                                <v-col>
                                <v-flex xs12 sm12 md12 style="display:flex;">
                                    <v-text-field type="number" v-model="Retencion" label="Retención" color="#000000"></v-text-field>

                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                    <v-layout align-center justify-space-around>
                                    <v-icon small class="ml-2 mr-2"  color="teal darken-2" v-on="on">info</v-icon>
                                    </v-layout>
                                    </template>
                                    <span>Es retenido por el acreedor al momento del descuento, y que usualmente sirve como garantía colateral de la operación.</span>
                                    </v-tooltip>

                                </v-flex>
                                </v-col>
                                </v-row>                                

                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content style="background:#454545;color:white">
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
                                                <v-text-field type="string" v-model="props.item.motivo" disabled></v-text-field>
                                            </td>

                                            <td>
                                                <v-text-field type="number" v-model="props.item.valor" disabled></v-text-field >
                                            </td>   
                                        </template>
                                    </v-data-table>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content style="background:#454545;color:white">
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
                                                <v-text-field type="string" v-model="props.item.motivo" disabled></v-text-field>
                                            </td>

                                            <td>
                                                <v-text-field type="number" v-model="props.item.valor" disabled></v-text-field>
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
        <v-btn  dark class="btn btn-primary mt-5" @click="calcular">Calcular</v-btn>

        <div v-if="res" style="width:100%;display:flex;border-radius:10px;padding: 20px 40px;background:#454545;color:white;margin-top:40px" >

            <div style="width:50%; display:flex;flex-direction:column;text-align:start" class="ml-4 mt-4">
                <ul>
                   <div v-for="(index) in arregloLetras" :key="index">
                       <div style="display:flex; justify-content:space-between">  <p>Valor neto:</p> <p>{{index.valorNeto}}</p></div>
                       <div style="display:flex; justify-content:space-between">  <p>Valor total a recibir :</p>  <p>{{index.valorRecibir}}</p></div>
                       <div style="display:flex; justify-content:space-between">  <p>Valor total a entregar :</p> <p>{{index.valorEntregar}}</p></div>
                       <div style="display:flex; justify-content:space-between">  <p>TCEA :</p> <p> {{index.tcea}}%</p></div>
                   </div>
                </ul>
            </div>
        </div>
    </v-flex>
</v-layout>
</template>


<script>
import axios from "axios";
import moment from 'moment';

export default {
  data() {
    return {
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

      TasaPlazoActivo: "activado",
      arregloLetras: [],
      NumeroL: 0,

      motivo: "",
      valor: "",
      validar: 0,
      add: false,

    };
  },
  computed:{

  },
  watch:{
  },

  created() {
  },
  methods: {
    agregarCosteInicial( motivo1,valor1) {
        let me  = this
        me.add = false
        console.log(me.CInicial.length)
        if (me.CInicial.length == 0){
            me.add=true;
        }else {
         me.CInicial.forEach(element => {
            if(element.motivo != motivo1){
                me.add = true;
            }
        });
        }
        console.log(me.add)
        if ( valor1 > 0 && valor1 < me.ValorNominal - me.Retencion && me.add == true ) {
            this.CInicial.push({
                motivo: motivo1,
                valor: valor1
            }); 
        }
    },

    agregarCosteFinal( motivo1,valor1) {
        let me  = this
        me.add = false
        console.log(me.CFinal.length)
        if (me.CFinal.length == 0){
            me.add=true;
        }else {
         me.CFinal.forEach(element => {
            if(element.motivo != motivo1){
                me.add = true;
            }
        });
        }
        console.log(me.add)
        if ( valor1 > 0 && valor1 < me.ValorNominal - me.Retencion && me.add == true) {
            this.CFinal.push({
                motivo: motivo1,
                valor: valor1
            }); 
        }
     },

     agregarLetras(tcea,totalR,totalE,neto){
         this.arregloLetras.push({
             valorNeto:neto,
             valorRecibir: totalR,
             valorEntregar:totalE,
             tcea:tcea
         });
     },
    
    eliminarDetalle(arr, item) {
        var i = arr.indexOf(item);
        if (i !== -1) {
            arr.splice(i, 1);
        }
    },
    
    validaciones(){
        let me = this
        me.res = false
        
        
        if (me.TipoTasa == "Nominal"){
            if(me.ValorNominal > 0 && me.ValorNominal < 999999999){
                if (me.Retencion >= 0 && me.Retencion < me.ValorNominal){
                    if (moment(me.FechaGiro).isBefore(moment(me.FechaVencimiento))){
                        if(moment(me.FechaDescuento).isBefore(moment(me.FechaVencimiento)) && moment(me.FechaDescuento).isAfter(moment(me.FechaGiro)) ){
                            if(me.PorcentajeTasaNominal > 0 && me.PorcentajeTasaNominal <= 100){
                                me.validar = 1
                                if(me.PeriodoCapitalizacion == "Especial"){
                                    if(me.ValorEspecialCap > 0 && me.ValorEspecialCap < 1000){
                                        me.validar = 1;
                                    }else{
                                        me.validar = 0;
                                    }
                                }else if(me.PlazoTasa == "Especial" && me.validar == 1){
                                    if(me.ValorEspecialPer > 0 && me.ValorEspecialPer < 1000){
                                        me.validar = 1;
                                    }else{
                                        me.validar = 0;
                                        }
                                }
                                
                            }
                        }
                    }
                }
            } else {
                me.validar = 0
            }
        }else{
            if(me.ValorNominal > 0 && me.ValorNominal < 999999999){
                if (me.Retencion >= 0 && me.Retencion < me.ValorNominal){
                    if (moment(me.FechaGiro).isBefore(moment(me.FechaVencimiento))){
                        if(moment(me.FechaDescuento).isBefore(moment(me.FechaVencimiento)) && moment(me.FechaDescuento).isAfter(moment(me.FechaGiro)) ){
                            if(me.PorcentajeTasaEfectiva > 0 && me.PorcentajeTasaEfectiva <= 100){
                                me.validar = 1
                                if(me.PlazoTasa == "Especial"){
                                    if(me.ValorEspecialPer > 0 && me.ValorEspecialPer < 1000){
                                        me.validar = 1;
                                    }else{
                                        me.validar = 0;
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                me.validar = 0
            }
        }



    },
    calcular()
    {
        let me = this;
        me.validaciones()
        me.TasaPlazoActivo = 'desactivado'
                if (me.validar == 1) {
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
            totalR -= parseFloat(element.valor);
        });
        totalE = me.ValorNominal - me.Retencion;
        me.CFinal.forEach(element => {
            totalE += parseFloat(element.valor); 
        });
        console.log(totalE)

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
        
        this.agregarLetras(me.tcea,me.valorRecibir,me.valorEntregar,me.valorNeto)
        me.res = true;
        //Validaciones
        me.validar = 0
        }
        
    },
  }
};
</script>
