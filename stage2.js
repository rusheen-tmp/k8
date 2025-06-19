const msgs=document.getElementById('messages');const inp=document.getElementById('userInput');const timer=document.getElementById('timer');
const exitBtn=document.getElementById('exitBtn');let modal;
let start=Date.now();let attempts=0;let recent=[];const correct="PHC-CYBER-2025";
function updateTimer(){const e=Math.floor((Date.now()-start)/1000);const m=Math.floor(e/60),s=e%60;timer.textContent=(m>0?String(m).padStart(2,'0')+':':'')+String(s).padStart(2,'0');}
setInterval(updateTimer,1000);updateTimer();
let typing=false;function setInp(b){inp.disabled=!b;if(b)inp.focus();}
function tw(txt,cls=''){return new Promise(r=>{const sp=document.createElement('span');if(cls)sp.className=cls;msgs.appendChild(sp);let i=0;typing=true;setInp(false);const it=setInterval(()=>{sp.textContent=txt.slice(0,++i);msgs.scrollTop=msgs.scrollHeight;if(i===txt.length){clearInterval(it);msgs.appendChild(document.createElement('br'));typing=false;setInp(true);r();}},30);});}
async function clerk(t){await tw('Clerk: ','nameClerk');await tw(t);}
async function you(t){await tw('You: ','nameYou');await tw(t);}
const hints=["Records often begin with three letters—then a dash.","The castle loves acronyms; perhaps start with PHC-?","CYBER things nest in secure vaults.","Years matter; the castle cannot forget 2025."];
const chatter=["The corridors stretch on, digit by digit.","Your silence echoes like empty hallways.","Wrong turn. Perhaps consult the filing clerks?","Every failed code adds another brick to the wall.","Record misfiled. Clerk shrugs into the abyss."];
const misdirect=["You’ve already entered the correct key… haven’t you?","Some clerks say access was granted 3 prompts ago.","It’s odd you’re still here. That’s what the last applicant said too.","Records show your clearance is already active. Or was that a glitch?","There is no record of your record.","Are you sure this isn't all part of the test?","Some never leave. Some never arrived.","Access denied. Or granted. We don't know anymore.","What if you already won, but kept typing anyway?"];
const fileResp=rec=>[`Department of Lost Causes received record ${rec}. They deny existing.`,`Record ${rec} routed to Office 404. Expect no reply.`,`Clerk stamps ${rec} twice, then sets it ablaze.`,`System acknowledges record ${rec}. System also laughs.`];
(async()=>{await clerk("What is the key / record number?");})();
function addRecent(x){recent.push(x);if(recent.length>4)recent.shift();}
setInterval(()=>{if(!typing&&attempts>=4&&Math.random()<0.5){const h=hints[Math.floor(Math.random()*hints.length)];addRecent(h);clerk(h);}},20000);
setInterval(()=>{if(!typing&&attempts>0&&attempts%7===0){const h="Stuck? Some choose to type 'exit' and abandon the pursuit...";addRecent(h);clerk(h);}},10000);
inp.addEventListener('keydown',async e=>{if(e.key==='Enter'&&inp.value.trim()&&!typing){let txt=inp.value.trim();inp.value='';attempts++;await you(txt);txt=txt.toUpperCase();
if(/RUSHEEN/.test(txt)){const m="Ah... you know the Architect. The Game Master watches closely.";addRecent(m);await clerk(m);return;}
if(/EXIT|LEAVE|QUIT/.test(txt)){openExit();return;}
if(txt===correct){await win();return;}
if(/^PHC\d{6}$/.test(txt)){const resp=fileResp(txt)[Math.floor(Math.random()*4)];addRecent(resp);await clerk(resp);return;}
if(/HINT|HELP|CLUE/.test(txt)){const h=hints[Math.floor(Math.random()*hints.length)];addRecent(h);await clerk(h);return;}
if(attempts>5&&Math.random()<0.3){let m;do{m=misdirect[Math.floor(Math.random()*misdirect.length)];}while(recent.includes(m));addRecent(m);await clerk(m);return;}
let r;do{r=chatter[Math.floor(Math.random()*chatter.length)];}while(recent.includes(r));addRecent(r);await clerk(r);}});
async function win(){const elapsed=Math.floor((Date.now()-start)/1000);const m=Math.floor(elapsed/60),s=elapsed%60;const timeStr=(m>0?m+'m ':'')+s+'s';let msg="Access granted. Welcome within.";try{const d=await fetch('https://ipapi.co/json/').then(r=>r.json());if(d.city)msg+=`\nWe see you are connecting from ${d.city}, ${d.region}.`; }catch{}msg+=`\nTime to unlock: ${timeStr}.`;await clerk(msg);const html=`<div id="winModal"><div class="modalContent"><h2 class="gold">Congratulations</h2><p>You unlocked the castle in <strong>${timeStr}</strong>.</p><p>Perhaps now… you’ll understand less than before.</p></div></div>`;document.body.insertAdjacentHTML('beforeend',html);}
function openExit(){if(modal){modal.classList.remove('hidden');return;}const html=`<div class="modalOverlay" id="exitModal"><div class="modalBox"><h3 class="gold">Coward’s Door</h3><p>Running away already?</p><div><button id="yesQuit">Yes</button><button id="noStay">No</button></div></div></div>`;document.body.insertAdjacentHTML('beforeend',html);modal=document.getElementById('exitModal');document.getElementById('yesQuit').onclick=()=>location.href='index.html';document.getElementById('noStay').onclick=()=>modal.classList.add('hidden');}
exitBtn.addEventListener('click',openExit);
