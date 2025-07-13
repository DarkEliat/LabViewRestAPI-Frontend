<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue';
import NavBar from '@/components/NavBar.vue';
import PageContent from '@/components/PageContent.vue';
</script>

<template>
  <div id="home" class="page-container">
    <AppTitle />
    <NavBar />
    <div class="page-content">
      <PageContent>
        <h1>Home</h1>
      </PageContent>
    </div>
  </div>
</template>

<style scoped></style>
