<template>
  <div id="app">
    <b-navbar type="light" variant="light">
      <b-container>
        <b-row class="w-100" align-h="center">
          <b-col lg="8" md="10" sm="12">
            <div class="w-100">
              <b-navbar-brand href="/">smApp</b-navbar-brand>
              <b-navbar-nav  class="d-inline-block ml-auto">
                <b-nav-item router-link to="/" right class="d-inline-block mx-2">Calcul</b-nav-item>
                <b-nav-item router-link to="/config" right
                  class="d-inline-block mx-2">
                    Configuration
                </b-nav-item>
              </b-navbar-nav>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>
    <b-container class="my-4">
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
