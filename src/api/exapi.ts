import axiosClient from "./client";
//이렇게 사용하면 됩니다. store에 넣어서!
const GET_ITEMS = () => {
  return new Promise((resolve, reject) => {
    axiosClient
      .get("")
      .then((result) => {
        if (result.result === true) {
          resolve(result);
        } else {
          reject(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
