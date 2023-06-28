<script setup>
import { h } from 'vue'
import { NButton, NDataTable } from 'naive-ui'

const data = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: 'Don\'t Look Back in Anger', length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]
const createColumns = (play) => {
  return [
    {
      title: 'No',
      key: 'no'
    },
    {
      title: '歌曲名',
      key: 'title'
    },
    {
      title: '时长',
      key: 'length'
    },
    {
      title: '操作',
      key: 'actions',
      render(row)
      {
        /*return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => play(row)
            },
            { default: () => 'Play' }
        )*/
        return h('div', { class: 'flex flex-row' }, [
          h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                onClick: () => play(row)
              },
              { default: () => 'Play' }
          ),
          h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                onClick: () => play(row)
              },
              { default: () => 'Play' }
          )])
      }
    }
  ]
}

const columns = createColumns((row) => console.log(row.title))
</script>

<template>
  <div>
    <n-data-table
        :columns="columns"
        :data="data"
        :pagination="false"
        :bordered="false">

    </n-data-table>
  </div>
</template>

<style scoped>

</style>