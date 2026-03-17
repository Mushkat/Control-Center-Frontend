import { membersCountLabel, usersCountLabel } from '@/shared/localization/pluralize';

export const ru = {
  app: {
    brand: 'Control Center',
    subtitle: 'Пользователи и группы',
    mainNavigation: 'Основная навигация',
  },
  nav: {
    welcome: 'Главная',
    users: 'Пользователи',
    groups: 'Группы',
  },
  actions: {
    addUser: 'Добавить пользователя',
    openUsersTable: 'Открыть таблицу пользователей',
    openGroups: 'Открыть группы',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    closeModal: 'Закрыть окно',
  },
  common: {
    noGroup: 'Без группы',
    unknownGroup: 'Неизвестная группа',
    sortAscending: 'по возрастанию',
    sortDescending: 'по убыванию',
    sortNone: 'не выбрано',
  },
  welcome: {
    kicker: 'CONTROL CENTER',
    title: 'Управляйте пользователями и командами',
    description: 'Внутренний центр управления для работы с пользователями, группами и распределением по командам',
    tabsAriaLabel: 'Переключатель превью',
    tabs: {
      users: 'Пользователи',
      groups: 'Группы',
    },
    preview: {
      usersTitle: 'Последние добавленные пользователи',
      groupsTitle: 'Последние добавленные команды',
      noUsers: 'Пользователей пока нет',
      noGroups: 'Групп пока нет',
      columns: {
        name: 'Имя',
        account: 'Логин',
        group: 'Группа',
      },
      membersCount: (count: number) => membersCountLabel(count),
    },
    stats: {
      totalUsers: 'Всего пользователей',
      totalGroups: 'Всего групп',
      unassignedUsers: 'Пользователей без группы',
      assignmentCoverage: 'Распределено по группам',
    },
    features: {
      search: {
        title: 'Точный поиск и сортировка',
        text: 'Поиск и сортируемые колонки помогают работать с таблицей быстро и предсказуемо',
      },
      lifecycle: {
        title: 'Действия с пользователями',
        text: 'Добавляйте и удаляйте пользователей за пару кликов',
      },
      groups: {
        title: 'Контроль групп',
        text: 'Просматривайте состав команд и пользователей, которые не относятся ни к одной из них',
      },
      architecture: {
        title: 'Статистика',
        text: 'Просматривайте детализированную статистику по группам',
      },
    },
  },
  users: {
    pageTitle: 'Пользователи',
    pageDescription: 'Рабочая таблица для поиска, сортировки и управления пользователями',
    summary: {
      totalUsers: 'Всего пользователей',
      unassigned: 'Без группы',
      visibleResults: 'Показано сейчас',
    },
    search: {
      label: 'Поиск пользователей',
      placeholder: 'Поиск по имени, логину, email, телефону или группе',
      searching: 'Поиск...',
      found: (count: number) => `Найдено: ${count}`,
    },
    table: {
      title: 'Таблица пользователей',
      description: 'Доступна сортировка',
      columns: {
        fullName: 'Полное имя',
        account: 'Логин',
        email: 'Электронная почта',
        phone: 'Телефон',
        group: 'Группа',
        actions: 'Действия',
      },
      sortToggleAria: (directionLabel: string) => `Переключить сортировку. Текущий порядок: ${directionLabel}`,
    },
    states: {
      noUsersTitle: 'Пользователей пока нет',
      noUsersDescription: 'Добавьте первого пользователя, чтобы заполнить таблицу',
      noMatchesTitle: 'Ничего не найдено',
      noMatchesDescription: 'Измените запрос или очистите строку поиска',
      loadErrorTitle: 'Не удалось загрузить пользователей',
      loadErrorDescription: 'Убедитесь, что json-server запущен',
    },
  },
  groups: {
    catalog: {
      eng: {
        name: 'Инженерия',
        description: 'Разработчики продукта',
      },
      design: {
        name: 'Дизайн',
        description: 'Продуктовый дизайн, UX-исследования',
      },
      ops: {
        name: 'Операции',
        description: 'Управление внутренними задачами',
      },
    },
    pageTitle: 'Группы',
    pageDescription: 'Распределение пользователей по командам и тех, кто пока не в них не состоит',
    overview: {
      title: 'Обзор',
      totalGroups: 'Всего групп',
      totalUsers: 'Всего пользователей',
      coverage: 'Распределено по группам',
      coverageNote: (assigned: number, total: number) => `${assigned} из ${total} распределены`,
      unassigned: 'Без группы',
    },
    list: {
      title: 'Список групп',
      description: 'На карточке показаны данные группы и первые 4 участника',
      totalGroups: (count: number) => `${count} группы`,
      members: 'Участники',
      emptyMembers: 'Пользователи пока не назначены',
      moreUsers: (count: number) => `+${membersCountLabel(count)} в этой группе`,
      badgeUsers: (count: number) => usersCountLabel(count),
    },
    unassigned: {
      title: 'Пользователи без группы',
      note: 'Эти пользователи пока не привязаны к группе и не попадают в карточки команд',
      empty: 'Отлично - все пользователи уже распределены по группам',
    },
    states: {
      loadErrorTitle: 'Не удалось загрузить обзор групп',
      loadErrorDescription: 'Проверьте API-сервер и обновите страницу',
      emptyTitle: 'Групп и пользователей пока нет',
      emptyDescription: 'Мок API вернул пустой список',
    },
  },
  forms: {
    fullName: 'Полное имя',
    account: 'Логин',
    email: 'Электронная почта',
    phone: 'Телефон',
    group: 'Группа',
    withoutGroup: 'Без группы',
    groupHint: 'Необязательно. Оставьте пустым, чтобы пользователь остался без группы.',
    createUser: 'Создать пользователя',
    creatingUser: 'Создание...',
    saveChanges: 'Сохранить изменения',
    savingChanges: 'Сохранение...',
  },
  modal: {
    addUserTitle: 'Добавить пользователя',
    editUserTitle: 'Редактировать пользователя',
    deleteTitle: 'Удалить пользователя',
    deleteQuestion: 'Вы уверены, что хотите удалить этого пользователя?',
    deleteDescription: 'Это действие нельзя отменить.',
    deleting: 'Удаление...',
    deleteUserAction: 'Удалить пользователя',
  },
  states: {
    loadingTitle: 'Загрузка...',
    loadingDescription: 'Подождите, загружаем актуальные данные',
  },
} as const;
