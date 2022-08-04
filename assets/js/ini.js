

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
//const BASE_URL = "https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json"
const pokemonsRow = document.querySelector("#pokemonsRow")
// // const card_generator = new Card


async function get_pokemon(pokemon_name) {


    const value = pokemon_name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then(data => data.json())
        .then(response => insert_pokemon_on_card(response))
        .catch(err => renderNotFound())
    
}

async function rend_pokemon_list() {
    
    const MAX_POKEMONS_IN_ROW = 50
    const POKEMONS_URL = BASE_URL + "?offset=20&limit=150"
    const response = await fetch(POKEMONS_URL)
    const pokemons_list = await response.json().then((resp) => {
        return resp.results
    })

    let pokemons_list_ref = [];
    pokemons_list.forEach(pokemon => {
        //console.log(pokemon);
        console.log(pokemon.name);
        console.log(pokemon.url);
        get_pokemon(pokemon.name)
        
        
    });

}

function insert_pokemon_on_card(pokemon) {
    const card = new Card(pokemon).generate_card(pokemon)
    pokemonsRow.appendChild(card)
}

rend_pokemon_list()

class Card {
  constructor(pokemon) {
      this.name = pokemon.name
      this.description = pokemon.description
      this.sprite = pokemon.sprites.front_default

  }

  generate_card(pokemon_data) {

      const div = document.createElement("div")
      div.setAttribute("class", "card")


      const header = document.createElement("header")
      header.setAttribute("class", "header_card")
      
      header.innerText = `${pokemon_data.name.toUpperCase()}`


      const section = document.createElement("section")
      section.setAttribute("class", "section_card")


      const img_element = document.createElement("img")
      img_element.setAttribute("src", pokemon_data.sprites.front_default)
      img_element.setAttribute("alt", pokemon_data.name)
      img_element.setAttribute("class", "card_img")


      const footer = document.createElement("footer")
      footer.setAttribute("class", "footer_card")

    //   const link_to_pokemon = document.createElement("a")
    //   link_to_pokemon.setAttribute("class", "pokemon_link")
    //   link_to_pokemon.setAttribute("target", "_blank")
    //   link_to_pokemon.setAttribute("href", "#")

    //   link_to_pokemon.innerText = "Más +"  

    //   footer.appendChild(link_to_pokemon)

      section.appendChild(img_element)

      div.appendChild(header)
      div.appendChild(section)
      div.appendChild(footer)


      return div
  }
}