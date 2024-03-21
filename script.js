const BaseURL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/`
let amt=document.querySelector('.amount input');
let amtval=amt.value;
let fromcountry=document.querySelector('.from select');
let tocountry=document.querySelector('.to select');
let dropdown=document.querySelectorAll('.dropdown select');
let rate =document.querySelector('.rate');
for(let select of dropdown){
    for( currcodes in countryList){
        let newOption=document.createElement('option');
        newOption.innerText=currcodes;
        newOption.value=currcodes;


        
        select.append(newOption)
        if(currcodes==="USD"&&select.name==="fromselect"){
            newOption.selected="selected";
        }else if(currcodes==="INR"&&select.name==="toselect"){
            newOption.selected="selected";
        }
    }
    select.addEventListener('change',(evt)=>{
        updateflag(evt.target);
    });

}
// change flag
let updateflag=(ele)=>{
    let currency=ele.value;
    let countrycode=countryList[currency];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=ele.parentElement.querySelector('img');
    // console.log(img)
    // document.querySelector('.toImg').src=newSrc
    img.src=newSrc;
}

let UpdateEvent=async ()=>{
    amt=document.querySelector('.amount input');
    amtval=amt.value;
      console.log(amtval)
   
     if(amtval===""||amtval<1){
       amtval=1;
       amt.value=1;
     }
   //   console.log(amtval)
     const URL=`${BaseURL}${fromcountry.value.toLowerCase()}.json`;
      let res=await fetch(URL);
     let data=await res.json();
     let allval=data[fromcountry.value.toLowerCase()];
     let finalval=(allval[tocountry.value.toLowerCase()]);
     let finalans=amtval*finalval
     rate.innerText=` ${amtval} ${fromcountry.value} = ${finalans} ${tocountry.value}`
}

let btn=document.querySelector('.exchange');
btn.addEventListener('click', (evt)=>{
  evt.preventDefault();
  UpdateEvent();
})

window.addEventListener('load',()=>{
  UpdateEvent();
})
