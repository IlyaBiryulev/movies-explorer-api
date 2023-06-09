const CREATE_CODE = 200;
const BAD_REQUEST_ERROR = 400;
const AUTH_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const DEFAULT_ERROR = 500;
const DUBLICATE_ERROR = 11000;

const NOT_FOUND_DATA = 'Данные не найдены.';
const BAD_REQUEST_DATA_FILM = 'Некорректные данные при добавлении фильма.';
const FORBIDDEN_ERROR_DELETE_FILM = 'Невозможно удалить фильм, добавленный не вами.';
const NOT_FOUND_ID = 'Пользователь с указанным id не существует';
const NOT_FOUND_ID_FILM = 'Несуществующий ID фильма';
const FILM_DELETE = 'Фильм удален';
const BAD_REQUEST_UPDATE_USER = 'Некорректные данные при обновлении пользователя.';
const BAD_REQUEST_CREATE_USER = 'Некорректные данные при создании пользователя.';
const REPEAT_EMAIL_ERROR = 'Пользователь с таким email уже существует.';
const SUCCESSFUL_SIGNIN = 'Успешный вход';
const SUCCESSFUL_SIGNOUT = 'Успешный выход';
const NOT_FOUND_URL = 'Несуществующий URL';
const NEED_AUTH = 'Необходима авторизация';
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const AUTH_DATA_ERROR = 'Неправильная почта или пароль';
const BAD_VALIDATION_EMAIL = 'Неправильный формат почты';
const BAD_LINK_FORMAT = 'Неправильный формат ссылки';

module.exports = {
  CREATE_CODE,
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  DUBLICATE_ERROR,
  NOT_FOUND_DATA,
  BAD_REQUEST_DATA_FILM,
  FORBIDDEN_ERROR_DELETE_FILM,
  NOT_FOUND_ID,
  NOT_FOUND_ID_FILM,
  FILM_DELETE,
  BAD_REQUEST_UPDATE_USER,
  REPEAT_EMAIL_ERROR,
  BAD_REQUEST_CREATE_USER,
  SUCCESSFUL_SIGNIN,
  SUCCESSFUL_SIGNOUT,
  NOT_FOUND_URL,
  NEED_AUTH,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,
  AUTH_DATA_ERROR,
  BAD_VALIDATION_EMAIL,
  BAD_LINK_FORMAT,
};
