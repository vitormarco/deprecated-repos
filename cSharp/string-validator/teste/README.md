# string-validator
Pequeno teste em C# para validar string

# VALIDAÇÃO DE STRING

Crie um algoritmo que valide o conteúdo de um STRING.
Uma string é válida quando todos os colchetes, chaves e
parênteses abertos são fechados na ordem correta.
Além disso, uma string, para ser considerada válida, não
deve conter numerais.
Entradas válidas:
[ (abc) ]
[ { ( a ) } b c { } ( ) ]
Entradas Inválidas:
[(abc]
[ { ) x } ]
[ (1) ]
REQUISITOS
Escreva uma classe chamada ValidadorString que
possua o seguinte método:
bool Validar(string entrada)
