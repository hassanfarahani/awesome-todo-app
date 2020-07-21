<template>
  <q-page class="q-pa-md">
    page todo
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: {
          'ID1': {
              name: 'Go to shop',
              completed: false,
              dueDate: '2019/05/12',
              dueTime: '18:30'
          },
          'ID2': {
              name: 'Get apples',
              completed: false,
              dueDate: '2019/05/14',
              dueTime: '18:30'
          },
          'ID3': {
              name: 'Go bananas',
              completed: false,
              dueDate: '2019/05/13',
              dueTime: '16:00'
          }
      }
    }
  }
}
</script>

<style>

</style>
