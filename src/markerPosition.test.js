
const calculateMarkerPosition = (ts, duration, index, offset) => {
  console.log(ts)
  console.log(duration)
  console.log(+(ts/duration).toFixed(2))
  const percent = (+(ts/duration).toFixed(2))*100
  console.log(percent)
  const margin = ((+(ts/duration).toFixed(2))*100)-(offset[index-1]+.5)
  console.log(margin)
  if (index+1 === offset.length ) {
    offset = [...offset, percent-(.5*(index+1))]
  }
  console.log(offset)
  return margin
}

test('marker offset never exceeds 99.5%', () => {
  const ts = 68.5
  const duration = 69
  const index = 4
  const offset = [0, 9.5, 49, 73.5]
  const result = calculateMarkerPosition(ts, duration, index, offset)
  console.log(result+73.5);
  expect(result).toBeLessThan(100)
})
