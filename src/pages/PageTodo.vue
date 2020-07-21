<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key" />
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import task from 'components/Tasks/task.vue'
// import addTask from 'components/Tasks/Modals/AddTask.vue'
// import tasksTodo from 'components/Tasks/TasksTodo.vue'
// import tasksCompleted from 'components/Tasks/TasksCompleted.vue'
// import noTasks from 'components/Tasks/NoTasks.vue'
// import search from 'components/Tasks/Tools/Search.vue'
// import sort from 'components/Tasks/Tools/Sort.vue'

export default {
  name: 'PageTodo',
  data() {
    return {
        // showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])
    // ...mapGetters('tasks', ['tasksToDo', 'tasksCompleted']),
    // ...mapState('tasks', ['search'])
  },
  components: {
    task
    // addTask,
    // tasksTodo,
    // tasksCompleted,
    // noTasks,
    // search,
    // sort
  }
  // mounted() {
  //   this.$root.$on('showAddTask', () => {
  //     this.showAddTask=true
  //   })
  // }
}
</script>

<style>

</style>
