<template>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-half">
              <form class="box box-form">
                <div class="field has-text-centered">
                  <img src="/img/logo_icon.svg" width="167" />
                  <h1 class="box-title">Iniciar Sesión</h1>
                </div>

                <transition name='fade'>
                  <div v-if="formHasErrors" class="notification is-danger is-light is-flex box">
                    <i class="mdi mdi-24px mdi-account-cancel mr-4"></i>
                    <span class="heading">
                      Usuario o Contraseña incorrectos, Intente nuevamente.
                    </span>
                  </div>
                </transition>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left">
                    <input type="email" class="input is-medium" id="email" placeholder="ejemplo@ejemplo.com" v-model="credentials.email"/>
                    <span class="icon is-left">
                      <i class="mdi mdi-email"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Contraseña</label>
                  <div class="control has-icons-left">
                    <input type="password" class="input is-medium" id="password" placeholder="*********" required v-model="credentials.password"/>
                    <span class="icon is-left">
                      <i class="mdi mdi-key"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <button class="button is-success is-medium is-fullwidth mt-5" @click="login">
                    Acceder
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import Firebase from "firebase";

export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
      formHasErrors: false,
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      if (!this.formHasErrors) {
        Firebase.auth()
          .signInWithEmailAndPassword(
            this.credentials.email,
            this.credentials.password
          )
          .then(() => {
            let user = this.credentials.email;
            this.$store.dispatch("updateUser", user);
            this.$router.push("/");
          })
          .catch(() => {
            this.formHasErrors = true;
            setTimeout(() => {
              this.formHasErrors = false;
            }, 3000);
            // console.log(error);
          });
      }
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.hero{
  background: url('/img/login.jpg') no-repeat;
  background-size: cover;
}
.box-form {
  padding: 3rem;
  margin: 0rem;
  border-radius: 30px;
}
.box-title{
  font-size: 2.3em;
  font-weight: bold;
  margin-bottom: 20px;
}
.heading{
  font-weight: bold;
  letter-spacing: 0px;
  font-size: 13px;
}
.fade-enter-active, .fade-leave-active {
  transition: .2s;
}
.fade-enter-active {
  transition-delay: .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  margin-top:20px;
}
@media (min-width: 514px) {
  .box-form {
    margin: 0 4rem;
  }
}
@media (min-width: 769px) {
  .box-form {
    margin: 0rem;
  }
}
@media (min-width: 1216px) {
  .box-form {
    margin: 0 6rem;
  }
}
</style>
