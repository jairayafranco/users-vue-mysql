<template>
  <div class="q-pa-md">
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md formulario"
    >
      <q-input
          filled
          v-model="name"
          label="Tu nombre *"
          hint="Nombres y Apellidos"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre']"
      />

      <q-input
          filled
          type="number"
          v-model="age"
          label="Edad *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Por favor ingrese su edad',
          val => val > 0 && val < 100 || 'Por favor ingrese una edad real'
        ]"
      />

      <q-input
          filled
          v-model="city"
          label="Ciudad *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor ingrese su ciudad']"
      />

      <q-input
          filled
          v-model="mail"
          label="Correo *"
          lazy-rules
          :rules="[
          val => val && val.length > 0 || 'Por favor ingrese un correo',
          val => val.indexOf('@') !== -1 || 'Por favor ingrese un correo valido'
        ]"
      />

      <div>
        <q-btn label="Enviar" type="submit" color="primary" v-on:click="getData()" />
        <q-btn label="Borrar" type="reset" color="primary" flat class="q-ml-sm" />
      </div>

    </q-form>
    <br />
    <q-toggle v-model="accept" label="Acepto que la informacion suministrada es correcta" />
  </div>

  <div class="q-pa-md">
    <q-table
        title="Informacion de los usuarios"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="initialPagination"
    />
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import {ref} from "vue";

const rows = ref([])
let data = ref({})

const columns = [
  { name: 'id', align: 'center', label: 'id', field: 'id', sortable: true },
  { name: 'Nombre', label: 'Nombre', field: 'NombreCompleto', sortable: true },
  { name: 'Edad', label: 'Edad', field: 'Edad', sortable: true },
  { name: 'Ciudad', label: 'Ciudad', field: 'Ciudad', sortable: true },
  { name: 'Correo', label: 'Correo', field: 'Correo', sortable: true },
]

async function getUsers() {
  await fetch('http://localhost:8080/getUsers')
      .then(res => res.json())
      .then(data => rows.value = data)
}
getUsers()

async function addUser(values) {
  await fetch('http://localhost:8080/addUser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nombreCompleto": values.value.nombreCompleto,
      "edad": values.value.edad,
      "ciudad": values.value.ciudad,
      "correo": values.value.correo,
    })
  })
  await getUsers()
}


export default {
  data() {
    return {
      name: null,
      age: null,
      city: null,
      mail: null
    }
  },

  methods: {
    getData() {
      data.value = {
        nombreCompleto: this.name,
        edad: this.age,
        ciudad: this.city,
        correo: this.mail
      }
    }
  },

  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const city = ref(null)
    const mail = ref(null)
    const accept = ref(false)

    return {
      columns,
      rows,
      name,
      age,
      city,
      mail,
      accept,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Tiene que aceptar los terminos y condiciones'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Guardado'
          })
          addUser(data)
        }
      },

      onReset () {
        name.value = null
        age.value = null
        city.value = null
        mail.value = null
        accept.value = false
      }
    }
  }
}
</script>

<style>
@media (min-width: 768px) {
  .formulario {
    display: grid;
    grid-template-columns: repeat(4, 1fr)
  }
}
</style>