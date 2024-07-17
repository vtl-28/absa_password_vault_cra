import api from "../api";

function fetch_application(user_id) {
    return api.get(`/find_password?department=D_Absa&created_by=${user_id}`).then(response => {
      console.log(response.data)
      return response.data;
    }).catch(error => {
      return error.response.data;
    });
}

export default fetch_application;