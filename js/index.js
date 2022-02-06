const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`https://vue3-course-api.hexschool.io/v2/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message);
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(
            expired
          )}; path=/`;
          window.location = "product.html";
        })
        .catch((err) => {
          console.log(err);
          alert(err.data.message);
        });
    },
  },
};

Vue.createApp(app).mount("#app");
