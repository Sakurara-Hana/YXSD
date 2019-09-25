import Cookies from 'js-cookie'//引用
function setCookie(token){
   return Cookies.set('token',token);
}

function getCookie(){
    return Cookies.get('token');
}
function delCookie(){
    return Cookies.remove('token');
}
export {setCookie,getCookie,delCookie}