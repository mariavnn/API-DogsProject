const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers:{
        'Content-Type':'application/json',
        'x-api-key': 'live_SaXydB4PbYlA1KiQzjQkx7jh3TV5Q3riEVn2T7a8Mb89El8Cum5hmgjQLkTKYoUH'
    },
});

const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const container3 = document.getElementById('container3');

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');

const btnFav1 = document.getElementById('btn-fav1');
const btnFav2 = document.getElementById('btn-fav2');
const btnFav3 = document.getElementById('btn-fav3');


const alert = document.querySelector('.alert');

//FUNCION PARA CARGAR FOTOS DE PERRITOS
const loadRandomDogs = async () =>{
    const { data } = await api('/images/search?limit=3');
    const dogs = data;

    console.log(dogs);

    homeSection,innerHTML = '';
    try{
        img1.src = dogs[0].url;
        img2.src = dogs[1].url;
        img3.src = dogs[2].url;

        btnFav1.onclick = () => saveFavDogs(dogs[0].id);
        btnFav2.onclick = () => saveFavDogs(dogs[1].id);
        btnFav3.onclick = () => saveFavDogs(dogs[2].id);


        if(window.innerWidth < 768){
            container2.classList.add('inactive');
            container3.classList.add('inactive');
        }else{
            container2.classList.remove('inactive');
            container3.classList.remove('inactive');
        }
    }catch (error){
        console.log(error)
    }
}


//FUNCION PARA CARGAR PERRITOS EN LA SECCION DE FAV
const loadFavDogs = async () => {
    const { data } = await api('/favourites');
    const dogs = data;
    console.log('FAVORITOS')
    console.log(dogs);

    try{
        let view = '';
        dogs.forEach(dog =>{
            view +=`
            <article class="dog-card">
                <button onclick="deleteFavDogs('${dog.id}')">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27 6C26.443 6.0003 25.8971 6.15565 25.4234 6.44866C24.9497 6.74166 24.567 7.16076 24.318 7.659L22.146 12H12C11.2044 12 10.4413 12.3161 9.87868 12.8787C9.31607 13.4413 9 14.2044 9 15C9 15.7956 9.31607 16.5587 9.87868 17.1213C10.4413 17.6839 11.2044 18 12 18V48C12 49.5913 12.6321 51.1174 13.7574 52.2426C14.8826 53.3679 16.4087 54 18 54H42C43.5913 54 45.1174 53.3679 46.2426 52.2426C47.3679 51.1174 48 49.5913 48 48V18C48.7957 18 49.5587 17.6839 50.1213 17.1213C50.6839 16.5587 51 15.7956 51 15C51 14.2044 50.6839 13.4413 50.1213 12.8787C49.5587 12.3161 48.7957 12 48 12H37.854L35.682 7.659C35.433 7.16076 35.0503 6.74166 34.5766 6.44866C34.1029 6.15565 33.557 6.0003 33 6H27ZM21 24C21 23.2044 21.3161 22.4413 21.8787 21.8787C22.4413 21.3161 23.2044 21 24 21C24.7956 21 25.5587 21.3161 26.1213 21.8787C26.6839 22.4413 27 23.2044 27 24V42C27 42.7957 26.6839 43.5587 26.1213 44.1213C25.5587 44.6839 24.7956 45 24 45C23.2044 45 22.4413 44.6839 21.8787 44.1213C21.3161 43.5587 21 42.7957 21 42V24ZM36 21C35.2044 21 34.4413 21.3161 33.8787 21.8787C33.3161 22.4413 33 23.2044 33 24V42C33 42.7957 33.3161 43.5587 33.8787 44.1213C34.4413 44.6839 35.2044 45 36 45C36.7956 45 37.5587 44.6839 38.1213 44.1213C38.6839 43.5587 39 42.7957 39 42V24C39 23.2044 38.6839 22.4413 38.1213 21.8787C37.5587 21.3161 36.7956 21 36 21Z" fill="#A24F2D"/>
                    </svg>
                </button>
                <img src="${dog.image.url}" alt="Dog Photo">
            </article>
            `;
            // const dogContainer = document.createElement('article');
            // const trashButton = document.createElement('button');
            // const trashImg = document.createElement('img');
            // const dogImg = document.createElement('img');

            // dogContainer.classList.add('dog-card');
            // trashButton.classList.add('dog-card-button');
            // dogImg.classList.add('dog-card-img');
            
            // trashImg.src = '/img/trash.png';
            // dogImg.src = dog.image.url;

            // trashButton.onclick = function() {
            //     deleteFavDogs(dog.id);
            // };
            

            // trashButton.appendChild(trashImg);
            // dogContainer.appendChild(dogImg);
            // dogContainer.appendChild(trashButton);

            // favSection.appendChild(dogContainer);
        });
        favSection.innerHTML = view
    
    }catch(error){
        console.error(error);
    }
}

 

const uploadDogPhoto = async () =>{
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log('form')

    const { data } = await api.post('/images/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data' 
        }
    });

    try{
        displayAlert('The photo was successfully uploaded', 'success');
        console.log('Foto subida con exito!')
        console.log({data});
        console.log(data.url);

        setTimeout(function() {
            form.reset();
        }, 2000);
        
    }catch(error){
        displayAlert('The photo could not be uploaded', 'danger');
        console.error(error);
    }
}

//FUNCION PARA SABER SI UNA FOTO YA ESTA EN FAVORITOS
const checkIfAlreadyFav = async (id) => {
  const { data } = await api('/favourites')
  const isAlreadyFav = data.some(favorite => favorite.image.id === id);
  return isAlreadyFav;
}


//FUNCION PARA GUARDAR FOTOS DE PERRITOS EN FAVORITOS
const saveFavDogs = async (id) =>{
    const isAlreadyFav = await checkIfAlreadyFav(id);

    const { data } = await api.post('/favourites', {
        image_id: id
    }); 
    const response = data;
    
    if (isAlreadyFav) {
        displayAlert('The photo is already saved in favorites!', 'danger');
        return;
    }
    
    try{
        displayAlert('The photo was successfully saved in favorites!!', 'success');
        console.log('Save')
        console.log(response);
        loadFavDogs();
    }catch (error){
        console.error(error);
    }
}

const deleteFavDogs = async (id) =>{
    const { data } = await api.delete(`/favourites/${id}`, {
        image_id: id
    })
    const response = data;


    try{
        displayAlert('The photo was successfully removed from favorites', 'success');
        console.log('Se elimino el perro');
        loadFavDogs();
    }catch(error){
        displayAlert('The photo could not be deleted', 'danger');
        console.log('ERROR EN LA FUNCION ELIMINAR');
        console.log(error);
    }

}

//FUNCION PARA GENERAR ALERTA
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 1000);
}

window.onload = loadRandomDogs();
loadFavDogs();