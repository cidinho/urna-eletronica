var resultadoEleicao = []
var candidatos = [
	{nome: "Bolsonaro",legenda:17,numVoto:0},
	{nome: "Haddad",legenda:13,numVoto:0}
]
var brancos = 0
var nulos = 0

function confirmarVoto(){
	const voto = $("voto").value
	if(voto != ""){
		resultadoEleicao.push(voto)
	}
	alert('Voto Confirmado! Fim')
	corrigeVoto()
}

function votoBranco(){
	const voto = "BRANCO"
	brancos++
	alert('Voto Confirmado! Fim')
	corrigeVoto()
}

function corrigeVoto(){
	$("voto").value = ""
	$("voto").focus()
}

function apurarVoto(){	
	$("urna").style.display = "none";
	/* Embaralha os votos para esconder a ordem de votação */
	resultadoEleicao.sort(randomArray)
	let totalValidos = 0
	
	for(var eleitor in resultadoEleicao){
		var voto = resultadoEleicao[eleitor]
		for(var index in candidatos){
			var candidato = candidatos[index]
			if(voto ==  candidato.legenda){
				candidato.numVoto++ //Acrescenta +1 no número de votos do candidato
				totalValidos++ //Acrescenta em Votos Válidos
			}
		}
	}
	
	//Calculando votos nulos
	nulos = resultadoEleicao.length - totalValidos
	
	//Inserindo resultado
	candidatos.push({
		nome:"BRANCO",
		legenda: "BRANCO",
		numVoto: brancos
	})
	candidatos.push({
		nome:"NULO",
		legenda: "NULO",
		numVoto: nulos
	})
	imprimirBoletimDeUrna()
}

function imprimirBoletimDeUrna(){
	$("apuracao").innerHTML = ""
	alert("Contando votos...")
	var tabela = "<table border=1><thead><tr><th>Candidato</th><th>Votos</th><th>%</th></tr></thead><tbody>"
	var eleito = {}
	const votosValidos = resultadoEleicao.length - nulos
	const votosMinimos  = (votosValidos/2)+1
	
	for(var index in candidatos){
		var candidato = candidatos[index]
		var percentual = (resultadoEleicao.length>0)? parseFloat((candidato.numVoto/resultadoEleicao.length)* 100): 0
		tabela += "<tr><td>"+candidato.nome+"</td><td>"+candidato.numVoto+"</td><td>"+percentual.toFixed(2)+"</td></tr>"
		candidato.percentual = percentual.toFixed(2)
		
		//Testando se o candidato está eleito. Caso ele possua metade dos votos válidos + 1
//console.log(votosMinimos)		
//console.log(candidato.numVoto)
		if(candidato.numVoto >= votosMinimos){
			eleito = candidato
		}
		
	}
	console.log(eleito)
	
	tabela += "</tbody></table>"
	tabela += "<p><b>Eleito:</b> "+ eleito.nome + " com "+eleito.numVoto+" voto(s)</p>"
	tabela += "<p><b>Total de Votos:</b> "+ (resultadoEleicao.length + brancos)  + "</p>"
	tabela += "<p><b>Total de Votos válidos:</b> "+ votosValidos + "</p>"
	tabela += "<p><b>Total de Votos NULOS/BRANCOS:</b> "+ (nulos+brancos) + "</p>"
	$("apuracao").innerHTML = tabela
}
/* Sorteia a ordem dos elementos do array */
function randomArray(a, b){return 0.5 - Math.random()}

window.$ = function (id) {
	return document.getElementById(id)
}