/*
 * @Author: Eddy Huang
 * @Date: 2021-01-26 18:27:20
 * @LastEditors: Eddy Huang
 * @LastEditTime: 2021-01-26 18:29:15
 * @Description: TODO:
 */
import Axios from 'axios'

const axios = Axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3090' : '',
})
axios.interceptors.response.use((res) => res.data)

export default axios