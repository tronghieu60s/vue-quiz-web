<template>
  <questions-filter />
  <table
    class="table table-striped table-hover table-bordered table-responsive-lg mt-3"
  >
    <thead class="thead-inverse">
      <tr>
        <th style="width: 10%">STT</th>
        <th style="width: 70%">Câu Hỏi</th>
        <th style="width: 20%">Hành Động</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>
          <a href="">
            <h6 class="mb-0">-MHy7D3tBEwpbOAKAIMU</h6>
            Điểm khác biệt giữa Google One và Google Drive là gì? Điểm khác biệt
            giữa Google One và Google Drive là gì?Điểm khác biệt giữa Google One
            và Google Drive là gì?Điểm khác biệt giữa Google One và Google Drive
            là gì?
          </a>
        </td>
        <td>
          <button type="button" class="btn btn-primary btn-sm mb-2" title="Sửa">
            <i class="fa fa-pencil-square" aria-hidden="true"></i>
          </button>
          <button type="button" class="btn btn-danger btn-sm mb-2" title="Xóa">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination />
</template>

<script>
import Pagination from "@components/UI/Pagination.vue";
import QuestionsFilter from "./QuestionsFilter.vue";
export default {
  components: { QuestionsFilter, Pagination },
};
</script>
