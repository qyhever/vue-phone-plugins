<template>
  <ComPage tabbarVisible :leftArrow="false">
    search
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        {{item}}
      </li>
    </ul>
    <button @click="update">update</button>
    <div>
      {{person.job.c}}
    </div>
  </ComPage>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          'foo',
          'bar',
          'baz'
        ],
        person: {
          job: {
            a: '1',
            b: '2'
          }
        }
      }
    },
    methods: {
      update() {
        // this.list[1] = 'zs'
        // this.$forceUpdate()

        // this.list[1] = 'zs'
        // this.list = JSON.parse(JSON.stringify(this.list))

        // this.list = this.list.map((item, index) => {
        //   if (index === 1) {
        //     return 'zs'
        //   }
        //   return item
        // })

        // this.list.splice(1, 1, 'zs')

        // this.$set(this.list, 1, 'zs')

        this.$set(this.person.job, 'c', '3')
        // this.person.job.c = '3'
      }
    }
  }
</script>
