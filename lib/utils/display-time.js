import moment from 'moment';
import { formats } from '../settings';

function representInnerToDisplay(format, innerValue) {
  const { inner, display } = format;
  return moment(innerValue, inner).format(display);
}

/**
 * getDisplayDateTime - translate from inner to display datetime string
 * @param  {String} innerDateTime - innert datetime string
 * @return {String} display datetime string
 */
export function getDisplayDateTime(innerDateTime) {
  return representInnerToDisplay(formats.datetime, innerDateTime);
}

/**
 * getDisplayDate - translate from inner to display date string
 * @param  {String} innerDate - inner date string
 * @return {String} display date string
 */
export function getDisplayDate(innerDate) {
  return representInnerToDisplay(formats.date, innerDate);
}
