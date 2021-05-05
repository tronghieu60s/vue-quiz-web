<template>
  <div v-if="question" class="mt-4">
    <div class="bg-dark rounded-lg w-75 mx-auto">
      <h1 class="text-center py-3 mb-0" style="color: white; font-size: 1.7em">
        {{ question.question }}
      </h1>
    </div>
    <div class="w-100 mt-4">
      <div class="d-flex">
        <button type="button" class="btn btn-primary btn-block py-5 mt-3">
          <div class="w-75 mx-auto">
            <img src="/assets/images/circle.svg" style="width: 20px" />
            {{ question.answers[0].answer }}
          </div>
        </button>
        <button type="button" class="btn btn-success btn-block py-5 mt-3">
          <div class="w-75 mx-auto">
            <img src="/assets/images/rectangle.svg" style="width: 20px" />
            {{ question.answers[1].answer }}
          </div>
        </button>
      </div>
      <div class="d-flex">
        <button type="button" class="btn btn-danger btn-block py-5 mt-3">
          <div class="w-75 mx-auto">
            <img src="/assets/images/hexagon.svg" style="width: 20px" />
            {{ question.answers[2].answer }}
          </div>
        </button>
        <button type="button" class="btn btn-warning btn-block py-5 mt-3">
          <div class="w-75 mx-auto">
            <img src="/assets/images/triangle.svg" style="width: 20px" />
            {{ question.answers[3].answer }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { question: { type: Object } },
};
</script>
