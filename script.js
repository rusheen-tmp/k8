const messagesEl=document.getElementById('messages');
const input=document.getElementById('userInput');
const keyButton=document.getElementById('keyButton');
const enterBtn=document.getElementById('enterBtn');
let stage=0,isTyping=false,recent=[];
function setInput(en){input.disabled=!en;if(en)input.focus();}
function typeWriter(txt,cls=''){return new Promise(res=>{const span=document.createElement('span');if(cls)span.className=cls;messagesEl.appendChild(span);let i=0;isTyping=true;setInput(false);const it=setInterval(()=>{span.textContent=txt.slice(0,++i);messagesEl.scrollTop=messagesEl.scrollHeight;if(i===txt.length){clearInterval(it);messagesEl.appendChild(document.createElement('br'));isTyping=false;setInput(true);res();}},35);});}
async function clerkSay(t){await typeWriter('Clerk: ','nameClerk');await typeWriter(t);}
async function youSay(t){await typeWriter('You: ','nameYou');await typeWriter(t);}
const firstLines=["You stand before the gate—by whose order?","State your business, stranger, before the castle listens.","Identify yourself. The walls have ears.","Another seeker? Speak your code."];
const stage1Lines=["A code? Codes twist in corridors like smoke. State it again, if you dare.","I'm waiting. A clearer code, perhaps? Second time is tradition.","The castle rejected that whisper; try once more—louder or wiser.","Curious digits, but they seem incomplete. Provide your code anew."];
const taunts=["Why linger? The door is ajar—step through or step aside.","More words? The castle devours them whole.","Courage fades with every syllable you spill.","Enter, unless your fear prefers these shadows.","Mystery grows impatient. Will you cross the threshold?"];
(async()=>{await clerkSay(firstLines[Math.floor(Math.random()*firstLines.length)]);})();
input.addEventListener('keydown',async e=>{if(e.key==='Enter'&&input.value.trim()&&!isTyping){const txt=input.value.trim();input.value='';await youSay(txt);stage++;if(stage===1){await clerkSay(stage1Lines[Math.floor(Math.random()*stage1Lines.length)]);}else if(stage===2){await clerkSay("Curious… It appears orderly, yet reeks of disorder. One final attempt—prove you belong.");}else if(stage===3){await clerkSay("Very well. Take the key, if your hand won't tremble.");unlock();}else{let rep;do{rep=taunts[Math.floor(Math.random()*taunts.length)];}while(recent.includes(rep));recent.push(rep);if(recent.length>3)recent.shift();await clerkSay(rep);}}});
function unlock(){keyButton.style.display='inline-block';enterBtn.classList.add('active');enterBtn.disabled=false;const go=()=>location.href='stage2.html';keyButton.addEventListener('click',go);enterBtn.addEventListener('click',go);}
