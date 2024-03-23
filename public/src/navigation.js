favBtn.addEventListener('click', () => {
    location.hash = '#favourites';
});
uploadBtn.addEventListener('click', () =>{
    location.hash = '#upload';
})
headerArrow.addEventListener('click', () =>{
    location.hash = '#home';
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});
    if(location.hash.startsWith('#favourites')){
        favouritePage();
    }else if(location.hash.startsWith('#upload')){
        uploadPage();
    }else{
        HomePage();
    }
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function HomePage(){
    headerArrow.classList.add('inactive');
    favSection.classList.add('inactive');
    uploadSection.classList.add('inactive');

    homeSection.classList.remove('inactive');
    btnHome.classList.remove('inactive');
}

function favouritePage(){
    headerArrow.classList.remove('inactive');
    favSection.classList.remove('inactive');

    homeSection.classList.add('inactive');
    uploadSection.classList.add('inactive');
    btnHome.classList.add('inactive');
    
}

function uploadPage(){
    headerArrow.classList.remove('inactive');
    uploadSection.classList.remove('inactive');
    
    favSection.classList.add('inactive');
    homeSection.classList.add('inactive');
    btnHome.classList.add('inactive');
}