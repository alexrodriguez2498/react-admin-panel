import axios from 'axios'

export default class TaskService {

  getTasks () {
    return axios.get('assets/demo/data/task.json').then((res) => res.data.data)
  }

}