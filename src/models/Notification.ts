export enum NotificationType {
  Error,
  Info,
  Success,
}

export default interface Notification {
  timeout: number;
  message: string;
  type: NotificationType;
}
