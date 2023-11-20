import {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {styles} from './App';
import {ProdutoCard} from './componentes/ProdutoCard';

const EstoqueScreen = (props: any) => {
  const [produtos, setProdutos] = useState([
    {id: '1', nome: 'Produto 1', quantidade: 0},
    {id: '2', nome: 'Produto 2', quantidade: 0},
    {id: '3', nome: 'Produto 3', quantidade: 0},
  ]);

  const incrementQuantidade = (productId: string) => {
    setProdutos(prevProdutos =>
      prevProdutos.map(produto =>
        produto.id === productId
          ? {...produto, quantidade: produto.quantidade + 1}
          : produto,
      ),
    );
  };

  const decrementQuantidade = (productId: string) => {
    setProdutos(prevProdutos =>
      prevProdutos.map(produto =>
        produto.id === productId && produto.quantidade > 0
          ? {...produto, quantidade: produto.quantidade - 1}
          : produto,
      ),
    );
  };

  const renderProduto = ({
    item,
  }: {
    item: {id: string; nome: string; quantidade: number};
  }) => (
    <ProdutoCard
      componentId={props.componentId}
      productId={item.id}
      quantidade={item.quantidade}
      incrementQuantidade={() => incrementQuantidade(item.id)}
      decrementQuantidade={() => decrementQuantidade(item.id)}
    />
  );

  return (
    <View style={styles.root}>
      <Text>Estoque componente</Text>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={renderProduto}
      />
    </View>
  );
};

EstoqueScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};

export default EstoqueScreen;
