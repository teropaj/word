const audioChunks = []
let tallentaa=false,records=[];
let dexie = new Dexie("friend_database");
ulRecords=document.querySelector('#ulList')

dexie.version(1).stores({
    friends: '++id,name,shoeSize,blob,toka',
     
});

navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
const mediaRecorder = new MediaRecorder(stream);
const stopButton = document.querySelector('#tallenna')
stopButton.innerText='eka'
let ekaTallennus,tokaTallennus

 
mediaRecorder.addEventListener("dataavailable", event => {
  audioChunks.push(event.data);
});
 
mediaRecorder.addEventListener("stop", () => {
  
  const audioBlob = new Blob(audioChunks);
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.controls=true
  audio.src=audioUrl
  //document.body.appendChild(audio)
  audio.play();
  console.log(audioChunks)
});
 

stopButton.addEventListener('click', () => {
    if (tallentaa)  {mediaRecorder.stop();tallentaa=false} 
    else { mediaRecorder.start();tallentaa=true;stopButton.innerText="tallentaa"}
})

$('#tallenna').click(function(){
  console.log('recbutton')
   
   

  muuta()
  
  setTimeout(()=>{
    muuta()
    //document.getElementById('tallenna').style.backgroundColor='darkred'
    // setTimeout(()=>muuta(),2000)  
    if (tallentaa)  {mediaRecorder.stop();tallentaa=false} 
    else { mediaRecorder.start();tallentaa=true;stopButton.innerText="tallentaa"}
  
  }
  ,2000)
   
});	

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
       }
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
  if($('#tallenna').hasClass('notRec')){
  $('#tallenna').removeClass("notRec");
  $('#tallenna').addClass("Rec");
}
else{
  $('#tallenna').removeClass("Rec");
  $('#tallenna').addClass("notRec");
}
}