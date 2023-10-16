//Seleção de classes do html
const pokemonName = document.querySelector('.nome-pokemon')

const pokemonNumber = document.querySelector('.numero-pokemon')

const pokemonImage = document.querySelector('.imagem-pokemon')

const form = document.querySelector('.formulario')

const input = document.querySelector('.inputsearch')

const buttonPrev = document.querySelector('.button-prev')
const buttonNext = document.querySelector('.button-next')

let searchPokemon = 1;

//Função que recupera os dados de um Pokémon da API PokeAPI, usando o nome ou o ID do Pokémon como parâmetro.
const fetchPokemon = async (pokemon) => {

    //Cria uma solicitação HTTP para a API PokeAPI, usando o nome ou o ID do Pokémon como parâmetro.
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        //Converte a resposta da API em um objeto JSON.
        const data = await APIResponse.json();

        //Retorna para função fetchPokemon o data com os dados em json.
        return data;
    }
    

}//Uma função async é uma função que pode executar código assíncrono. O código assíncrono é código que não precisa ser executado imediatamente. Ele pode ser executado em segundo plano ou em paralelo com outro código. As funções async podem ser usadas para realizar tarefas que podem levar algum tempo para serem concluídas, como fazer uma solicitação HTTP ou carregar um arquivo grande.


//Função que rederiza os dados do pokemon, com um async.
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    //Aqui a constante data vai receber os dados de fetchPokemon que está em json
    const data = await fetchPokemon(pokemon);
    if (data) {
        //Pega a propriedade name do objeto data.
        pokemonName.innerHTML = data.name;

        //Pega a propriedade id do objeto data, que tem o número do pokemon
        pokemonNumber.innerHTML = data.id;

        //Com o source ele pega o caminho de onde está o gif dos pokemons através da api.
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        input.value = '';//Limpar o input e deixar vazio.
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())//Renderiza o input, e coloca em lowe case.
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})


renderPokemon('1')