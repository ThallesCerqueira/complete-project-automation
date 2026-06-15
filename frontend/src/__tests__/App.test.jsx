import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import * as produtoService from '../services/produtoService.js';

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exibe a lista de produtos carregada da API', async () => {
    vi.spyOn(produtoService, 'listarProdutos').mockResolvedValue([
      { id: 1, nome: 'Produto A', descricao: '', preco: 10, quantidade: 1, categoria: 'Cat A' },
    ]);

    render(<App />);

    expect(screen.getByTestId('carregando')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Produto A')).toBeInTheDocument();
    });
  });

  it('exibe mensagem de erro quando a API falha ao carregar', async () => {
    vi.spyOn(produtoService, 'listarProdutos').mockRejectedValue(new Error('Falha de conexão'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('mensagem-erro')).toHaveTextContent('Falha de conexão');
    });
  });

  it('adiciona um novo produto e atualiza a lista', async () => {
    vi.spyOn(produtoService, 'listarProdutos')
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        { id: 1, nome: 'Produto Novo', descricao: '', preco: 15, quantidade: 2, categoria: '' },
      ]);
    vi.spyOn(produtoService, 'criarProduto').mockResolvedValue({ id: 1, nome: 'Produto Novo' });

    render(<App />);

    await waitFor(() => expect(screen.getByTestId('lista-vazia')).toBeInTheDocument());

    await userEvent.type(screen.getByTestId('input-nome'), 'Produto Novo');
    await userEvent.type(screen.getByTestId('input-preco'), '15');
    await userEvent.type(screen.getByTestId('input-quantidade'), '2');
    await userEvent.click(screen.getByTestId('botao-salvar'));

    await waitFor(() => {
      expect(screen.getByTestId('mensagem-sucesso')).toHaveTextContent('Produto adicionado com sucesso.');
      expect(screen.getByText('Produto Novo')).toBeInTheDocument();
    });
  });

  it('remove um produto após confirmação', async () => {
    vi.spyOn(produtoService, 'listarProdutos')
      .mockResolvedValueOnce([
        { id: 1, nome: 'Produto A', descricao: '', preco: 10, quantidade: 1, categoria: '' },
      ])
      .mockResolvedValueOnce([]);
    vi.spyOn(produtoService, 'removerProduto').mockResolvedValue(null);

    render(<App />);

    await waitFor(() => expect(screen.getByText('Produto A')).toBeInTheDocument());

    await userEvent.click(screen.getByTestId('botao-remover-1'));

    await waitFor(() => {
      expect(screen.getByTestId('mensagem-sucesso')).toHaveTextContent('Produto removido com sucesso.');
      expect(screen.getByTestId('lista-vazia')).toBeInTheDocument();
    });
  });
});