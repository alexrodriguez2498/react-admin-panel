import axios from 'axios'

export default class PhotosService {

    getPhotos() {
      return axios.get('assets/demo/data/photos.json').then((res) => res.data.data)
  }

}