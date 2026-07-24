let t="2D",files=[],autoSave;
let scrollState=0,countDown=0,isBanned=false;

window.onload=()=>{
    setTimeout(()=>{
        document.getElementById("load").style.display="none";
        sw("main");
        loadSave();
        setInterval(autoSaveAll,12000);
    },1800);

    window.addEventListener("scroll",()=>{
        if(isBanned) return;
        let max=document.body.scrollHeight-window.innerHeight;
        let per=window.scrollY/max;
        let r=Math.round(11+per*244);
        document.body.style.backgroundColor=`rgb(${r},${r},${r})`;

        if(per>0.92 && scrollState===0){
            scrollState=1;
            showWarn("นี่นายหยุดเถอะ เดี๋ยวจะมีคนมาหานาย");
            setTimeout(()=>{document.getElementById("warn-layer").style.display="none";},2500);
        }else if(per>0.97 && scrollState===1){
            scrollState=2; countDown=1; showWarn(`⚠️ ${countDown}`);
        }else if(per>0.985 && scrollState===2){
            scrollState=3; countDown=2; showWarn(`⚠️ ${countDown}`);
        }else if(per>=0.999 && scrollState===3){
            scrollState=4; countDown=3; showWarn(`⚠️ ${countDown}`);
            setTimeout(()=>{goBan();},800);
        }
    });
};

function sw(id){document.querySelectorAll(".pg").forEach(e=>e.classList.remove("active"));document.getElementById(id).classList.add("active");}
function setD(d){t=d;document.querySelectorAll(".d-btn").forEach(e=>e.classList.remove("active"));event.target.classList.add("active");}
function useM(n){document.getElementById("pn").value=n;files=[{n:"index.html",c:"<!-- ผลงานโดย กาฟิวทำเว็บ -->\n<h1>"+n+"</h1>"}];updF();sw("new");}
function addF(){let n=prompt("ชื่อไฟล์");if(!n)return;files.push({n:n,c:""});updF();}
function updF(){document.getElementById("fv").innerHTML=files.map((f,i)=>`<div onclick="editF(${i})">📄 ${f.n}</div>`).join("");}
let ed=-1;
function editF(i){ed=i;document.getElementById("fn").value=files[i].n;document.getElementById("fc").value=files[i].c;document.getElementById("fe").style.display="block";}
function saveF(){if(ed<0)return;files[ed].n=document.getElementById("fn").value||"file.txt";files[ed].c=document.getElementById("fc").value;ed=-1;document.getElementById("fe").style.display="none";updF();}
function saveAll(){localStorage.setItem("proj",JSON.stringify({t:document.getElementById("pn").value,files:files}));alert("✅ บันทึกแล้ว");}
function autoSaveAll(){localStorage.setItem("proj",JSON.stringify({t:document.getElementById("pn").value,files:files}));}
function loadSave(){let d=localStorage.getItem("proj");if(!d)return;let p=JSON.parse(d);document.getElementById("pn").value=p.t||"";files=p.files||[];updF();}
function build(){let h=files.find(x=>x.n.match(/index\.html?$/i))?.c||"<h1>ผลงานของฉัน โดย กาฟิวทำเว็บ</h1>";document.getElementById("fm").srcdoc=h;document.getElementById("pv").style.display="block";}
function findH(){let q=document.getElementById("q").value.trim().toLowerCase();let r=CountryData.filter(x=>x.n.th.includes(q)||x.n.en.toLowerCase().includes(q));document.getElementById("rh").innerHTML=r.length?r.map(x=>`<b>${x.n.th}</b> — ${x.s}`).join("<br>"):"ไม่พบข้อมูล";}
function doEx(){let n=document.getElementById("nn").value,f=document.getElementById("fnm").value,l=document.getElementById("ul").value;if(!n||!f||!l)return alert("กรอกข้อมูลให้ครบถ้วน");document.getElementById("ors").innerHTML="✅ ได้รับอนุญาตแล้ว เตรียมไฟล์ให้เรียบร้อย";document.getElementById("ors").style.display="block";}

function showWarn(txt){
    document.getElementById("warn-text").innerText=txt;
    document.getElementById("warn-layer").style.display="flex";
}

