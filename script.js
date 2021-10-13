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

let keyName = ''
let maze = []
let turn = 'right'
const main = document.getElementsByTagName('main')
const audio = document.getElementById('bump')

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
        const playerchar = document.createElement('img')
        playerchar.setAttribute('id', 'playerchar')
        player.appendChild(playerchar)
        if (turn === 'left') {
          playerchar.src = 'assets/padoru2.png'
        } else {
          playerchar.src = 'assets/padoru.png'
        }

        if (keyName === 'ArrowRight') {
          if (maze[pv][ph - 1] !== 'W') {
            playerchar.classList.add('right')
          }
        } else if (keyName === 'ArrowLeft') {
          if (maze[pv][ph + 1] !== 'W') {
            playerchar.classList.add('left')
          }
        } else if (keyName === 'ArrowUp') {
          playerchar.classList.add('up')
        } else if (keyName === 'ArrowDown') {
          playerchar.classList.add('down')
        }
      } else if (arr[i] === 'F') {
        const finish = document.createElement('div')
        finish.classList.add('finish')
        section.appendChild(finish)
      }
    }
  })
}

mazeCreate()

const player = document.getElementsByClassName('player')

document.addEventListener('keydown', event => {
  keyName = event.key

  if (keyName === 'ArrowRight') {
    turn = 'right'
    if (maze[pv][ph + 1] === 'F') {
      const labirinth = document.getElementById('maze')
      labirinth.innerHTML = ''
      const win = document.createElement('img')
      win.src = '/assets/win.jpg'
      labirinth.appendChild(win)
    }

    if (maze[pv][ph + 1] === ' ') {
      maze[pv][ph] = ' '
      maze[pv][ph + 1] = 'S'
      const labirinth = document.getElementById('maze')
      ph += 1
      let char = document.getElementById('playerchar')
      char.classList.add('right')
      labirinth.innerHTML = ''
      mazeCreate()
    } else if (maze[pv][ph + 1] === 'W') {
      labirinth.innerHTML = ''
      mazeCreate()
      audio.play()
    }
  }

  if (keyName === 'ArrowLeft') {
    turn = 'left'
    if (maze[pv][ph - 1] === ' ') {
      maze[pv][ph] = ' '
      maze[pv][ph - 1] = 'S'
      ph -= 1
      const labirinth = document.getElementById('maze')
      labirinth.innerHTML = ''
      mazeCreate()
    } else if (maze[pv][ph - 1] === 'W') {
      labirinth.innerHTML = ''
      mazeCreate()
      audio.play()
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
    } else if (maze[pv - 1][ph] === 'W') {
      audio.play()
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
    if (maze[pv + 1][ph] === 'W') {
      audio.play()
    }
  }
})

const reset = document.getElementById('reset')
reset.addEventListener('click', function () {
  ph = 0
  pv = 9
  maze = []
  map.forEach(function (arr) {
    const array = []
    for (let i = 0; i < arr.length; i++) {
      array.push(arr[i])
    }
    maze.push(array)
  })
  labirinth.innerHTML = ''
  mazeCreate()
})

function music() {
  myAudio.loop = true
  document.getElementById('myAudio').play()
  myAudio.volume = 0.2
}
music()
