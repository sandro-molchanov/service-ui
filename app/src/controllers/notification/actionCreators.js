import { HIDE_NOTIFICATION, SHOW_NOTIFICATION, SHOW_DEFAULT_ERROR_NOTIFICATION } from './constants';

/**
 *
 * @param message? {string}
 * @param type {('error' | 'info' | 'success')}
 * @param messageId? {string}
 * @param values? {object}
 * @returns {{type: string, payload: {message: string, type: (string), uid: number}}}
 */
export const showNotification = ({ message, type, messageId, values }) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    message,
    messageId,
    type,
    values,
    uid: new Date().valueOf(),
  },
});

/**
 *
 * @param uid {number}
 * @returns {{type: string, payload: number}}
 */
export const hideNotification = (uid) => ({
  type: HIDE_NOTIFICATION,
  payload: uid,
});

export const showDefaultErrorNotification = ({ message }) => ({
  type: SHOW_DEFAULT_ERROR_NOTIFICATION,
  payload: {
    error: message,
  },
});
