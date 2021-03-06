import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  1007: 'URL不存在',
  3000: '期刊不存在'
}


export class HTTP {
  request(params) {
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method || 'GET',
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._showError(error_code)
        }
      },
      fail: () => {
        this._showError(1)
      }
    })
  }
  
  _showError(error_code) {
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}