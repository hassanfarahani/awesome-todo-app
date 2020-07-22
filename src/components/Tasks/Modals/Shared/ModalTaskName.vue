<template>
    <div class="row q-mb-sm">
        <q-input
            outlined
            :value="name"
            @input="$emit('update:name', $event)"
            label="Task name"
            class="col"
            ref="name"
            autofocus
            v-select-all
            :rules="[val => !!val || 'Field is required']">
                <template v-slot:append>
                    <q-icon v-if="name" name="close" @click="$emit('update:name', '')" class="cursor-pointer" />
                </template>
        </q-input>
    </div>
</template>

<script>
import { selectAll } from 'src/directives/directive-select-all'

export default {
    props: ['name'],
    directives: {
        selectAll
    }
}
</script>

<style>

</style>
