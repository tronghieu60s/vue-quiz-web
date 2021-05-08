<template>
  <div class="col-12 mt-5" style="min-height: 50vh">
    <h2 v-if="users.length === 0" class="w-50 text-center mb-0 mx-auto">
      Sử dụng mã code phía trên để mời mọi người tham gia :3
    </h2>
    <div class="d-flex justify-content-center">
      <quizzes-start-users-item
        v-for="(user, index) in users"
        :key="index"
        :user="user"
        @onKickUser="$emit('onKickUser', index)"
      />
    </div>
  </div>
</template>

<script>
import QuizzesStartUsersItem from "./QuizzesStartUsersItem.vue";
export default {
  components: { QuizzesStartUsersItem },
  emits: ["onKickUser"],
  props: { users: { type: Array } },
};
</script>
