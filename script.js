const contList=document.getElementById("contList");
const current=document.getElementById("current");

const state={pups:[],pupper:null};

//This is easily the greatest function I've ever written
//I don't care what it actually does it sounds great
async function getPuppies(){
    const info=await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players/');
    const json=await info.json();
    state.pups=json.data.players;
    console.log(state);
}

function renderPuppies(){
    const html=state.pups.map((pup)=>{
        return `
        <div class=list>
            <a href=#${pup.name}>${pup.name}</h4>
            <p>${pup.breed}</p>
        </div>`
        //wanna throw in image by adding <img class='smol' src='${pup.imageUrl}/>
    });
    contList.innerHTML=html.join('');
}

window.addEventListener("hashchange", ()=>{
    grabDatEvent();
    renderPuppy();
    window.scroll({
        top:1000,
        left:0,
        behavior: "smooth"
    });
});

function grabDatEvent(){
    const name=window.location.hash.slice(1);
    const theDog=state.pups.find((dog)=>{
        return(dog.name===name);
    })
    //console.log("state before: "+state);
    state.pupper=theDog;
    //console.log("state after: "+state);
}

async function renderPuppy(){
    if(state.pupper){
        const data=await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players/${state.pupper.id}`);
        const pupData=await data.json();
        state.pupper=pupData.data.player;
        console.log("name--> "+state.pupper.name);
        current.innerHTML=`
        <h3>${state.pupper.name}</h3>
        <p>${state.pupper.breed}</p>
        <img class='smol' src='${state.pupper.imageUrl}'/>`;
    }
}

//May have to put list down here, I hope not, but we'll see


async function render(){
    await getPuppies();
    renderPuppies();
}

render();

