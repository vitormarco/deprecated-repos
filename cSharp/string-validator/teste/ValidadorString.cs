using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace teste
{
    class ValidadorString
    {
        public bool Validar(String entrada)
        {
            bool isStringValid = true;
            bool hasNumber = Regex.IsMatch(entrada, @"\d+");

            String newEntrada = "";
            String CHAR_VALID = "{}[]()";

            for (int i = 0; i < entrada.Length; i++)
            {
                for (int j = 0; j < CHAR_VALID.Length; j++)
                {
                    if (entrada[i] == CHAR_VALID[j])
                    {
                        newEntrada += entrada[i];
                    }
                }
            }

            bool hasAllFinishing = newEntrada.Length % 2 == 0;

            if (hasNumber || !hasAllFinishing)
            {
                isStringValid = false;
            }

            if (isStringValid)
            {
                char toClose = ' ';
                Queue openChar = new Queue();
                Stack closeChar = new Stack();

                for (int i = 0; i < newEntrada.Length; i++)
                {
                    switch (newEntrada[i])
                    {
                        case '{':
                            toClose = '}';
                            break;
                        case '[':
                            toClose = ']';
                            break;
                        case '(':
                            toClose = ')';
                            break;
                        default:
                            toClose = ' ';
                            break;
                    }

                    char toCompare = newEntrada[i];

                    if (i < newEntrada.Length - 1)
                    {
                        toCompare = newEntrada[i + 1];
                    }

                    if (toClose == toCompare)
                    {
                        i++;
                    } else if (newEntrada[i] == '{' || newEntrada[i] == '(' || newEntrada[i] == '[')
                    {
                        openChar.Enqueue(toClose);
                    } else
                    {
                        closeChar.Push(newEntrada[i]);
                    }
                }

                while (openChar.Count > 0)
                {
                    char open = (char) openChar.Dequeue();
                    char close = (char) closeChar.Pop();
                    if (open != close)
                    {
                        isStringValid = false;
                    }
                }
            }

            return isStringValid;
        }
    }
}
