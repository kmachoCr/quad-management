<template>
  <div class="sq-mngm-form">
    <form @submit.prevent="action" ref="form" id="form">
      <div v-for="(item, index) in formFields" :key="index">
        <component
          :label="item.label"
          :name="item.name"
          :value="formData ? formData[item.name] : null"
          :isChecked="formData ? formData[item.name] : null"
          :required="item.required"
          :options="item.options || []"
          :type="item.type"
          @inputChange="inputChange"
          :is="item.class"
        />
      </div>
      <div class="fff" v-if="showAdmin">
        <hr />
        <inputForm
          @inputChange="inputChange"
          :type="'email'"
          ref="input"
          name="email"
          label="Correo electrónico"
          :required="true"
        />
        <inputForm
          @inputChange="inputChange"
          :type="'password'"
          ref="input"
          name="password"
          label="Contraseña"
          :required="true"
        />
      </div>
    </form>
    <alert :classes="alert.class" :isVisible="alert.status" :label="alert.label"/>
    <div class="sq-mngm-form__buttons">
      <input
        type="submit"
        form="form"
        class="sq-mngm-btn sq-mngm-form__button--submit"
        value="Enviar"
      />
    </div>
  </div>
</template>
<script>
import checkbox from "./form-inputs/checkbox.vue";
import input from "./form-inputs/inputForm.vue";
import dropdown from "./form-inputs/dropdown.vue";
import textarea from "./form-inputs/textareaForm.vue";
import firebase from "firebase";
import alert from './../components/alert.vue';

export default {
  props: {
    formFields: Array,
    formData: Object,
    collection: String,
    showAdminFields: Boolean,
    formAction: String,
    successMessage: String,
    failureMessage: String,
  },
  data: function () {
    return {
      formState: {},
      alert: {
        status: false
      },
      dbCollection: null,
      showAdmin: false,
    };
  },
  components: {
    alert,
    checkbox,
    dropdown,
    inputForm: input,
    textAreaForm: textarea,
  },
  mounted() {
    this.formState = this.formData || {};
    this.dbCollection = this.$store.getters.database.collection(
      this.collection
    );
  },
  computed: {
    action() {
      if (this.formAction === "manual") {
        this.$emit("formSubmitted", this.formState);
        return () => {
          this.alert.status = "alert-info";
        };
      } else {
        return this.formAction === "edit" ? this.updateData : this.insertData;
      }
    },
  },
  methods: {
    /**
      * Gets the input component instance according its name
      */
    getInstance(item) {
      return item.class
        ? () => import(`./../components/form-inputs/${item.class}.vue`)
        : "";
    },
    /**
      * Updates the state every time that an input value changes
      */
    inputChange(data) {
      this.formState[data.name] = data.val;
      this.showAdmin = this.showAdminFields && this.formState["isAdmin"];
    },
    /**
      * Add into a firebase database, the information entered by user
      */
    insertData() {
      this.alert.visibility = false;
      if (this.showAdmin) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.formState["email"],
            this.formState["password"]
          )
          .then((data) => {
            data.user
              .updateProfile({
                displayName: `${this.formState["name"]} ${this.formState["first_surname"]}`,
              })
              .then(() => {
                this.addUser(data.user.uid);
              });
          })
          .catch((err) => {
            this.error = err.message;
          });
      }else {
        this.addUser();
      }
    },
    /**
      * Add into a firebase database, the information entered by user
      */
    async addUser(uid) {
      this.alert.status = false;
      Object.assign(this.formState, this.showAdmin && { 'uid': uid });
      delete this.formState.password;
      delete this.formState.email;
      this.formState.isAdmin = this.formState["isAdmin"] ? this.formState["isAdmin"] : false ;

      let docExist = await this.isAlreadyCreated();  
      if(!docExist){
        this.dbCollection
          .add(this.formState)
          .then(() => {
            this.alert.status = true;
            this.alert.class = "alert-success";
            this.alert.label = this.successMessage;
          })
          .catch(() => {
            this.alert.status = true;
            this.alert.class = "alert-warning";
            this.alert.label = this.failureMessage;
          });
      } else {
        this.alert.status = true;
        this.alert.class = "alert-warning";
        this.alert.label = 'YA EXISTE';
      }
    },
    /**
      * Updates a record of the firebase database with the information entered by user
      */
    updateData() {
      this.alert.visibility = false;

      this.dbCollection
        .doc(this.$route.params.id)
        .update(this.formState)
        .then(() => {
          this.alert.status = true;
          this.alert.class = "alert-success";
          this.alert.label = this.successMessage;
        })
        .catch(() => {
          this.alert.status = true;
          this.alert.class = "alert-warning";
          this.alert.label = this.failureMessage;
        });
    },
    async isAlreadyCreated() {
      let fields = this.formFields.filter((e) => e.duplicate === false);
      let state = this.formState;

      let query = this.$store.getters.database.collection(this.collection);

      fields.forEach(field => {
        query = query.where(field.name, "==", state[field.name]);
      });

      let isCreated = false;
      
      await query.get()
        .then((doc) => {
          if (doc.size) {
            isCreated = true;
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

        return isCreated;
    },
  },
};
</script>
<style>
.sq-mngm-form__buttons {
  display: flex;
  justify-content: flex-end;
}

.sq-mngm-form__button--submit {
  background-color: cadetblue;
}
.sq-mngm-form__button--cancel {
  background-color: darkslategray;
}
</style>