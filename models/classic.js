import { HTTP } from '../utils/http.js'

export class ClassicModel extends HTTP{
  getLatest(cb) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        cb(res)
      }
    })
  }
}