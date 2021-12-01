import tryUntil from './index'

describe('test', () => {
  it('should continue trying until a condition is met', async () => {
    const action = jest.fn()

    await tryUntil(
      action,
      [
        {
          check: (_?: any, options?: any) => options.currentAttempt === 2,
          handle: () => {},
        },
      ],
      {},
    )

    expect(action).toBeCalledTimes(2)
  })

  it('should call \'handle()\' for a matching condition', async () => {
    const handle = jest.fn()

    await tryUntil(
      () => {},
      [
        {
          check: (_?: any, options?: any) => options.currentAttempt === 1,
          handle,
        },
      ],
      {},
    )

    expect(handle).toBeCalled()
  })

  it('should NOT call \'handle()\' for a condition that never matches', async () => {
    const handle = jest.fn()

    await tryUntil(
      () => {},
      [
        {
          key: 'matching',
          check: (_?: any, options?: any) => options.currentAttempt === 1,
          handle: () => {},
        },
        {
          key: 'non-matching',
          check: () => false,
          handle,
        },
      ],
      {},
    )

    expect(handle).not.toBeCalled()
  })

  it('should stop polling after \'maximumAttempts\' have been tried', async () => {
    const action = jest.fn()

    await tryUntil(
      action,
      [],
      {
        maximumAttempts: 2,
      },
    )

    expect(action).toBeCalledTimes(2)
  })
})
