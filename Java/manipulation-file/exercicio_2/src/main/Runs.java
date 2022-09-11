package main;

public class Runs {
	private char simbolo;
	private int comprimento;
	
	public Runs (int comprimento, char simbolo) {
		this.comprimento = comprimento;
		this.simbolo = simbolo;
	}
	
	public char getSimbolo() {
		return simbolo;
	}
	public void setSimbolo(char simbolo) {
		this.simbolo = simbolo;
	}
	
	public int getComprimento() {
		return this.comprimento;
	}
	
	public void setComprimento(int comprimento) {
		this.comprimento = comprimento;
	}
	
	
}
