let audioChunks = [],audioObjects = []
let tallentaa=false,records=[],iseka=true;
let dexie = new Dexie("friend_database");
let dashboard=$('#dashboard')
ulRecords=document.querySelector('#ulList')
 
dexie.version(1).stores({
    friends: '++id,name,shoeSize,blob,toka',
     
});
 

navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
 
const stopButton = document.querySelector('#tallenna')
stopButton.innerText='eka'
let ekaTallennus,tokaTallennus

 
 
// mediaRecorder.addEventListener("stop", () => {
  
//   //let tallennettava=audioChunks[audioChunks.length-1]
//   const audioBlob = new Blob(audioChunks);
//   audioChunks=[]
//   const audioUrl = URL.createObjectURL(audioBlob);
//   const audio = new Audio(audioUrl);
//   audio.controls=true
//   audio.src=audioUrl
//   dashboard.append(audio)
//   audio.play();
//   console.log(audioChunks)

//   /*
//   dexie.friends.put({blob: BLOB,toka: blob}).then (function(){     
//                                 //
//                                 // Then when data is stored, read from it
//                                 //
//                                 //return dexie.friends.get('Nicolas');
//                                 console.log('blobk added');soita(blob)
//                     }).catch( e=> {console.log(e);alert('Dexi alert '+e)}
//                     )
//   */
   
// });
 

stopButton.addEventListener('click', () => {
  myRecorder.init()
  muuta()

    setTimeout(()=>{
    muuta()
    //document.getElementById('tallenna').style.backgroundColor='darkred'
    // setTimeout(()=>muuta(),2000)  
    if (tallentaa)  {myRecorder.stop();tallentaa=false} 
    else { myRecorder.start();tallentaa=true;stopButton.innerText="tallentaa"}
  
  }
  ,2000)


    if (tallentaa)  {myRecorder.stop();tallentaa=false} 
    else { myRecorder.start();tallentaa=true;stopButton.innerText="tallentaa"}
})

// $('#tallenna').click(function(){
//   console.log('recbutton')
   
//    myRecorder.init()

//   muuta()
  
//   setTimeout(()=>{
//     muuta()
//     //document.getElementById('tallenna').style.backgroundColor='darkred'
//     // setTimeout(()=>muuta(),2000)  
//     if (tallentaa)  {myRecorder.stop();tallentaa=false} 
//     else { myRecorder.start();tallentaa=true;stopButton.innerText="tallentaa"}
  
//   }
//   ,2000)
   
// });	

});


haeTallenteet()

function haeTallenteet () {
    dexie.friends.toArray().then(e=>{
        
       records=e
       //apu.innerHTML='valmis'+records[2].id;
       console.log('records ',records )
       //listaaTallenteet()
       listaaTallenteet2()
       })
       .catch(e=>{alert('hae tallenteet ');console.log(e)})
}

function listaaTallenteet2 () {
    for (keyy of records) {
        console.log( keyy.id)
        console.log('190')
        liHelper=document.createElement('li')
        //liHelper.innerHTML=key
       
        buttonHelper=document.createElement('button')
        var link = document.createTextNode(keyy.id); 
        buttonHelper.appendChild(link); 
        buttonHelper.onclick=function () {soita (keyy.blob)}
        buttonHelper.classList.add("mystyle");
        ulRecords.appendChild(buttonHelper)


        buttonHelper2=document.createElement('button')
        var link2 = document.createTextNode(keyy.id); 
        buttonHelper2.appendChild(link2); 
        buttonHelper2.onclick=function () {soita (keyy.toka)}
        //buttonHelper2.classList.add("button");
        buttonHelper2.classList.add("mystyle");

        ulRecords.appendChild(buttonHelper2)





       
       // liHelper.append(aHelper)
        console.log('228')
        ulRecords.append(liHelper)
        console.log('lop')
        //lisaaLog(ulRecords)

        teeX ()
       }
}

function teeX () {
  buttonHelper2=document.createElement('button')
        var link2 = document.createTextNode('X')
        buttonHelper2.appendChild(link2); 
        buttonHelper2.onclick=function () {soita (keyy.toka)}
        //buttonHelper2.classList.add("button");
        buttonHelper2.classList.add("xtyyli");

        ulRecords.appendChild(buttonHelper2)

}


$('#tallenna').addClass("notRec");

// $('#tallenna').click(function(){
//   console.log('recbutton')
//   if (tallentaa)  {mediaRecorder.stop();tallentaa=false} 
//     else { mediaRecorder.start();tallentaa=true;stopButton.innerText="tallentaa"}
   

