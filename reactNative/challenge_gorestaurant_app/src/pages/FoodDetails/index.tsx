import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdittionalItem,
  AdittionalItemText,
  AdittionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

interface Params {
  id: number;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: number;
  thumbnail_url: string;
  formattedPrice: string;
  extras: Extra[];
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const { data } = await api.get(`foods/${routeParams.id}`);

      setFood({ ...data, formattedPrice: formatValue(data.price) });

      setExtras(
        data.extras.map((extra: Omit<Extra, 'quantity'>) => ({
          ...extra,
          quantity: 0,
        })),
      );
    }

    loadFood();
  }, [routeParams]);

  useEffect(() => {
    async function loadIsFavorite(): Promise<void> {
      const { data } = await api.get(`favorites`);

      const foodExist = data.find((f: Food) => f.id === routeParams.id);

      setIsFavorite(!!foodExist);
    }

    loadIsFavorite();
  }, [routeParams.id]);

  function handleIncrementExtra(id: number): void {
    const indexExtra = extras.findIndex(extra => extra.id === id);

    if (indexExtra >= 0) {
      const newExtraValue = [...extras];

      newExtraValue[indexExtra].quantity += 1;

      setExtras(newExtraValue);
    }
  }

  function handleDecrementExtra(id: number): void {
    const indexExtra = extras.findIndex(extra => extra.id === id);

    if (indexExtra >= 0) {
      const newExtraValue = [...extras];

      if (newExtraValue[indexExtra].quantity > 0) {
        newExtraValue[indexExtra].quantity -= 1;
        setExtras(newExtraValue);
      }
    }
  }

  function handleIncrementFood(): void {
    setFoodQuantity(value => value + 1);
  }

  function handleDecrementFood(): void {
    if (foodQuantity > 1) {
      setFoodQuantity(value => value - 1);
    }
  }

  const toggleFavorite = useCallback(async () => {
    if (isFavorite) {
      api.delete(`/favorites/${food.id}`);
    } else {
      const {
        id,
        name,
        description,
        price,
        category,
        image_url,
        thumbnail_url,
      } = food;

      const foodFavorite = {
        id,
        name,
        description,
        price,
        category,
        image_url,
        thumbnail_url,
      };
      api.post(`/favorites`, { ...foodFavorite });
    }

    setIsFavorite(!isFavorite);
  }, [isFavorite, food]);

  const cartTotal = useMemo(() => {
    const totalExtra = extras.reduce((accumulator, extra) => {
      return accumulator + extra.quantity * extra.value;
    }, 0);

    return formatValue((totalExtra + food.price) * foodQuantity);
  }, [extras, food, foodQuantity]);

  async function handleFinishOrder(): Promise<void> {
    const { formattedPrice, id, ...allValues } = food;

    const newOrder = { ...allValues, product_id: id };
    await api.post(`/orders`, { ...newOrder });
  }

  // Calculate the correct icon name
  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    // Add the favorite icon on the right of the header bar
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPricing>{food.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Adicionais</Title>
          {extras.map(extra => (
            <AdittionalItem key={extra.id}>
              <AdittionalItemText>{extra.name}</AdittionalItemText>
              <AdittionalQuantity>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="minus"
                  onPress={() => handleDecrementExtra(extra.id)}
                  testID={`decrement-extra-${extra.id}`}
                />
                <AdittionalItemText testID={`extra-quantity-${extra.id}`}>
                  {extra.quantity}
                </AdittionalItemText>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="plus"
                  onPress={() => handleIncrementExtra(extra.id)}
                  testID={`increment-extra-${extra.id}`}
                />
              </AdittionalQuantity>
            </AdittionalItem>
          ))}
        </AdditionalsContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <PriceButtonContainer>
            <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color="#6C6C80"
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <AdittionalItemText testID="food-quantity">
                {foodQuantity}
              </AdittionalItemText>
              <Icon
                size={15}
                color="#6C6C80"
                name="plus"
                onPress={handleIncrementFood}
                testID="increment-food"
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={() => handleFinishOrder()}>
            <ButtonText>Confirmar pedido</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;