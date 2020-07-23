<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">
      <div class="row q-mb-lg">
        <search />
        <sort />
      </div>
      <q-scroll-area class="q-scroll-area-tasks">
        <noTasks v-if="!Object.keys(tasksToDo).length" />
        <tasksTodo v-if="Object.keys(tasksToDo).length" :tasksToDo="tasksToDo" />
        <tasksCompleted v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted" class="q-mb-xl" />
      </q-scroll-area>
      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
              @click="showAddTask=true"
              round
              color="primary"
              size="24px"
              icon="add"
              class="all-pointer-events"
          />
      </div>
    </div>

    <q-dialog v-model="showAddTask">
      <addTask @close="showAddTask=false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import addTask from 'components/Tasks/Modals/AddTask.vue'
import tasksTodo from 'components/Tasks/TasksTodo.vue'
import tasksCompleted from 'components/Tasks/TasksCompleted.vue'
import noTasks from 'components/Tasks/NoTasks.vue'
import search from 'components/Tasks/Tools/Search.vue'
import sort from 'components/Tasks/Tools/Sort.vue'

export default {
  name: 'PageTodo',
  data() {
    return {
        showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksToDo', 'tasksCompleted']),
    ...mapState('tasks', ['search'])
  },
  components: {
    addTask,
    tasksTodo,
    tasksCompleted,
    noTasks,
    search,
    sort
  },
  mounted() {
    // listen to global event bus from NoTasks.vue
    this.$root.$on('showAddTask', () => {
      this.showAddTask=true
    })
  }
}
</script>

<style scoped>
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>