//   muuta()
  
//   setTimeout(()=>{
//     muuta()
//     //document.getElementById('tallenna').style.backgroundColor='darkred'
//     // setTimeout(()=>muuta(),2000)  
  
  
//   }
//   ,2000)
   
// });	


function muuta() {
  if(document.querySelector('#tallenna').classList.contains('notRec')){
  document.querySelector('#tallenna').classList.remove("notRec");
  document.querySelector('#tallenna').classList.add("Rec");
}
else{
  document.querySelector('#tallenna').classList.remove("Rec");
  document.querySelector('#tallenna').classList.add("notRec");
}
}
document.querySelector('#vihreatausta').addEventListener('click',
(e)=>{console.log(e);console.log('hei')})
function createButton (blob) {
  var url = (window.URL || window.webkitURL)
                          .createObjectURL(blob);

                  // Prepare the playback
                  var audioObject = document.createElement('audio')
                  //audioObject.controls=true
                  audioObject.src=url


                  if (iseka) {
                      const play =document.createElement('button')
                      const rivi = document.createElement('div')
                      rivi.style.display="flex";
                      rivi.style.width="100%"
                      play.classList.add('playButton')
                      play.textContent="►"
                      play.addEventListener('click',function () {audioObject.play()})
                      
                      const play2 =document.createElement('button')
                      play2.classList.add('playButton')
                      
                      const deleteButton =document.createElement('button')
                      deleteButton.classList.add('deleteButton')
                      deleteButton.textContent="X"
                      // Prepare the download link
                      // var downloadObject = $('<a>&#9660;</a>')
                      //         .attr('href', url)
                      //         .attr('download', new Date().toUTCString() + '.wav');

                      // Wrap everything in a row
                      //var holderObject = $('<div class="row"></div>')
                        //      .append(audioObject)
                        //      .append(downloadObject);

                      // Append to the list
                      rivi.append(play);
                      rivi.append(play2);
                      rivi.append(deleteButton);
                      rivi.append(audioObject)
                      ulRecords.appendChild(rivi)
                      iseka=false
                  }
                  else {
                    len=document.querySelectorAll('.playButton').length
                    let play2=document.querySelectorAll('.playButton')[len-1]
                    play2.textContent="►"
                    play2.addEventListener('click',function () {audioObject.play()})

                    console.log('test')
                    iseka=true
                  }
}



var myRecorder = {
  objects: {
      context: null,
      stream: null,
      recorder: null
  },
  init: function () {
      if (null === myRecorder.objects.context) {
          myRecorder.objects.context = new (
                  window.AudioContext || window.webkitAudioContext
                  );
      }
  },
  start: function () {
      var options = {audio: true, video: false};
      navigator.mediaDevices.getUserMedia(options).then(function (stream) {
          myRecorder.objects.stream = stream;
          myRecorder.objects.recorder = new Recorder(
                  myRecorder.objects.context.createMediaStreamSource(stream),
                  {numChannels: 1}
          );
          myRecorder.objects.recorder.record();
      }).catch(function (err) {});
  },
  stop: function (listObject) {
      if (null !== myRecorder.objects.stream) {
          myRecorder.objects.stream.getAudioTracks()[0].stop();
      }
      if (null !== myRecorder.objects.recorder) {
          myRecorder.objects.recorder.stop();

          // Validate object
          // if (null !== listObject
          //         && 'object' === typeof listObject
          //         && listObject.length > 0)
                   {
              // Export the WAV file
              myRecorder.objects.recorder.exportWAV(function (blob) {
                  // var url = (window.URL || window.webkitURL)
                  //         .createObjectURL(blob);

                  // // Prepare the playback
                  // var audioObject = document.createElement('audio')
                  // //audioObject.controls=true
                  // audioObject.src=url
                  // const play =document.createElement('button')
                  // play.textContent="►"

                  // // Prepare the download link
                  // // var downloadObject = $('<a>&#9660;</a>')
                  // //         .attr('href', url)
                  // //         .attr('download', new Date().toUTCString() + '.wav');

                  // // Wrap everything in a row
                  // //var holderObject = $('<div class="row"></div>')
                  //   //      .append(audioObject)
                  //   //      .append(downloadObject);

                  // // Append to the list
                  // ulRecords.append(play);
                  createButton(blob)
              });
          }
      }
  }
};
 