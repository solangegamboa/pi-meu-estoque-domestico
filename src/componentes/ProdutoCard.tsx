import {Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

export const ProdutoCard = (props: any) => {
  return (
    <Button
      title={`Produto card ${props.productId}`}
      color="#710ce3"
      onPress={() =>
        Navigation.push(props.componentId, {
          component: {
            name: 'DetalhesProduto',
            passProps: {
                productId: props.productId
            }
          },
        })
      }
    />
  );
};
