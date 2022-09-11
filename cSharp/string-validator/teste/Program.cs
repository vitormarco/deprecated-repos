using System;

namespace teste
{
    class Program
    {
        static void Main(string[] args)
        {
            ValidadorString stringIsValid = new ValidadorString();

            Console.WriteLine(stringIsValid.Validar("[ { ( a ) } b c { } ( ) ]"));
        }
    }
}
