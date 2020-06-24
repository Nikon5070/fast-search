<template>
  <div class="result">
    <div class="label" >
      {{ label | formattedLabel }}
    </div>
    <div class="count">
      {{ count | found }}
    </div>
    <div class="performance">
      {{ performance | time }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',

  props: {
    label: {
      type: String,
      default: '',
    },
    count: {
      type: [Number, String],
      default: 0,
    },
    performance: {
      type: [Number, String],
      default: 0,
    },
  },

  filters: {
    found(value) {
      if (!value) {
        return 'Нет совпадений';
      }
      return `Найдено ${value}`;
    },
    time(value) {
      return `За ${value} мс`;
    },
    formattedLabel(value) {
      return `Поиск при помощи ${value}`;
    },
  },
};
</script>

<style scoped lang="scss">
.result {
  .label {
    font-size: 18px;
    color: indianred;
  }

  .count {
    font-size: 18px;
    font-weight: bold;

    span {
      font-size: 28px;
    }
  }

  .performance {
    font-size: 14px;
  }
}

</style>
