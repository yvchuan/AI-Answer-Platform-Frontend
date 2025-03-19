<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">Header</a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a>author: 宇川(Chozen James)</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#basicLayout {
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}

.footer {
  background: #efefef;
  padding: 16px;
  text-align: center;
}
</style>
