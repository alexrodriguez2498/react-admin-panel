import axios from 'axios'

export default class PlanService {

    getPlans() {
      return axios.get('assets/demo/data/plans.json').then((res) => res.data.data)
  }

}