import moment from 'moment';

export default ({ }, inject) => {
  inject('moment', moment);
}
