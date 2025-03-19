export const localization = {
  en: {
    // Filter dropdown options
    "inbox.filters.dropdownOptions.unread": "Unread only",
    "inbox.filters.dropdownOptions.default": "Unread & read",
    "inbox.filters.dropdownOptions.archived": "Archived",

    // Filter labels
    "inbox.filters.labels.unread": "Unread",
    "inbox.filters.labels.default": "Inbox",
    "inbox.filters.labels.archived": "Archived",

    // Notifications section
    "notifications.emptyNotice": "Quiet for now. Check back later.",
    "notifications.actions.readAll": "Mark all as read",
    "notifications.actions.archiveAll": "Archive all",
    "notifications.actions.archiveRead": "Archive read",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} new ${
        notificationCount === 1 ? "notification" : "notifications"
      }`,

    // Individual notification actions
    "notification.actions.read.tooltip": "Mark as read",
    "notification.actions.unread.tooltip": "Mark as unread",
    "notification.actions.archive.tooltip": "Archive",
    "notification.actions.unarchive.tooltip": "Unarchive",

    // Preferences section
    "preferences.title": "Preferences",
    "preferences.emptyNotice": "No notification specific preferences yet.",
    "preferences.global": "Global Preferences",
    "preferences.workflow.disabled.notice":
      "Contact admin to enable subscription management for this critical notification.",
    "preferences.workflow.disabled.tooltip": "Contact admin to edit",

    // Set locale
    locale: "en-En",

    // Dynamic localization for workflow names
    dynamic: {
      // use the workflowId as a key to localize the workflow name
      "trading-notifications": "Trading notifications",
    },
  },
  ru: {
    // Filter dropdown options
    "inbox.filters.dropdownOptions.unread": "Только не прочитанные",
    "inbox.filters.dropdownOptions.default": "Все",
    "inbox.filters.dropdownOptions.archived": "Архив",

    // Filter labels
    "inbox.filters.labels.unread": "Не прочитанные",
    "inbox.filters.labels.default": "Входящие",
    "inbox.filters.labels.archived": "Архив",

    // Notifications section
    "notifications.emptyNotice": "Пока все тихо. Проверьте позже.",
    "notifications.actions.readAll": "Отметить все как прочитанные",
    "notifications.actions.archiveAll": "Архивировать все",
    "notifications.actions.archiveRead": "Архивировать прочитанные",
    "notifications.newNotifications": ({
      notificationCount,
    }: {
      notificationCount: number;
    }) =>
      `${notificationCount > 99 ? "99+" : notificationCount} новых ${
        notificationCount === 1 ? "уведомление" : "уведомления"
      }`,

    // Individual notification actions
    "notification.actions.read.tooltip": "Отметить как прочитанные",
    "notification.actions.unread.tooltip": "Отметить как не прочитанные",
    "notification.actions.archive.tooltip": "Архивировать",
    "notification.actions.unarchive.tooltip": "Разархивировать",

    // Preferences section
    "preferences.title": "Предпочтения",
    "preferences.emptyNotice":
      "Нет специальных предпочтений для этой уведомления.",
    "preferences.global": "Глобальные предпочтения",
    "preferences.workflow.disabled.notice":
      "Обратитесь к администратору для включения управления подписками для этого критического уведомления.",
    "preferences.workflow.disabled.tooltip":
      "Обратитесь к администратору для редактирования",

    // Set locale
    locale: "ru-RU",

    // Dynamic localization for workflow names
    dynamic: {
      // use the workflowId as a key to localize the workflow name
      "trading-notifications": "Трейдинговые уведомления",
    },
  },
} as const;
