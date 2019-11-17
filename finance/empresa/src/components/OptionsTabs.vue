<template >
<v-layout text-xs-center wrapv-layout >
<div style="width:80vw;position:relative; top:-5%">
    <div> 
        <v-tabs
            fixed-tabs
            background-color="indigo"
        >
            <v-tab >
            Letra
            </v-tab>
            <v-tab >
            Cartera de Letras
            </v-tab>

            <v-tab-item >
                <v-card flat tile>
                <v-card-text><Letras/></v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item >
                <v-card flat tile>
                <v-card-text><CarteraLetras/></v-card-text>
                </v-card>
            </v-tab-item>   
        </v-tabs>
    </div>
  </div>
  </v-layout>
</template>


<script>
import Letras from './Letras'
import CarteraLetras from './CarteraLetras'
export default {
    data()
    {
        return 0
    },
    components:
    {
        Letras,
        CarteraLetras
    }

}
</script>