let db=new Localbase()
const mediat = []
const apu = document.querySelector('#apu')
jQuery(document).ready(function () {
 var $ = jQuery;
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
//				debugger			
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
             if (null !== listObject
                     && 'object' === typeof listObject
                     && listObject.length > 0) {
                 // Export the WAV file
                 myRecorder.objects.recorder.exportWAV(function (blob) {
                     var url = (window.URL || window.webkitURL)
                             .createObjectURL(blob);
     //debugger

                     // Prepare the playback
                     var audioObject = $('<audio controls></audio>')
                             .attr('src', url);

                     // Prepare the download link
                     var date= new Date()
                     var dateHelper=date.getHours()+date.getMinutes()+date.getSeconds()
                     var wavHelper=new Date().toUTCString() + '.wav'
                     var downloadObject = $('<a>&#9660;</a>')
                             .attr('href', url)
                             .attr('download',  wavHelper);//debugger

                     // Wrap everything in a row
                     var holderObject = $('<div class="row"></div>')
                             .append(audioObject)
                             .append(downloadObject);

                     // Append to the list
                     listObject.append(holderObject);

                     //mediat.push(blob)
                     let reader=new FileReader()

                     reader.onload = (event) => {
                        localStorage.setItem('A'+localStorage.length, event.target.result);
                      }
                    

                     reader.readAsDataURL(blob)
                     //var blobkStringifyed=a.result
                     //apu.innerText=blobkStringifyed
                     //localStorage.setItem('A'+localStorage.length,blobkStringifyed)
                     //apu.innerHTML=localStorage.getItem('A'+localStorage.length)

                     console.log('url ',url)
                     console.log('media lisätty')
                 });
             }
         }
    //  let fReader=new FileReader()
    //  console.log('Media Reader')
    //  fReader.readAsDataURL(mediat[length-1])
    //  localStorage.setItem(wavHelper,fReader.result)
     
     
     
     }
 };

 // Prepare the recordings list
 var listObject = $('[data-role="recordings"]');


 // Prepare the record button
 $('[data-role="controls"] > button').click(function () {
     // Initialize the recorder
     myRecorder.init();

     // Get the button state 
     var buttonState = !!$(this).attr('data-recording');

     // Toggle
     if (!buttonState) {
         $(this).attr('data-recording', 'true');
         myRecorder.start();
     } else {
         $(this).attr('data-recording', '');
         myRecorder.stop(listObject);
     }
 });
});

console.log('was here')
ulRecords=document.querySelector('#ulList')
var locKeys=Object.keys(localStorage)
for (keyy of locKeys) {
 console.log( keyy)
 
 liHelper=document.createElement('li')
 //liHelper.innerHTML=key

 buttonHelper=document.createElement('button')
 var link = document.createTextNode(keyy); 
 buttonHelper.appendChild(link); 
 buttonHelper.onclick=function () {soita (localStorage.keyy)}

 liHelper.appendChild(buttonHelper)

// liHelper.append(aHelper)
 console.log('228')
 ulRecords.append(liHelper)
 console.log('lop')

}
function clearLocalStorage () {localStorage.clear();console.log('muisti tyhjennetty')}
function soita(linkki) {
    console.log('oli täällä')
    const audio=document.createElement('audio')
    audio.src=linkki
    console.log(audio.src)
    audio.play()



}

