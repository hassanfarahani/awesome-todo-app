<template>
      <q-item
        @click="updateTask({id, updates: {completed: !task.completed}})"
        :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
        clickable
        v-ripple>
        <q-item-section side top>
          <q-checkbox class="no-pointer-events" :value="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strikethrough': task.completed }">{{ task.name }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="task.dueDate" side>
           <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-xs" />
            </div>
            <div class="column items-end">
              <q-item-label caption>{{ task.dueDate }}</q-item-label>
              <q-item-label caption><small>{{ task.dueTime }}</small></q-item-label>
            </div>
          </div>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <q-btn @click.stop="showEditTaskModal" flat round color="primary" icon="edit" dense />
            <q-btn @click.stop="promptToDelete(id)" flat round color="red" icon="delete" dense />
          </div>
        </q-item-section>
        <q-dialog v-model="showEditTask">
            <editTask @close="showEditTask=false" :task="task" :id="id" />
        </q-dialog>
      </q-item>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import editTask from 'components/Tasks/Modals/EditTask.vue'
import { date } from 'quasar'
// import { log } from 'util';
// import { lookup } from 'dns';

export default {
  props: ['task', 'id'],
  data() {
    return {
      showEditTask: false
    }
  },
  components: {
    editTask
  },
  computed: {
    ...mapState('tasks', ['search'])
  },
  methods: {
    // ...mapActions('tasks', ['updateTask', 'deleteTask']),
    ...mapActions('tasks', ['updateTask', 'deleteTask']),

    promptToDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(id);
      })
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMM D')
    }
    // searchHighlight(value, search) {
    //   if (search) {
    //     return value.replace(search, `<span class="bg-yellow-6">${search}</span>`)
    //   }
    //   return value
    // }
  }
}
</script>

<style>

</style>
