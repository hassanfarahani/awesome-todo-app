<template>
    <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
    >
        <div class="q-mt-lg">
            <listHeader bgColor="bg-green-4">Completed</listHeader>
            <q-list separator bordered>
                <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key" />
            </q-list>
        </div>

    </transition>
</template>

<script>
import task from 'components/Tasks/Task.vue'
import listHeader from 'components/Shared/ListHeader.vue'

export default {
    props: ['tasksCompleted'],
    components: {
        task,
        listHeader
    }
}
</script>

<style>

</style>
