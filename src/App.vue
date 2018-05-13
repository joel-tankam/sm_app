<template>
  <div id="app">
    <b-navbar toggleable type="light" variant="light">
      <b-container>
        <b-row class="w-100" align-h="center">
          <b-col lg="8" md="10" sm="12" align-self="center">
            <b-navbar-brand>smApp</b-navbar-brand>
            <b-collapse is-nav id="nav_text_collapse">
              <b-navbar-nav>
                <b-nav-text>Smart mix application</b-nav-text>
              </b-navbar-nav>
            </b-collapse>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>
    <b-container class="my-5">
      <b-row align-h="center">
        <b-col lg="8" md="10" sm="12">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
  @import "~bootstrap/dist/css/bootstrap.css";
  @import "~bootstrap-vue/dist/bootstrap-vue.css";

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
