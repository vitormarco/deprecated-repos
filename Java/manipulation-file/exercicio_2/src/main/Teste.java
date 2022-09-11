package main;

import java.io.IOException;
import java.util.ArrayList;

public class Teste {

	public static void main(String[] args) throws IOException {
		AsciiArt gerarImagem = new AsciiArt();
		//gerarImagem.carregaImagemRaw("fred");
		//gerarImagem.visualizaImagem();
		//gerarImagem.armazenaImagemRLE();
		gerarImagem.carregaImageRLE();
	}

}
