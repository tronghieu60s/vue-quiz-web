<template>
  <div class="form-group">
    <div class="d-flex justify-content-between">
      <h4 class="text-capitalize">Câu Hỏi</h4>
      <h5>-MHy7D3tBEwpbOAKAIMU</h5>
    </div>
    <textarea
      class="form-control"
      rows="3"
      placeholder="Nhập câu hỏi vào đây..."
    ></textarea>
  </div>
  <div class="form-group">
    <h4 class="text-capitalize">Câu Trả Lời</h4>
    <div class="d-flex align-items-center mb-2">
      <div
        class="d-flex bg-primary rounded py-1 px-2 mr-2"
        style="height: 30px"
      >
        <img width="15px" src="/assets/images/circle.svg" alt="" />
      </div>
      <input
        type="text"
        class="form-control"
        name=""
        aria-describedby="helpId"
        placeholder="Nhập câu trả lời đúng..."
      />
      <button type="button" class="btn btn-success btn-sm mx-2">
        <i class="fa fa-check-square text-secondary" aria-hidden="true"></i>
      </button>
    </div>
    <div class="d-flex align-items-center mb-2">
      <div
        class="d-flex bg-success rounded py-1 px-2 mr-2"
        style="height: 30px"
      >
        <img width="15px" src="/assets/images/rectangle.svg" alt="" />
      </div>
      <input
        type="text"
        class="form-control"
        name=""
        aria-describedby="helpId"
        placeholder="Nhập câu trả lời sai..."
      />
      <button type="button" class="btn btn-secondary btn-sm mx-2">
        <i class="fa fa-check-square" aria-hidden="true"></i>
      </button>
    </div>
    <div class="d-flex align-items-center mb-2">
      <div class="d-flex bg-danger rounded py-1 px-2 mr-2" style="height: 30px">
        <img width="15px" src="/assets/images/hexagon.svg" alt="" />
      </div>
      <input
        type="text"
        class="form-control"
        name=""
        aria-describedby="helpId"
        placeholder="Nhập câu trả lời sai..."
      />
      <button type="button" class="btn btn-secondary btn-sm mx-2">
        <i class="fa fa-check-square" aria-hidden="true"></i>
      </button>
    </div>
    <div class="d-flex align-items-center mb-2">
      <div
        class="d-flex bg-warning rounded py-1 px-2 mr-2"
        style="height: 30px"
      >
        <img width="15px" src="/assets/images/triangle.svg" alt="" />
      </div>
      <input
        type="text"
        class="form-control"
        name=""
        aria-describedby="helpId"
        placeholder="Nhập câu trả lời sai..."
      />
      <button type="button" class="btn btn-secondary btn-sm mx-2">
        <i class="fa fa-check-square" aria-hidden="true"></i>
      </button>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-danger btn-sm">Reset</button>
    <button type="button" class="btn btn-warning btn-sm">Sửa Câu Hỏi</button>
    <button type="button" class="btn btn-primary btn-sm">Thêm Câu Hỏi</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputQuestion: "",
      inputAnswer1: "",
      inputAnswer2: "",
      inputAnswer3: "",
      inputAnswer4: "",
    };
  },
};
</script>
