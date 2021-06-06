<template>
  <div class="col-12 py-5 my-5" style="min-height: 50vh">
    <h2 class="w-50 text-center mb-4 mx-auto">
      {{
        users.length === 0
          ? "Sử dụng mã code phía trên để mời mọi người tham gia :3"
          : `Đang có ${users.length} người dùng tham gia. Bạn có thể bắt đầu bất cứ lúc nào!`
      }}
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
