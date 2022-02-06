let productModal;
let delProductModal;

const app = {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yashienxzxz",
      isNew: "",
      products: [],
      temp: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "index.html";
        });
    },
    getData() {
      axios
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => console.log(err.data.message));
    },
    openModal(status, item) {
      if (status == "new") {
        this.temp = {
          imagesUrl: [],
        };
        productModal.show();
        this.isNew = true;
      } else if (status == "edit") {
        this.temp = { ...item };
        productModal.show();
        this.isNew = false;
      } else if (status == "delete") {
        this.temp = { ...item };
        delProductModal.show();
      }
    },
    updateProducts() {
      //修改或新增商品
      let url;
      let httpMethod;

      if (this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
        httpMethod = "post";
      } else {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`;
        httpMethod = "put";
      }

      axios[httpMethod](url, { data: this.temp })
        .then((res) => {
          productModal.hide();
          alert(res.data.message);
          this.getData();
        })
        .catch((err) => {
          alert(err.data);
        });
    },
    delProduct() {
      axios
        .delete(
          `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`
        )
        .then((res) => {
          this.getData();
          delProductModal.hide();
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    createImages() {
      this.temp.imagesUrl = [];
      this.temp.imagesUrl.push("");
    },
  },
  mounted() {
    //取出token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //存進header
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();

    productModal = new bootstrap.Modal(
      document.querySelector("#productModal"),
      { keyboard: false }
    );
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal"),
      { keyboard: false }
    );
  },
};

Vue.createApp(app).mount("#app");
