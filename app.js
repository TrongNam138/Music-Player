const data = [
    {
        song: 'mama boy',
        singer: 'amme',
        avatar: './images/01.jpg',
        mp3: './music/01.mp3'
    },
    {
        song: 'vì mẹ anh bắt chia tay',
        singer: 'miu lê, karik',
        avatar: './images/02.jpg',
        mp3: './music/02.mp3'
    },
    {
        song: 'Shay Nắnggg',
        singer: 'amme, obito',
        avatar: './images/03.jpg',
        mp3: './music/03.mp3'
    },
    {
        song: 'chạy khỏi thế giới này',
        singer: 'Da LAB, Phương Ly',
        avatar: './images/04.jpg',
        mp3: './music/04.mp3'
    },
    {
        song: 'QUERRY ',
        singer: 'QNT, TRUNG TRẦN, RPT MCK',
        avatar: './images/05.jpg',
        mp3: './music/05.mp3'
    },
    {
        song: 'gác lại âu lo',
        singer: 'dalab, miu lê',
        avatar: './images/06.jpg',
        mp3: './music/06.mp3'
    },
    {
        song: 'matchanah',
        singer: 'híu, bâu',
        avatar: './images/07.jpg',
        mp3: './music/07.mp3'
    },
    {
        song: 'lời đường mật',
        singer: 'lyly, hiếu thứ hai',
        avatar: './images/08.jpg',
        mp3: './music/08.mp3'
    },
    {
        song: 'cô gái vàng',
        singer: 'huyr, tùng viu',
        avatar: './images/09.jpg',
        mp3: './music/09.mp3'
    },
    {
        song: 'cho mình em',
        singer: 'đen, binz',
        avatar: './images/10.jpg',
        mp3: './music/10.mp3'
    },
]

//1. thêm số 0 vào đằng trước các số 0 đến 9
function addZero(number){
    if(number >= 0 && number <= 9) return `0${number}`
    else return number
}

//2. chuyển đổi giây thành phút và format lại 
function convertSecondsToMinutes(timeType, element = ''){
    let seconds = 0
    if(timeType === 'currentTime'){
        seconds = element.currentTime.toFixed(0)
    }else if(timeType === 'duration'){
        seconds = element.duration.toFixed(0)
    }else{
        seconds = timeType.toFixed(0)
    }
    const minutes = Math.trunc(seconds / 60)
    return  `${addZero(minutes)}:${addZero(seconds - minutes * 60)}`
}

//3. tối ưu việc random để 1 bài hát không lặp lại cho đến đã phát hết danh sách bài hát
let random = []
function randomOptimization(arr){
    const max = arr.length
    let numberRandom = Math.floor(Math.random() * max)
    
    if(random.length >= arr.length){
        random = []
    } 
        

    while(random.find(num => numberRandom == num) !== undefined){
        numberRandom = Math.floor(Math.random() * max)
    }

    random.push(numberRandom)
    console.log(random)
    return numberRandom
}

//4 lấy ra phần trăm chiều ngang của chuột và timeline
function percentTimeLine(e){
    let percent = ''
    const left = timeLine.offsetLeft
    const width = timeLine.offsetWidth
    if(clickDown && e.clientX >= left && e.clientX <= left + width){
        percent = (e.clientX - left) / width
    }else if(clickDown && e.clientX < left){
        percent = 0
    }else if(clickDown && e.clientX > left + width){
        percent = 1
    }
    
    return percent
}

//
function intervalCurrent(){
    playingTimeLeft.innerHTML = convertSecondsToMinutes('currentTime', document.querySelector('audio.active'))
    circle.style.left = document.querySelector('audio.active').currentTime / document.querySelector('audio.active').duration * 100 + '%'
    percentLine.style.width = document.querySelector('audio.active').currentTime / document.querySelector('audio.active').duration * 100 + '%'
}

const playList = document.getElementById('playlist')

//5. render danh sách phát
data.forEach((item, index) => {
    playList.insertAdjacentHTML('beforeend', `
    
    <div class="item" data-index="${index}">
    <audio class="audio${++index}" src="${item.mp3}"></audio>
    <span class="item__number">${addZero(index)}</span>
    <img src="${item.avatar}">
    <span class="oi item__icon" data-glyph="caret-right"></span>
    <div class="music">
    <div class="item__song">${item.song}</div>
    <div class="item__singer">${item.singer}</div>
    </div>
    <span class="item__time">00:00</span>
    </div>
    `)
});

//6. hiển thị thời gian bài hát của phần danh sách sau khi render xong
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('loadedmetadata', function(){
        audio.parentElement.querySelector('.item__time').innerHTML = convertSecondsToMinutes('duration', audio)
    })
})

 
const listAudio = document.querySelectorAll('audio')
const listItem = document.querySelectorAll('.item')
const playingImg = document.querySelector('#playing .thumbnail img')
const thumbnail = document.querySelector('#playing .thumbnail')
const playingSong = document.querySelector('#playing .song')
const playingSinger = document.querySelector('#playing .singer')
const playingTimeRight = document.querySelector('#playing .time .right')
const playingTimeLeft = document.querySelector('#playing .time .left')
const play = document.querySelector('.controls .play')
const pause = document.querySelector('.controls .pause')
const forWard = document.querySelector('.controls .forward')
const backward = document.querySelector('.controls .backward')
const timeLine = document.querySelector('#playing .time-line')
const circle = timeLine.querySelector('.circle')
const percentLine = timeLine.querySelector('.percent')
const loop = document.querySelector('.controls .loop')
const randomControl = document.querySelector('.controls .random')


