<template>
  <div class="search">
    <el-input v-model="search" />

    <template v-if="search">
      <Result
        v-for="(item, i) in listResult"
        :key="i"
        v-bind="item"
      />
    </template>

  </div>
</template>

<script>
import Result from '@/components/Result.vue';
import { mapState } from 'vuex';
import { checkPerformanceFn } from '../store';
import { findNode } from '../helper/tree';

export default {
  name: 'Search',
  components: {
    Result,
  },
  data() {
    return {
      search: '',
      listResult: [
        {
          label: 'filter',
          count: 0,
          performance: 0,
          fn: this.fnFilters,
        },
        {
          label: 'tree',
          count: 0,
          performance: 0,
          fn: this.fnTree,
        },
      ],
    };
  },

  computed: {
    ...mapState({
      allData: (state) => state.data,
      tree: (state) => state.tree,
    }),
  },

  watch: {
    search() {
      this.listResult = this.listResult.map((item) => {
        let count = 0;
        const performance = +checkPerformanceFn(() => {
          count = item.fn();
        });

        return {
          ...item,
          count,
          performance,
        };
      });
    },
  },

  methods: {
    fnFilters() {
      if (!this.search) {
        return undefined;
      }

      return this.allData
        .filter((item) => item.slice(0, this.search.length) === this.search).length;
    },
    fnTree() {
      if (!this.search) {
        return undefined;
      }

      const node = findNode(this.tree, this.search);
      if (!node) {
        return undefined;
      }

      return node.count;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
