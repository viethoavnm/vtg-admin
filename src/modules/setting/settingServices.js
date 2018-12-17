import axios from '../../utils/api';

export function getPageList() {
  return axios.get('api/page-info/get-all');
}

export function createPage(place) {
  return axios.post('api/page-info/', place);
}

export function updatePage(place) {
  return axios.put('api/page-info/', place);
}

export function removePage(id) {
  return axios.delete('api/page-info/' + id);
}

export function setCompanyInfo(data) {
  return axios.put('api/setting/', {
    id: 1,
    name: 'CompanyProfile',
    value: JSON.stringify(data)
  })
}

export function getCompanyInfo() {
  return axios.get('api/setting/1').then((res) => (JSON.parse(res.value)));
}