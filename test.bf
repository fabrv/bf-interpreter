[9*5 + 3 = 48]
>+++++++++
[
	<+++++
	>-
]
<+++
>,
Convierte UNICODE a valor
<
[
	>-
	<-
]
>[
	<+
	>>+
	<-
]
>[
	<+
	>-	
]
<<

Mover el 9 a la celda 9
[
	>[
		>+
		<-
	]
	<[
		>+
		<-
	]>-
]
>
[
	[
		<+
		<+
		>>-
	]
	<<[
		>>+
		<<-
	]
>-	
]

***CODIGO PARA ROTAR
[9*5 + 3 = 48]
<
>+++++++++
[
	<+++++
	>-
]
<+++
>,
Convierte UNICODE a valor
<
[
	>-
	<-
]
Iterar en la rotacion con e input del usuario
>[
	Correr hasta que de 0 y regresar 1
	>[>]
	Mover 1 veces en la memoria
	<[
		[
			>+
			<-
		]<	
	]
	>>-
	Mover el contador a la celda 0 {Dos a la izquierda}
	[
		<<+
		>>-
	]
	Correr hasta que de 0 y regresar 1
	>[
		>
	]<
	Mover el ultimo elemento una a la derecha
  /
	[
		>+
		<-
	]
	>-
  /
	<<[<]+
	Moverme al final del arreglo y uno más
	[>]>
	Rotar el ultimo elemento a la primer posicion
	[
    /
		<<[<]>
    /
		+	
    /
		[>]>
    /
		-
	]
	Regresar el carrete al inicio
	<<[<]<
	Regresar el contador una celda antes del arreglo
	[
		>+
		<-
	]>
]