<template>
  <player-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlayerDetail from './components/PlayerDetail.vue'

@Component({
  name: 'CreatePlayer',
  components: {
    PlayerDetail
  }
})
export default class extends Vue {}
</script>
