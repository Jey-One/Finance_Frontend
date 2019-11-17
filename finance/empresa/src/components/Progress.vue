<template>
<v-layout style="width:100vw">
    <div class="text-center" style="margin:auto">
        <v-overlay v-if="overlay" >
        <v-progress-circular indeterminate size="64" ></v-progress-circular>
        </v-overlay>
    </div>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false;
          this.$router.push({name:"about"});
        }, 3000)
      },
    },
  created()
  {  
     let me = this;
     me.overlay = true;
  }
 }
</script>