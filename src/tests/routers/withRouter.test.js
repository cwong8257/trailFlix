import React from 'react';
import { shallow } from 'enzyme';
import { withRouter } from '../../routers/withRouter';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/test-path', search: '?q=123' }),
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: '456' }),
}));

class DummyComponent extends React.Component {
  render() {
    return <div id="dummy">Dummy</div>;
  }
}

const WrappedComponent = withRouter(DummyComponent);

describe('withRouter HOC', () => {
  it('should render the wrapped component and inject router props', () => {
    const wrapper = shallow(<WrappedComponent />);
    // WrappedComponent is a functional component rendering DummyComponent
    const dummy = wrapper.find(DummyComponent);
    expect(dummy.exists()).toBe(true);
    expect(dummy.prop('location')).toEqual({ pathname: '/test-path', search: '?q=123' });
    expect(dummy.prop('navigate')).toBeDefined();
    expect(dummy.prop('match')).toEqual({ params: { id: '456' } });
  });
});
