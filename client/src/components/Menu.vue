<template>
  <div class="q-pad-md">
    <q-layout class="shadow-2">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="person" class="q-mr-sm" />

          <q-toolbar-title>Tabla de Usuarios</q-toolbar-title>

        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <DataTable />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";
export default {
  components: {DataTable}
}

</script>