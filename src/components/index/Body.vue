<template>
   <div>
      <li>
         id
      </li>

   </div>
</template>
<script>
export default {
   data () {

   },
   mounted () {
      let id = this.$route.params.id
      console.log(id)
   }

}
</script>

<style></style>