console.log("Welcome to spotify")


//initialise the variables
let flagMyPlay=0;
let songIndex=1;
let audioElement = new Audio('songs/1.mp3')
let masterPlay= document.getElementById('masterPlay')
let myProgressBar= document.getElementById('myProgressBar')
let gif= document.getElementById('gif')
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'))
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterSongName = document.getElementById('masterSongName')


let songs =[
    {songName : "Some-song1", filepath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName : "Some-song2", filepath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName : "Some-song3", filepath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName : "Some-song4", filepath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName : "Some-song5", filepath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName : "Some-song6", filepath:"songs/6.mp3", coverPath: "covers/6.jpg"},
]


songItems.forEach((element, i)=>{
    // console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText= songs[i].songName
})

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused ||  audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value *audioElement.duration)/100
})

const makeallplays=()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })

}

songItemPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target)
        if(flagMyPlay===0)
        {
            makeallplays();
            flagMyPlay=1
            songIndex= parseInt(e.target.id)
            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            audioElement.src=`songs/${songIndex+1}.mp3`
            audioElement.play()
            masterSongName.innerText= songs[songIndex].songName
            audioElement.currentTime=0
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity=1;
        }
        else
        {
            flagMyPlay=0
            audioElement.pause()
            e.target.classList.remove('fa-pause-circle')
            e.target.classList.add('fa-play-circle')
        }
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6)
    {
        songIndex=1
    }
    else
    {
        songIndex=songIndex+1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    audioElement.play()
    masterSongName.innerText= songs[songIndex].songName
    audioElement.currentTime=0
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1)
    {
        songIndex=6
    }
    else
    {
        songIndex=songIndex-1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    audioElement.play()
    masterSongName.innerText= songs[songIndex].songName
    audioElement.currentTime=0
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
})