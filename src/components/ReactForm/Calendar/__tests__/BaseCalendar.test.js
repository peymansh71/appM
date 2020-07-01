import React from "react"

import { shallow, mount, render } from 'enzyme';
import BaseCalendar from '../BaseCalendar';

import RangeCalendar from '../BaseCalendar';


describe('<BaseCalendar />', () => {

    it('should render in gregorian mode ', () => {
      const wrapper = shallow(<BaseCalendar />);
      wrapper.render();
    });
  
    it('should render in jalaali mode ', () => {
      const wrapper = shallow(<BaseCalendar jalali={true} />);
      wrapper.render();
    });

    it('should render in monthonly mode ', () => {
      const wrapper = shallow(<BaseCalendar monthOnly={true} />);
      wrapper.render();
    });


    it('should render range picker in gregorian mode', () => {
      const wrapper = shallow(<RangeCalendar />);
      wrapper.render();
    });

    it('should render range picker in jalaali mode', () => {
      const wrapper = shallow(<RangeCalendar jalali={true} />);
      wrapper.render();
    });

    it('should render range picker in monthonly mode', () => {
      const wrapper = shallow(<RangeCalendar monthOnly={true} />);
      wrapper.render();
    });
  
})