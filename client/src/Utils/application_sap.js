import api from "../api";

function fetch_application_sap(user_id) {
    return api.get(`/find_password?department=Sap&created_by=${user_id}`).then(response => {
      console.log(response.data)
      return response.data;
    }).catch(error => {
      return error.response.data;
    });
}

export default fetch_application_sap;