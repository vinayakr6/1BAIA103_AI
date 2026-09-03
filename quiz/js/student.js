const status=document.getElementById("firebaseStatus"),form=document.getElementById("studentForm");
const section=document.getElementById("quizSection"),list=document.getElementById("quizList"),welcome=document.getElementById("welcomeText");
let student=null;
function setStatus(t,c=""){status.textContent=t;status.className="firebase-status "+c;}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function loadSaved(){try{const s=JSON.parse(localStorage.getItem("1baia103_quiz_student")||"null");if(s){studentName.value=s.name||"";rollNo.value=s.rollNo||"";branch.value=s.branch||"";}}catch(e){}}
form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;
student={name:studentName.value.trim(),rollNo:rollNo.value.trim(),branch:branch.value};
localStorage.setItem("1baia103_quiz_student",JSON.stringify(student));welcome.textContent="Welcome, "+student.name;section.classList.remove("hidden");loadQuizzes();});
document.getElementById("changeStudent").onclick=()=>section.classList.add("hidden");

async function loadQuizzes(){
const f=window.firebaseQuiz;
if(!f?.configured){setStatus("Firebase: configuration required","offline");return;}
try{
const {collection,getDocs,query,where}=await import("https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js");
const snap=await getDocs(query(collection(f.db,"quizzes"),where("status","==","active")));
const now=Date.now(), quizzes=snap.docs.map(d=>({id:d.id,...d.data()})).filter(q=>{
const s=q.startAt?.toDate?q.startAt.toDate().getTime():null,e=q.endAt?.toDate?q.endAt.toDate().getTime():null;
return(!s||now>=s)&&(!e||now<=e);});
setStatus("Firebase: connected","online");
if(!quizzes.length){list.innerHTML='<div class="empty">No active quizzes are available right now.</div>';return;}
list.innerHTML=quizzes.map(q=>`<article class="quiz-card"><div><span class="badge">${esc(q.module||"Quiz")}</span><h3>${esc(q.title||"Untitled Quiz")}</h3><p>${esc(q.class||"")}</p></div><div class="quiz-meta"><span>${q.durationMinutes||0} min</span><span>${q.questionCount||"—"} questions</span><button class="primary" data-quiz="${esc(q.id)}">Start Quiz</button></div></article>`).join("");
list.querySelectorAll("[data-quiz]").forEach(b=>b.onclick=()=>alert("Quiz engine will be added in Phase 2. Selected: "+b.dataset.quiz));
}catch(e){console.error(e);setStatus("Firebase: connection error","offline");list.innerHTML='<div class="empty">Unable to load quizzes. Check Firebase configuration and Firestore rules.</div>';}}
document.addEventListener("firebase-ready",()=>{setStatus("Firebase: connected","online");if(student)loadQuizzes();});
document.addEventListener("firebase-not-configured",()=>setStatus("Firebase: configuration required","offline"));
loadSaved();
