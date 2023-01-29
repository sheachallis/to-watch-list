export enum NotificationType {
  Error,
  Info,
}

export default interface Notification {
  timeout: number;
  message: string;
  type: NotificationType;
}
