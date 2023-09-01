const contList=document.getElementById("contList");
const current=document.getElementById("current");

const state={pups:[],pupper:null,home:true};
let first=true;

//This is easily the greatest function I've ever written
//I don't care what it actually does it sounds great
async function getPuppies(){
    if(state.home||first){
    const info=await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players/');
    const json=await info.json();
    state.pups=json.data.players;
    first=false;
    }else{
        state.pups=[];
    }
}


function renderPuppies(){
    const html=state.pups.map((pup)=>{
        return `
        <div class=list>
            <a href=#${pup.name}>${pup.name}</h4>
            <p>${pup.breed}</p>
        </div>`
    });
    contList.innerHTML=html.join('');
}

window.addEventListener("hashchange", ()=>{
    render();
});

function grabDatEvent(){
    const name=window.location.hash.slice(1);
    if(name==="home"){
        state.home=true;
        state.pupper=null;
    }else{
        const theDog=state.pups.find((dog)=>{
            return(dog.name===name);
        })
        state.pupper=theDog;
        state.home=false;
    }
}

async function renderPuppy(){
    if(state.pupper){
        const data=await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players/${state.pupper.id}`);
        const pupData=await data.json();
        state.pupper=pupData.data.player;
        current.innerHTML=`
        <div class=theBoy>
            <h3>This is ${state.pupper.name}</h3>
            <p class='they'>They are a ${state.pupper.breed}</p>
            <p class='they'>Aren't they cute?</p>
        </div>
        <div class='home'>
            <a href=#home>Want to check out a different pupper? Click here!</a>
        </div>
        <img class='smol' src='${state.pupper.imageUrl}'/>`;
        if(state.pupper.name==='Crumpet'){
            console.log("This one's my favorite")
        }
    }else{
        current.innerHTML='';
    }
}


async function render(){
    grabDatEvent();
    await getPuppies();
    renderPuppies();
    renderPuppy();
}

render();
