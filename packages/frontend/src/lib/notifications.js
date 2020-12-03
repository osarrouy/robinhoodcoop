import { getNotificationsContext } from 'svelte-notifications'

export const getNotify = (addNotification, clearNotifications) => {
  return {
    default: message => {
      addNotification({
        position: 'bottom-center',
        text: message,
      })
    },

    success: message => {
      clearNotifications()

      addNotification({
        position: 'bottom-center',
        type: 'success',
        text: message,
        removeAfter: 5000,
      })
    },

    error: message => {
      clearNotifications()

      addNotification({
        position: 'bottom-center',
        type: 'danger',
        text: message,
      })
    },

    clear: () => {
      clearNotifications()
    },
  }
}

export const notify = {
  default: message => {
    const { addNotification } = getNotificationsContext()

    addNotification({
      position: 'bottom-center',
      text: message,
    })
  },

  success: message => {
    const { addNotification, clearNotifications } = getNotificationsContext()

    clearNotifications()

    addNotification({
      position: 'bottom-center',
      type: 'success',
      text: message,
      removeAfter: 5000,
    })
  },

  error: message => {
    const { addNotification, clearNotifications } = getNotificationsContext()

    clearNotifications()

    addNotification({
      position: 'bottom-center',
      type: 'danger',
      text: message,
    })
  },

  clear: () => {
    const { clearNotifications } = getNotificationsContext()
    clearNotifications()
  },
}
