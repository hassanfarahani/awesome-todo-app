<template>
    <q-card>
        <modalHeader>Add Task</modalHeader>
        <form @submit.prevent="submitForm">
            <q-card-section class="q-pt-none">
                <modalTaskName :name.sync="taskToSubmit.name" ref="modalTaskName" />
                <modalDueDate :dueDate.sync="taskToSubmit.dueDate" @clear="clearDueDate" />
                <modalDueTime :dueTime.sync="taskToSubmit.dueTime" :dueDate="taskToSubmit.dueDate" v-if="taskToSubmit.dueDate" />
            </q-card-section>
            <modalButtons />
        </form>
    </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

export default {
    mixins: [mixinAddEditTask],
    data() {
        return {
            taskToSubmit: {
                name: '',
                completed: false,
                dueDate: '',
                dueTime: ''
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['addTask']),
        submitTask() {
            this.addTask(this.taskToSubmit);
            this.$emit('close');
        }
    }
}
</script>

<style>

</style>



