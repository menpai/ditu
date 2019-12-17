import axios from 'axios'

const baseUrl = 'https://data.jianshukeji.com/'

class mapData {
  getCities () {
    return axios({
      method: 'get',
      url: baseUrl + 'geochina/cities.json',
      responseType: 'json'
    })
  }
}

export default mapData
