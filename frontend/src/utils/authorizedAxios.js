import axios from 'axios'
import { toast } from 'react-toastify'

import { interceptorLoadingElement } from '~/utils/formatters'

// Khởi tạo một đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án

let authorizedAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 request: để 10 phút
authorizedAxiosInstance.defaults.timeout = 10 * 60 * 1000

// withCrendentials: sẽ cho phép axios tự động đính kèm và gửi cookie trong mỗi request lên BE (phục vụ trong trường hợp nếu chúng ta sử dụng JWT tokens (refresh & access ) theo cơ chế httpOnly Cookie
authorizedAxiosInstance.defaults.withCredentials = true

// Cấu hình Interceptors (Bộ đánh chặn vào giữa Request và Response)

// Add a request interceptor: Can thiệp vào giữa các Request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click (xem mô tả ở file formatters chứa function)
    interceptorLoadingElement(true)

    // Lấy accessToken từ localstorage và đính kèm vào header
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      // Cần thêm "Bearer" vì chúng ta nên tuân thủ theo tiêu chuẩn OAuth 2.0 trong việc xác định loại token đang sử dụng
      // Bearer là định nghĩa loại token dành cho việc xác thực và ủy quyền, tham khảo các loại token khác như: Basic token, Digest token, OAuth token,...
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor: Can thiệp vào giữa các Response nhận về từ API
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Kỹ thuật chặn spam click (xem mô tả ở file formatters chứa function)
    interceptorLoadingElement(false)

    // Any status code that lie within the range of 2xx cause this function to trigger
    //  Mọi mã http status code nằm trong khoảng 200 - 299 sẽ là success và rơi vào đây
    // Do something with response data
    return response
  },
  (error) => {
    // Kỹ thuật chặn spam click (xem mô tả ở file formatters chứa function)
    interceptorLoadingElement(false)

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    //  Mọi mã http status code nằm ngoài khoảng 200 - 299 sẽ là success và rơi vào đây
    // Do something with response error

    // Xử lý lỗi tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây (viết code một lần: Clean Code)
    // console.log(error) ra là sẽ thấy cấu trúc data tới message lỗi như dưới đây
    // Dùng toastfy để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token.

    let errorMessage = error?.message

    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message
    }

    // Dùng toastffy để hiển thị bất kể mọi mã lỗi lên màng hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token.
    if (error.response?.status !== 401) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
