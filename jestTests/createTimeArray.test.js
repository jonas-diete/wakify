import createTimeArray from "../helperFunctions/createTimeArray"

describe('createTimeArray', () => {
  it('returns correct list of hours', () => {
    expect(createTimeArray(24)[0]).toBe('00');
    expect(createTimeArray(24)[1]).toBe('01');
    expect(createTimeArray(24)[7]).toBe('07');
    expect(createTimeArray(24)[23]).toBe('23');
  })
})