 
let db=new Localbase()
var dexie = new Dexie("friend_database");
 
dexie.version(1).stores({
    friends: '++id,name,shoeSize,blob',
     
});
 

var BLOB
const mediat = []
let  audioFile,records=[],tallenteita
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

                     BLOB=blob
                     var url = (window.URL || window.webkitURL)
                             .createObjectURL(blob);

                    dexie.friends.put({blob: blob}).then (function(){     
                                //
                                // Then when data is stored, read from it
                                //
                                //return dexie.friends.get('Nicolas');
                                console.log('blobk added')
                    }).catch( e=> console.log(e)//alert('Dexi alert '+e)
                    )
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

                    //  //mediat.push(blob)
                    //  let reader=new FileReader()

                    //  reader.onload = (event) => {
                    //     localStorage.setItem('A'+localStorage.length, event.target.result);
                    //   }
                    

                    //  reader.readAsDataURL(blob)
                     //var blobkStringifyed=a.result
                     //apu.innerText=blobkStringifyed
                     //localStorage.setItem('A'+localStorage.length,blobkStringifyed)
                     //apu.innerHTML=localStorage.getItem('A'+localStorage.length)

                     console.log('url ',url)
                     console.log('media lisätty')
                     console.log('*******Blob************')
                        db.collection('users').add({id:"uusi",blob: blob})
                     console.log('*******Blob************')
                      


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

haeTallenteet()


//apu.innerHTML=''+records._value[0].id;
//tallenteita= records._value.length

async function haeTallenteet () {
    await dexie.friends.toArray().then(e=>{
         
        records=e
        apu.innerHTML='valmis'+records[2].id;
        })
        .catch(e=>alert(e))
}



 
console.log('',records)
// console.log('149   '+typeof records._value)
//console.log(`${records._value.length}`);
//apu.innerHTML=''+records._value.length
console.log(records)
//tallenteita= records.length
//console.log('tallenteita ',tallenteita)
//apu.innerHTML=''+tallenteita._value.length
//if (typeof records._value.length ==="number") {console.log('Number');tallenteita=records._value.length}
// for (i=0;i<tallenteita;i++) {
//     console.log(records._value[i])
// }
//tallenteita=records._value.length
// for (i=0;i<records._value.length;i++) {
    
//     console.log(records._value[i])
// }

// for (keyy of records._value) {
//  console.log( keyy)
 
//  liHelper=document.createElement('li')
//  //liHelper.innerHTML=key

//  buttonHelper=document.createElement('button')
//  var link = document.createTextNode(keyy); 
//  buttonHelper.appendChild(link); 
//  buttonHelper.onclick=function () {soita (key.blob)}

//  liHelper.appendChild(buttonHelper)

// // liHelper.append(aHelper)
//  console.log('228')
//  ulRecords.append(liHelper)
//  console.log('lop')

// }
function clearLocalStorage () {localStorage.clear();console.log('muisti tyhjennetty')}
function soita(linkki) {
    console.log('oli täällä')
    const audio=document.createElement('audio')
    audio.src=URL.toUTCString(linkki)
    console.log(audio.src)
    audio.play()



}
function getBlob() {
    audio2 = document.createElement('audio');
    var aani
    db.collection('users').doc({ id: "uusi" }).get().then(document => {
        
         
        return document.blob
        console.log('aani blobiin')
      })
      audio2.src=aani
      audio2.play()
}
function testi() {console.log('testi')}

function saveDexie () {
    dexie.friends.put({name: "Nicolas", shoeSize: 8}).then (function(){     
        //
        // Then when data is stored, read from it
        //
        return dexie.friends.get('Nicolas');
    })
}

function saveBlob () {
    dexie.friends.put({
        name: "TERO"
        ,
        shoeSize: 3,
        blob: BLOB}).then (function(){     
        //
        // Then when data is stored, read from it
        console.log('Blob saved')

        dexie.friends.get('blob');
    })
}