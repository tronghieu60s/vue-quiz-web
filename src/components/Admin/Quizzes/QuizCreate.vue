<template>
  <h3 class="text-center mb-3">Thêm Quiz Mới</h3>
  <div class="form-group">
    <div class="d-flex justify-content-between">
      <h4 class="text-capitalize">Tiêu Đề</h4>
    </div>
    <input
      type="text"
      class="form-control"
      aria-describedby="helpId"
      placeholder="Nhập tiêu đề vào đây..."
    />
  </div>
  <div class="form-group">
    <div class="d-flex justify-content-between">
      <h4 class="text-capitalize">Mô tả</h4>
    </div>
    <textarea
      class="form-control"
      rows="5"
      placeholder="Nhập mô tả vào đây..."
    ></textarea>
  </div>
  <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-danger btn-sm">Reset</button>
    <button type="button" class="btn btn-primary btn-sm">Thêm Quiz Mới</button>
  </div>
</template>

<script>
export default {};
</script>
