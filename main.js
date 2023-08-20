var word=document.getElementById("word")
var container=document.querySelector('.result')

var url='https://api.dictionaryapi.dev/api/v2/entries/en/'




async function DicData(){
    
    var res=await fetch(`${url}${word.value}`);
    var data=await res.json()
    if(!data){
        container.innerHTML='Nothing found'
    }
    else{
        container.style.display="block"
    data.map(el=>{
        var box=document.createElement("div")
        box.classList.add("flex", "justify-between", "items-center")
        var word=document.createElement("h1")
        word.classList.add("uppercase")
        word.innerHTML=el.word
        box.appendChild(word)
        container.appendChild(box)

        var pronounce=document.createElement("i")
        pronounce.classList.add("fas", "fa-volume-up")
        box.appendChild(pronounce)
        var phono=document.createElement("i")
        phono.innerHTML=el.phonetics[1].text
        document.getElementById("audio").src=el.phonetics[1].audio
        pronounce.addEventListener('click', ()=>{
            document.getElementById("audio").play() 
        })
        
        container.appendChild(phono)
        
        for(var i=0; i<el.meanings[0].definitions.length;i++){
            var ol=document.createElement('ul') 
            var li=document.createElement('li')
            li.innerHTML=el.meanings[0].definitions[i].definition
            ol.appendChild(li)
            container.appendChild(ol)
        }
        document.getElementById("word").value=''
    })}
}







document.getElementById("word").addEventListener("input", ()=>{
    document.querySelector(".result").style.display="none"
    document.querySelector(".result").innerHTML=''
})