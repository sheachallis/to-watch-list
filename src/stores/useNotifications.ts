import { reactive, toRef, toRefs } from "vue";
import { Store } from ".";
import Notification, { NotificationType } from "@/models/Notification";

interface State {
  notifications: Notification[];
}

export default function useNotifications() {
  const state = reactive<State>({
    notifications: [],
  });

  function deleteNotification(notification: Notification) {
    const notificationIndex = state.notifications.findIndex(
      (n) => n == notification
    );
    state.notifications.splice(notificationIndex);
  }

  async function addNotification(notification: Notification) {
    state.notifications.push(notification);

    if (notification.timeout > 0) {
      setTimeout(() => deleteNotification(notification), notification.timeout);
    }
  }

  function notifyError(
    message: string,
    cause: Error | undefined = undefined,
    timeout = 5000
  ) {
    cause && console.error(cause);

    addNotification({
      message,
      timeout,
      type: NotificationType.Error,
    });
  }

  function notifyInfo(message: string, timeout = 2500) {
    addNotification({
      message,
      timeout,
      type: NotificationType.Info,
    });
  }

  function notifySuccess(message: string, timeout = 2500) {
    addNotification({
      message,
      timeout,
      type: NotificationType.Success,
    });
  }

  return {
    ...toRefs(state),
    notifyError,
    notifyInfo,
    notifySuccess,
    deleteNotification,
  };
}

export type NotificationsStore = ReturnType<typeof useNotifications>;
