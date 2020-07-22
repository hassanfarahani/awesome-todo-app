<template>
    <div>
        <listHeader bgColor="bg-orange-4">Todo</listHeader>
        <q-list separator bordered>
            <task v-for="(task, key) in tasksToDo" :key="key" :task="task" :id="key" />
        </q-list>
    </div>
</template>

<script>
import task from 'components/Tasks/Task.vue'
import listHeader from 'components/Shared/ListHeader.vue'

export default {
    props: ['tasksToDo'],
    components: {
        task,
        listHeader
    }
}
</script>

<style>

</style>
