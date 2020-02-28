<template>
  <hero-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeroDetail from './components/HeroDetail.vue'

@Component({
  name: 'EditHero',
  components: {
    HeroDetail
  }
})
export default class extends Vue {}
</script>
