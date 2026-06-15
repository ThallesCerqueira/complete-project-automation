import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProdutoList from '../components/ProdutoList.jsx';

const produtosMock = [
  { id: 1, nome: 'Produto A', descricao: 'Desc A', preco: 10, quantidade: 5, categoria: 'Cat A' },
  { id: 2, nome: 'Produto B', descricao: '', preco: 20.5, quantidade: 0, categoria: '' },
];

describe('ProdutoList', () => {
  it('exibe mensagem quando não há produtos', () => {
    render(<ProdutoList produtos={[]} onEditar={vi.fn()} onRemover={vi.fn()} />);
    expect(screen.getByTestId('lista-vazia')).toBeInTheDocument();
  });

  it('renderiza a lista de produtos', () => {
    render(<ProdutoList produtos={produtosMock} onEditar={vi.fn()} onRemover={vi.fn()} />);

    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.getByText('Produto B')).toBeInTheDocument();
    expect(screen.getByTestId('produto-linha-1')).toBeInTheDocument();
    expect(screen.getByTestId('produto-linha-2')).toBeInTheDocument();
  });

  it('chama onEditar com o produto correto', async () => {
    const onEditar = vi.fn();
    render(<ProdutoList produtos={produtosMock} onEditar={onEditar} onRemover={vi.fn()} />);

    await userEvent.click(screen.getByTestId('botao-editar-1'));
    expect(onEditar).toHaveBeenCalledWith(produtosMock[0]);
  });

  it('chama onRemover com o id correto', async () => {
    const onRemover = vi.fn();
    render(<ProdutoList produtos={produtosMock} onEditar={vi.fn()} onRemover={onRemover} />);

    await userEvent.click(screen.getByTestId('botao-remover-2'));
    expect(onRemover).toHaveBeenCalledWith(2);
  });
});