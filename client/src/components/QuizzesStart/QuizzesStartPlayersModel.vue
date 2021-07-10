<template>
  <button
    type="button"
    class="btn btn-default btn-sm"
    data-toggle="modal"
    data-target="#modelId"
  >
    <i class="fa fa-user" aria-hidden="true"></i> {{ playersOnline.length }}
  </button>
  <div
    class="modal fade"
    id="modelId"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Tất Cả Người Chơi ({{ playersOnline.length }}/{{ players.length }})
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="px-2" style="height: 300px; overflow: auto">
            <table class="table table-bordered mb-0">
              <thead>
                <tr>
                  <th style="width: 30%">Tên</th>
                  <th style="width: 30%">Trạng Thái</th>
                  <th style="width: 30%">Thời Gian</th>
                  <th>HĐ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-show="players.length === 0">
                  <td class="text-center" colspan="4">
                    Không có người chơi nào.
                  </td>
                </tr>
                <tr v-for="(player, index) in players" :key="index">
                  <td>
                    <span class="badge badge-primary">{{
                      player.player_username
                    }}</span>
                  </td>
                  <td>
                    <span
                      v-show="player.player_online"
                      class="badge badge-success"
                      >online</span
                    >
                    <span
                      v-show="!player.player_online"
                      class="badge badge-danger"
                      >offline</span
                    >
                  </td>
                  <td>
                    <span class="text-xs">{{
                      new Date(player.updated_at).toLocaleTimeString()
                    }}</span>
                  </td>
                  <td>
                    <i
                      v-show="player.player_online"
                      @click="$emit('onKickPlayer', index)"
                      class="fa fa-times"
                      aria-hidden="true"
                    ></i>
                    <i
                      v-show="!player.player_online"
                      class="fa fa-dot-circle-o"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["onKickPlayer"],
  props: { players: { type: Array }, playersOnline: { type: Array } },
};
</script>

<style scoped>
.fa.fa-times:hover {
  color: #f5365c;
  cursor: pointer;
}
</style>
