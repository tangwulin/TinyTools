export const getRenderingList = (x = [], oldRenderingList = [], coloringEdge = false) => {
  let stopwatch = performance.now()
  if (x.length === 0) return []

  if (coloringEdge)
  {
    x.forEach((item, index) => {
      if (parseEdgeSeatIndex(x.length).find(y => y === index) || index === 0)
      {
        item.color = '#114514'
      }
      else
      {
        item.color = null
      }
    })
  }

  if (oldRenderingList.length === 0) //判断是否为拖动导致的更新
  {
    console.log('Calculation mode')
    const result = x.map(item => ({
      name: item.name, isSeat: true, index: item.index, color: item.color
    })).flatMap((value, index) => {
      if ((index + 1) % 2 === 0 && (index + 1) % 8 !== 0)
      {
        return [value, { name: null, isSeat: false }]
      }
      else
      {
        return value
      }
    })
    console.log('convert time:' + (performance.now() - stopwatch))
    stopwatch = performance.now()
    const remaining = 11 - (result.length % 11)

    if (remaining % 3 !== 0)
    {
      for (let i = 0; i < remaining % 3; i++)
      {
        result.push({ name: null, isSeat: false, isDashed: true })
      }
    }

    for (let i = 0; i < (remaining - remaining % 3) / 3; i++)
    {
      result.push({ name: null, isSeat: false }, { name: null, isSeat: false, isDashed: true }, {
        name: null, isSeat: false, isDashed: true
      })
    }
    console.log('add blank time:' + (performance.now() - stopwatch))
    return result
  }
  else
  {
    console.log('Replace mode')
    let i = 0
    oldRenderingList.forEach(item => {
      if (item.isSeat)
      {
        item.name = x[i].name
        item.color = x[i].color
        i++
      }
    })
    return oldRenderingList
  }
}

export const parseRenderingListToSeats = (x) => {
  return x
    .map(item => {
      if (item.isSeat !== false)
      {
        return { name: item.name, index: item.index, color: item.color }
      }
    })
    .filter(item => item !== undefined)
    .map((item, index) => {return { name: item.name, index: index }})
}

export const parseEdgeSeatIndex = (l) => {
  if (l === 0) return []
  let result = []

  if (Math.floor(l / 8) === 0)
  {
    for (let i = 0; i < l; i++)
    {
      result.push(i)
    }
    return result
  }

  for (let i = 0; i < Math.floor(l / 8); i++)// 左右两侧
  {
    result.push(i * 8, i * 8 + 7)
  }

  for (let i = 0; i < 6; i++)// 最后一个满排
  {
    result.push(l - l % 8 - 7 + i)
  }

  if (l % 8 !== 0)
  {
    for (let i = 1; i <= l % 8; i++)// 真·最后一排
    {
      result.push(l - l % 8 - 1 + i)
    }
  }

  return result
}