listItem[0].classList.add('active')
listAudio[0].classList.add('active')

let currentTime = ''

//7. khi nhấn bài bài hát
listItem.forEach(item => {
    item.addEventListener('click', function(){

        thumbnail.classList.remove('pause')
        thumbnail.classList.remove('play')
        
        //6.1 hiệu ứng active 
        document.querySelector('.item.active').classList.remove('active')
        item.classList.add('active')

        //6.2 dừng audio đang phát vào đặt thời gian về 0
        document.querySelector('audio.active').pause()
        document.querySelector('audio.active').currentTime = 0

        //6.3 xóa, thêm class active cho audio
        document.querySelector('audio.active').classList.remove('active')
        item.querySelector('audio').classList.add('active')
        
        //6.4 hiệu ứng thay đổi ảnh, bài hát, ca sĩ, thời gian
        playingImg.setAttribute('src', item.querySelector('img').getAttribute('src'))
        playingSong.innerHTML = item.querySelector('.item__song').innerHTML
        playingSinger.innerHTML = item.querySelector('.item__singer').innerHTML
        playingTimeRight.innerHTML = item.querySelector('.item__time').innerHTML

        //6.5 hiệu ứng cuộn, clearInterval, xóa class active của loop
        item.scrollIntoView({behavior: "smooth", block: "center"})
        clearInterval(currentTime)
        loop.classList.remove('active')

        play.click()
    })
})

//8. khi ấn play
play.addEventListener('click', function(){
    forWard.style.pointerEvents = 'all'

    thumbnail.classList.remove('pause')
    thumbnail.classList.add('play')

    //8.1 hiệu ứng đổi sang pause
    play.style.display = 'none'
    pause.style.display = 'block'
    
    //8.2 phát audio đang active
    document.querySelector('audio.active').play()
    
    //8.3 hiệu ứng thời giạn hiện tại của bài hát
    currentTime =  setInterval(()=>{
        intervalCurrent()
    }, 100)

    //8.4 khi audio active kết thúc
    document.querySelector('audio.active').onended = function(){
        clearInterval(currentTime)
        
        // nếu ấn chọn loop
        if(loop.classList.contains('active')){
            play.click()
        // mặc định phát bài tiếp theo
        }else{
            forWard.click()
        }
    }
    

})

//9. khi ấn pause
pause.addEventListener('click', function(){
    pause.style.display = 'none'
    play.style.display = 'block'

    thumbnail.classList.remove('play')
    thumbnail.classList.add('pause')

    clearInterval(currentTime)
    document.querySelector('audio.active').pause()
})

//10. khi ấn forWard
forWard.addEventListener('click', function(){
    // nếu ấn chọn random
    if(randomControl.classList.contains('active'))
    {
        listItem[randomOptimization(listItem)].click()
    }
    else
    {
        const nextItem = document.querySelector('.item.active').nextElementSibling
        if(nextItem){
            nextItem.click()
        }else{
            pause.click()
            this.style.pointerEvents = 'none'
        }
    }
})

//11. khi ấn backWard
backward.addEventListener('click', function(){
    if(randomControl.classList.contains('active'))
    {
        if(document.querySelector('audio.active').currentTime <= 3){
            listItem[randomOptimization(listItem)].click()
        }else{
            document.querySelector('audio.active').currentTime = 0
        }
    }
    else
    {
        const prevItem = document.querySelector('.item.active').previousElementSibling
        if(prevItem && document.querySelector('audio.active').currentTime <= 3){
            prevItem.click()
        }else{
            document.querySelector('audio.active').currentTime = 0
        }
    }
    
})

let clickDown = false

//12. hiệu ứng kéo thả time line
window.addEventListener('mousedown', function(e){
    if(e.target.matches('.circle') || e.target.matches('.time-line') || e.target.matches('.percent')){
        clickDown = true
        clearInterval(currentTime)
    }
})

window.addEventListener('mousemove', function(e){
    this.document.body.style.userSelect = 'none'

    let percent = percentTimeLine(e)

    if(clickDown){
        clearInterval(currentTime)
        playingTimeLeft.innerHTML =  convertSecondsToMinutes(percent * document.querySelector('audio.active').duration)
        circle.style.left = percent * 100 + '%'
        percentLine.style.width = percent * 100 + '%'
    }
    
})

window.addEventListener('mouseup', function(e){
    if(clickDown){
        document.querySelector('audio.active').currentTime = percentTimeLine(e) * document.querySelector('audio.active').duration
        currentTime =  setInterval(()=>{
            intervalCurrent()
        }, 100)
        clickDown = false
    }
})

timeLine.addEventListener('click', function(){
    intervalCurrent()
})


//13. khi ấn vào loop
loop.addEventListener('click', function(){
    randomControl.classList.remove('active')
    this.classList.toggle('active')
})

//14. khi ấn vào random
randomControl.addEventListener('click', function(){
    loop.classList.remove('active')
    this.classList.toggle('active')
    random = []
    if(this.classList.contains('active')){
        random.push(document.querySelector('.item.active').dataset.index)
    }
})

thumbnail.addEventListener('animationend', function(e){
    if(e.animationName === 'rotatePause'){
        thumbnail.classList.remove('pause')
        this.style.borderRadius = '20px'
    }
})