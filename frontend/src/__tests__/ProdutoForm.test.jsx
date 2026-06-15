import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProdutoForm from '../components/ProdutoForm.jsx';

describe('ProdutoForm', () => {
  it('renderiza os campos do formulário de novo produto', () => {
    render(<ProdutoForm produtoEditando={null} onSalvar={vi.fn()} onCancelar={vi.fn()} />);

    expect(screen.getByText('Novo produto')).toBeInTheDocument();
    expect(screen.getByTestId('input-nome')).toBeInTheDocument();
    expect(screen.getByTestId('input-preco')).toBeInTheDocument();
    expect(screen.getByTestId('botao-salvar')).toHaveTextContent('Adicionar produto');
  });

  it('exibe erro ao tentar salvar sem informar o nome', async () => {
    const onSalvar = vi.fn();
    render(<ProdutoForm produtoEditando={null} onSalvar={onSalvar} onCancelar={vi.fn()} />);

    await userEvent.type(screen.getByTestId('input-preco'), '10');
    await userEvent.click(screen.getByTestId('botao-salvar'));

    expect(screen.getByTestId('form-erro')).toHaveTextContent('O nome é obrigatório.');
    expect(onSalvar).not.toHaveBeenCalled();
  });



  it('chama onSalvar com os dados corretos quando o formulário é válido', async () => {
    const onSalvar = vi.fn();
    render(<ProdutoForm produtoEditando={null} onSalvar={onSalvar} onCancelar={vi.fn()} />);

    await userEvent.type(screen.getByTestId('input-nome'), 'Produto X');
    await userEvent.type(screen.getByTestId('input-preco'), '99.90');
    await userEvent.type(screen.getByTestId('input-quantidade'), '5');
    await userEvent.type(screen.getByTestId('input-categoria'), 'Categoria X');
    await userEvent.click(screen.getByTestId('botao-salvar'));

    expect(onSalvar).toHaveBeenCalledWith({
      nome: 'Produto X',
      descricao: '',
      preco: 99.9,
      quantidade: 5,
      categoria: 'Categoria X',
    });
  });

  it('preenche os campos ao editar um produto existente', () => {
    const produto = {
      id: 1,
      nome: 'Produto Existente',
      descricao: 'Descrição existente',
      preco: 50,
      quantidade: 3,
      categoria: 'Categoria Y',
    };

    render(<ProdutoForm produtoEditando={produto} onSalvar={vi.fn()} onCancelar={vi.fn()} />);

    expect(screen.getByText('Editar produto')).toBeInTheDocument();
    expect(screen.getByTestId('input-nome')).toHaveValue('Produto Existente');
    expect(screen.getByTestId('input-preco')).toHaveValue(50);
    expect(screen.getByTestId('botao-cancelar')).toBeInTheDocument();
  });
});