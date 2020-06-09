const fetch = require('node-fetch');
//CLI flag '--unhandled-rejections=strict'
// Include fs module 
/*The fs.readFileSync() method is an inbuilt application programming interface 
of fs module which is used to read the file and return its content.*/
const fs = require('fs');
const input = "input.txt"

function getPokemonList(file) {
	try {
		let data = fs.readFileSync(file)
		let pokemonList = data.toString().toLowerCase().split("\n")
	}
	catch(err) {
		console.log("file", file)
	}
	return pokemonList;
}

function fetchPokemon(){
  try {
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(function(allpokemon){
      allpokemon.results.forEach(function(pokemon){
        fetchPokemonData(pokemon); 
      })
    })
  }
  catch(err) {
    console.log("fetch PokemonData: ", err)
  }
}

function fetchPokemonData(pokemon){
  let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
  try {
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
      pokeData.results.forEach(function(pokemon){
        outputPokemonData(pokemon);
      })
    })
  }
  catch(err) {
    console.log("fetch pokeData: ", err)
  }
}

function outputPokemonData(pokeData){
let pokeName = pokeData.name;//pokeData.name[0].toUpperCase + 
		pokeData.name.slice(1, pokeData.name.length) + "\n"
try {
  //TODO: getting a UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'forEach' of undefined
  let pokeTypes = createTypes(pokeData.types) 
}
catch(err) {
		console.log("type", err)
}
	console.log(pokeName + ": " + pokeTypes);
}

function createTypes(types){
  var type;
  types.forEach(function(type){
    console.log(type);
    type += types['type']['name'];
  })
  return type;
}

try {
  fetchPokemon()  
}
catch(err) {
		console.log("fetchPokemon", err)
}