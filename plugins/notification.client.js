export default ({ store }, inject) => {
  inject('notifyError', (message) => store.dispatch('notification/NOTIFY', { color: 'error', message }));
  inject('notifyInfo', (message) => store.dispatch('notification/NOTIFY', { color: 'info', message }));
  inject('notifySuccess', (message) => store.dispatch('notification/NOTIFY', { color: 'success', message }));
  inject('notifyWarning', (message) => store.dispatch('notification/NOTIFY', { color: 'warning', message }));
  inject('notify', ({ color, message }) => store.dispatch('notification/NOTIFY', { color, message }));
}
