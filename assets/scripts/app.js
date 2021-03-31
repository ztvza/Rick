let pageCount = 1;
let renderedChars = '';

getAllCharsFromServer();

function getAllCharsFromServer(isNewSearch) {
    axios.get('https://rickandmortyapi.com/api/character' + getParams(isNewSearch))
        .then(response => {
            console.log(response);

            if (response.data && response.data.results) {

                const characterList = document.querySelector('#characterList');

                if (isNewSearch) {
                    renderedChars = prepareCharacterCards(response.data.results);
                } else {
                    renderedChars += prepareCharacterCards(response.data.results);
                }

                characterList.innerHTML = renderedChars;
            }
        })

        .catch(err => {
            console.error(err);
        })
}

function getParams(isNewSearch) {
    const searchName = document.querySelector('#searchName').value;
    const searchStatus = document.querySelector('#searchStatus').value;
    const searchGender = document.querySelector('#searchGender').value;

    if (isNewSearch) {
        pageCount = 1;
    }

    let result = `/?page=${pageCount}&`;
    pageCount ++;

    if (!searchName && !searchStatus && !searchGender) {
        return result;
    }

    if (searchName) {
        result += `name=${searchName}&`;
    }

    if (searchStatus) {
        result += `status=${searchStatus}&`;
    }

    if (searchGender) {
        result += `gender=${searchGender}&`;
    }

    return result;
}

function prepareCharacterCards(characters) {
    let result = '';

    console.log(characters);
    characters.forEach(character => {
        result += `
            <div class="col-md-6 character">
                <div class="card mb-3 ">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${character.image}" alt="Some hero from Ricjk and Morthy Multiverse">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <p class="character__status ${getClassByStatus(character.status)}">${character.status} | ${character.species}</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        `
    })

    return result;
}

function getClassByStatus(status) {
    if (status === 'Alive') {
        return '-alive';    
    } else if (status === 'Dead') {
        return '-dead';
    } else {
        return '-unknown';
    }
}