<template>
  <q-header class="header-gradient">
    <q-toolbar class="q-px-xl">
      <div class="row items-center full-width">
        <!-- Logo Section -->
        <div class="row items-center q-gutter-sm">
          <img
            :src="prismLogo"
            alt="PRISMCODE TECH SUMMIT 2026"
            class="prism-logo"
          />
        </div>

        <!-- Navigation Links - Desktop -->
        <q-space />
        <div class="row q-gutter-md gt-sm">
          <q-btn
            v-for="link in navLinks"
            :key="link.path"
            flat
            no-caps
            :to="link.path"
            class="text-white nav-link"
          >
            {{ link.label }}
          </q-btn>
        </div>

        <!-- Hamburger Menu Button - Mobile -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="text-white lt-md"
          @click="toggleDrawer"
        />
      </div>
    </q-toolbar>

    <!-- Mobile Drawer Menu -->
    <q-drawer
      v-model="drawerOpen"
      side="right"
      overlay
      :width="250"
      dark
      class="mobile-drawer"
    >
      <q-list class="mobile-menu-list">
        <q-item
          v-for="link in navLinks"
          :key="link.path"
          clickable
          v-close-popup
          :to="link.path"
          class="mobile-menu-item"
          @click="closeDrawer"
        >
          <q-item-section>
            <q-item-label class="mobile-menu-link">{{ link.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import prismLogo from 'src/assets/prismlogo.png';

const drawerOpen = ref(false);

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Speakers', path: '/speakers' },
  { label: 'FAQS', path: '/faqs' },
  { label: 'Contact', path: '/contact' },
];

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

function closeDrawer() {
  drawerOpen.value = false;
}
</script>

<style scoped lang="sass">
.header-gradient
  background: linear-gradient(to right, #FF6B35, #F7931E, #FF1744, #9C27B0, #00BCD4) !important
  height: 50px

.prism-logo
  height: 50px
  width: auto
  object-fit: contain

.nav-link
  font-size: 16px
  font-weight: 500
  letter-spacing: 0.5px
  font-family: $font-family
  &:hover
    opacity: 0.8

.mobile-drawer
  background-color: #1D1D1D

.mobile-menu-list
  padding: 1rem 0

.mobile-menu-item
  padding: 1rem 1.5rem
  border-bottom: 1px solid rgba(255, 255, 255, 0.1)
  &:hover
    background-color: rgba(255, 255, 255, 0.05)

.mobile-menu-link
  color: white
  font-family: $font-family
  font-size: 18px
  font-weight: 500
  letter-spacing: 0.5px
</style>

