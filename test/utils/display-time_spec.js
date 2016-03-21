import { expect } from 'chai';
import {
  getDisplayDate,
  getDisplayDateTime,
} from '../../lib/utils/display-time';

describe('display-time', () => {
  it('Display date', () => {
    const displayDate = getDisplayDate('2016-02-19');
    expect(displayDate).to.equal('2016 02 19');
  });

  it('Display datetime', () => {
    const displayDateTime = getDisplayDateTime('2016-02-19T10:30');
    expect(displayDateTime).to.equal('2016 02 19 10:30');
  });
});
