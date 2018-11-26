/* global jest, describe, test */

jest.mock('net')

import isReachable from '../reachability'

describe('isReachable', () => {
  test('error.com is NOT reachable', () => {
    return expect(isReachable('error.com', false)).resolves.toBeFalsy()
  })

  test('ok.example.com is reachable', () => {
    return expect(isReachable('http://ok.example.com', false)).resolves.toBeTruthy()
  })

  test('timeout.error.com is not reachable and gives timeout', () => {
    return expect(isReachable('http://timeout.error.com', 100)).resolves.toBeFalsy()
  })
})
