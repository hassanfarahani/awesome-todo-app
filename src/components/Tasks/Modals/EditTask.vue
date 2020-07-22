<template>
    <q-card>
        <modalHeader>Edit Task</modalHeader>
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
    props: ['task', 'id'],
    data() {
        return {
            taskToSubmit: {}
        }
    },
    methods: {
        ...mapActions('tasks', ['updateTask']),
        submitTask() {
            this.updateTask({
                id: this.id,
                updates: this.taskToSubmit
            });
            this.$emit('close');
        }
    },
    mounted() {
        this.taskToSubmit = Object.assign({}, this.task);
    }
}
</script>

<style>

</style>
