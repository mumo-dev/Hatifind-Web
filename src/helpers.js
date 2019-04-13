export function getLocalUser(){
  const userStr = localStorage.getItem("user");

  if(!userStr){
    return null;
  }
  // console.log(userStr);

  return JSON.parse(userStr);

}