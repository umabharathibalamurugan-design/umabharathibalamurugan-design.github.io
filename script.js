// Smooth scroll
document.querySelectorAll('nav a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior:'smooth'});
  });
});

// Contact form
const form=document.getElementById('contact-form');
const formMessage=document.getElementById('form-message');
form.addEventListener('submit',e=>{
  e.preventDefault();
  formMessage.textContent="Thanks! Your message has been sent.";
  form.reset();
  setTimeout(()=>formMessage.textContent="",3000);
});

// Typing effect
const texts=["Web Developer","Python Programmer","Java Learner","Tech Enthusiast"];
let count=0,index=0,forward=true;
function typeEffect(){
  const el=document.getElementById('typing');
  const text=texts[count];
  if(forward){el.textContent=text.slice(0,index++); if(index>text.length){forward=false;setTimeout(typeEffect,1500);return;}}
  else{el.textContent=text.slice(0,index--); if(index<0){forward=true;count=(count+1)%texts.length;}}
  setTimeout(typeEffect,150);
}
typeEffect();

// Reveal sections + skill bars
function revealOnScroll(){
  const reveals=document.querySelectorAll('.reveal');
  const windowHeight=window.innerHeight;
  reveals.forEach((el,i)=>{
    const top=el.getBoundingClientRect().top;
    if(top<windowHeight-100){
      setTimeout(()=>el.classList.add('active'),i*100);
      if(el.id==="skills"){
        el.querySelectorAll('.bar span').forEach((bar,j)=>{setTimeout(()=>{bar.style.width=bar.getAttribute('data-width');},j*300);});
      }
    }
  });
}

// Hero background parallax
window.addEventListener('scroll',()=>{
  const heroBg=document.querySelector('.hero-bg');
  heroBg.style.transform=`translateY(${window.scrollY*0.2}px)`;
});

// Throttle scroll
let throttleTimer;
window.addEventListener('scroll',()=>{
  if(!throttleTimer){setTimeout(()=>{revealOnScroll();throttleTimer=null;},200);throttleTimer=true;}
});
revealOnScroll();
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
