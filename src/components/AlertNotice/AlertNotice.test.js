import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlertNotice from './AlertNotice';

const adapter  = new Adapter();

configure({ adapter });


describe('AlertNotice component', () => {
    let wrapper;
    const message = 'testmessage';
    beforeEach(() => {
        wrapper = render(<AlertNotice message={message} type="danger"/>);
    });
    it('should render message from props', () => {
        expect(wrapper.text()).to.contain('testmessage');
    });
});
