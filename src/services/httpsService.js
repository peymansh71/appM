import axios from 'axios'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
// import Cookie from "js-cookie"

// export function Notification() {
//     return Swal.mixin({
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 1500,
//         timerProgressBar: true,
//         onOpen: (toast) => {
//             toast.addEventListener('mouseenter', Swal.stopTimer)
//             toast.addEventListener('mouseleave', Swal.resumeTimer)
//         }
//     })
// }
// const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 1500,
//     timerProgressBar: true,
//     onOpen: (toast) => {
//         toast.addEventListener('mouseenter', Swal.stopTimer)
//         toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
// })
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['access_token_cookie'] = Cookie.get('token')
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        // Toast.fire({
        //     icon: 'error',
        //     title: 'خطا در خواندن پایگاه داده'
        //   })
        // Notification().fire({
        //     icon: 'error',
        //     title: 'خطا در خواندن پایگاه داده'
        // })
        
        toast.error("خطا در خواندن پایگاه داده ")
    }
    return Promise.reject(error)
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}