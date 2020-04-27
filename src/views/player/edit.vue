<template>
  <div>
    <!-- 创建一个player-detail组件，更新时也可复用 -->
    <player-detail :is-edit="true"></player-detail>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import PlayerDetail from './components/PlayerDetail.vue';

  @Component({
    components: {
      PlayerDetail,
    },
  })
  export default class create extends Vue {
    
  }
</script>

<style scoped>

</style>