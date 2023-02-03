<template>
  <v-snackbar
    v-for="notification in notifications"
    :model-value="true"
    :timeout="-1"
    location="top"
    :color="colourNotificationType.get(notification.type)"
  >
    <v-row no-gutters class="align-center">
      <v-icon class="px-4">
        {{ iconNotificationType.get(notification.type) }}
      </v-icon>
      {{ notification.message }}
      <v-spacer />
      <v-btn
        class="ml-3"
        size="small"
        icon="mdi-close"
        variant="text"
        @click.stop="() => deleteNotification(notification)"
      />
    </v-row>
  </v-snackbar>
</template>
<script lang="ts">
import { injectStore } from "@/stores";
import { defineComponent } from "vue";
import { NotificationType } from "@/models/Notification";

const iconNotificationType: Map<NotificationType, string> = new Map([
  [NotificationType.Error, "mdi-alert-circle"],
  [NotificationType.Info, "mdi-information"],
]);

const colourNotificationType: Map<NotificationType, string> = new Map([
  [NotificationType.Error, "error"],
  [NotificationType.Info, "info"],
]);

export default defineComponent({
  name: "NotificationSnackbars",
  setup() {
    const { notificationsStore } = injectStore();
    const { notifications, deleteNotification } = notificationsStore;

    return {
      iconNotificationType,
      colourNotificationType,
      notifications,
      deleteNotification,
    };
  },
});
</script>
