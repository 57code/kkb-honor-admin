<template>
  <hero-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeroDetail from './components/HeroDetail.vue'

@Component({
  name: 'CreateHero',
  components: {
    HeroDetail
  }
})
export default class extends Vue {}
</script>
