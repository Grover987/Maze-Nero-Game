const map = [
  'WWWWWWWWWWWWWWWWWWWWW',
  'W   W     W     W W W',
  'W W W WWW WWWWW W W W',
  'W W W   W     W W   W',
  'W WWWWWWW W WWW W W W',
  'W         W     W W W',
  'W WWW WWWWW WWWWW W W',
  'W W   W   W W     W W',
  'W WWWWW W W W WWW W F',
  'S     W W W W W W WWW',
  'WWWWW W W W W W W W W',
  'W     W W W   W W W W',
  'W WWWWWWW WWWWW W W W',
  'W       W       W   W',
  'WWWWWWWWWWWWWWWWWWWWW'
]

const maze = []
const main = document.getElementsByTagName('main')
//player
let ph = 0
let pv = 9

map.forEach(function (arr) {
  const array = []
  for (let i = 0; i < arr.length; i++) {
    array.push(arr[i])
  }
  maze.push(array)
})
const labirinth = document.getElementById('maze')

function mazeCreate() {
  maze.forEach(function (arr) {
    const section = document.createElement('section')
    section.classList.add('sessao')
    labirinth.appendChild(section)

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 'W') {
        const wall = document.createElement('div')
        wall.classList.add('wall')
        section.appendChild(wall)
      } else if (arr[i] === ' ') {
        const way = document.createElement('div')
        way.classList.add('way')
        section.appendChild(way)
      } else if (arr[i] === 'S') {
        const player = document.createElement('div')
        player.classList.add('player')
        section.appendChild(player)
      } else if (arr[i] === 'F') {
        const finish = document.createElement('div')
        finish.classList.add('finish')
        section.appendChild(finish)
      }
    }
  })
}

const player = document.getElementsByClassName('player')

document.addEventListener('keydown', event => {
  const keyName = event.key
  console.log('keydown event\n\n' + 'key: ' + keyName)

  if (keyName === 'ArrowRight') {
    if (maze[pv][ph + 1] === 'F') {
      const labirinth = document.getElementById('maze')
      labirinth.innerHTML = ''
      const win = document.createElement('img')
      win.src = '/assets/win.jpg'
      document.body.appendChild(win)
    }

    if (maze[pv][ph + 1] === ' ') {
      maze[pv][ph] = ' '
      maze[pv][ph + 1] = 'S'
      ph += 1
      const labirinth = document.getElementById('maze')
      labirinth.innerHTML = ''
      mazeCreate()
    }
  }

  if (keyName === 'ArrowLeft') {
    if (maze[pv][ph - 1] === ' ') {
      maze[pv][ph] = ' '
      maze[pv][ph - 1] = 'S'
      ph -= 1
      const labirinth = document.getElementById('maze')
      labirinth.innerHTML = ''
      mazeCreate()
    }
  }

  if (keyName === 'ArrowUp') {
    if (maze[pv - 1][ph] === ' ') {
      maze[pv][ph] = ' '
      maze[pv - 1][ph] = 'S'
      pv -= 1
      const labirinth = document.getElementById('maze')
      labirinth.innerHTML = ''
      mazeCreate()
    }
  }

  if (keyName === 'ArrowDown') {
    if (maze[pv + 1][ph] === ' ') {
      maze[pv][ph] = ' '
      maze[pv + 1][ph] = 'S'
      pv += 1
      const labirinth = document.getElementById('maze')
      labirinth.innerHTML = ''
      mazeCreate()
    }
  }
})

myAudio.loop = true
document.getElementById('myAudio').play()
