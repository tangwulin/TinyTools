export const getDefaultMusic = () => {
  return [
    {
      name: 'Never Gonna Give You Up',
      url: 'https://music.163.com/song/media/outer/url?id=5221167.mp3',
      offset: 0,
      uniqueId: generateUniqueId()
    },
    {
      name: '好运来',
      url: 'https://music.163.com/song/media/outer/url?id=333750.mp3',
      offset: 0,
      uniqueId: generateUniqueId()
    },
    {
      name: '烟distance',
      url: 'https://music.163.com/song/media/outer/url?id=2039800852.mp3',
      offset: 0,
      uniqueId: generateUniqueId()
    },
    {
      name: 'Tunak Tunak Tun',
      url: 'https://music.163.com/song/media/outer/url?id=1303214808.mp3',
      offset: 0,
      uniqueId: generateUniqueId()
    },
    {
      name: '阳光彩虹小白鸡',
      url: 'https://music.163.com/song/media/outer/url?id=1948834228.mp3',
      offset: 0,
      uniqueId: generateUniqueId()
    },
    {
      name: 'The Magnificent Seven',
      url: 'https://music.163.com/song/media/outer/url?id=430620198.mp3',
      offset: 0,
      uniqueId: generateUniqueId()
    },
    {
      name: 'Liyue 璃月',
      url: 'https://music.163.com/song/media/outer/url?id=1492276411.mp3',
      offset: 154.5,
      uniqueId: generateUniqueId()
    }, {
      name: '水手',
      url: 'https://music.163.com/song/media/outer/url?id=5238221.mp3',
      offset: 72.2,
      uniqueId: generateUniqueId()
    },
  ]
}

export function generateUniqueId()
{
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}