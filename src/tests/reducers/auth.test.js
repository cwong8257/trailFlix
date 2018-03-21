import authReducer from '../../reducers/auth';

test('should return correct state on login', () => {
  const uid = '11234';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer({}, action);
  expect(state).toEqual({ uid });
});

test('should return correct state on logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ iud: 'test' }, action);
  expect(state).toEqual({});
});
