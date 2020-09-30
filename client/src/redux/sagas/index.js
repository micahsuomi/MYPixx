import { all, select, takeLatest } from 'redux-saga/effects'

function* saveLocalState() {
  const state = yield select()
  yield localStorage.setItem('app-state', JSON.stringify(state))
}
export default function* rootSaga() {
  yield all([takeLatest('*', saveLocalState)])
}