function goBan(){
    document.getElementById("warn-layer").style.display="none";
    document.getElementById("ban-layer").style.display="flex";
    isBanned=true;
    let s=60;
    let t=setInterval(()=>{
        s--;
        let m=Math.floor(s/60),ss=s%60;
        document.getElementById("ban-timer").innerText=`0${m}:${ss<10?"0":""}${ss}`;
        if(s<=0){
            clearInterval(t);
            document.getElementById("ban-layer").style.display="none";
            isBanned=false; scrollState=0;
            alert("✅ ครบกำหนด — กลับมาใช้งานได้ตามปกติ");
        }
    },1000);
}

// ระบบขออนุญาตพิเศษ 18+
function check18(){
    let st=1;
    function step(){
        let box=document.getElementById("pstep");
        if(st===1){
            box.innerHTML=`<h4>ขั้นตอนที่ 1/20</h4><p>ถอดรหัสข้อความนี้เป็นไบนารี: <b>กาฟิวทำเว็บ</b></p><input type="text" id="b1" placeholder="ใส่รหัสไบนารี"><button onclick="ch1()">✅ ตรวจสอบ</button>`;
            sw("perm");
        }else if(st===2){
            box.innerHTML=`<div class="char-desc"><div class="char-anim botas"></div><p>เฮ้ ฟังนะ ฉันมาจากเว็บเก่าของคนนี้ 👆</p><p>เลื่อนขึ้นไปด้านบนสุด... กดลิงก์ที่ซ่อนอยู่</p><p>👉 โหลด Roblox ที่ Play Store</p><p>👉 เข้าแมพ Book Heaven เล่นให้ครบ 5 ชั่วโมง</p><button onclick="st=3;step()">✅ กลับมาแล้ว</button></div>`;
        }else if(st===3){
            box.innerHTML=`<h4>ขั้นตอนที่ 3/20</h4><p>พิมพ์รหัสไบนารีที่ได้อีกครั้ง</p><input type="text" id="b3" placeholder="รหัสไบนารี"><p class="wait">⏳ รอ 20 นาที</p><p>👉 สร้างเกมในเว็บนี้ให้ครบ 368 อัน</p><button onclick="st=4;step()">✅ ทำครบแล้ว</button>`;
        }else if(st===4){
            box.innerHTML=`<h4>ขั้นตอนที่ 4/20</h4><p>นำรหัสไปแปลงเป็นเสียง ฟังแล้วแปล จะได้ลิงก์ต่างๆ มา</p><p>มีทั้ง YouTube, Discord</p><button onclick="st=6;step()">✅ ดูครบแล้ว — ข้ามขั้นที่ 7 เพราะยากเกินไป</button>`;
        }else if(st===6){
            box.innerHTML=`<div class="char-desc"><div class="char-anim botas"></div><p>เฮ้อ ฟังนะ กดลิงก์นี้ซะ เพราะเราจะทำอะไรไม่ได้ ถูกบังคับให้กดเท่านั้น</p><a href="https://www.youtube.com/@กาฟิวทำเว็บ" target="_blank" style="color:#ff4757;font-weight:bold;">👉 กดตรงนี้ไปช่อง กาฟิวทำเว็บ</a><p>👉 กดติดตาม + ไลก์ + แชร์ + คอมเมนต์</p><button onclick="st=8;step()">✅ กลับมาแล้ว</button></div>`;
        }else if(st===8){
            box.innerHTML=`<h4>ขั้นตอนที่ 8/20</h4><p>เปิดกล้อง — วิ่งให้ได้ 20 เมตร ภายใน 5 วินาที</p><button onclick="testRun()">🏃 เริ่มทดสอบ</button>`;
        }
    }
    function ch1(){let v=document.getElementById("b1").value.trim();if(v)st=2,step();else alert("ใส่รหัสให้ถูกต้อง");}
    function testRun(){alert("✅ ผ่านแล้ว! ได้รับอนุญาตสร้างเนื้อหาพิเศษเรียบร้อย");box.innerHTML="<h3>✅ ยินดีด้วย!</h3><p>ผ่านทุกขั้นตอนแล้ว</p><button onclick=\"sw('main')\">กลับไปสร้างงาน</button>";}
    step();
}
