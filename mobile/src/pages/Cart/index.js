import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { View, TouchableOpacity } from 'react-native'

import * as CartActions from '../../store/modules/cart/actions'
import { formatPrice } from '../../util/format'

import {
  Container,
  CartWrapper,
  FooterTitle,
  TotalValue,
  FinishButton,
  FinishButtonText,
  CartItemsList,
  CartItem,
  MainContent,
  ProductImage,
  Description,
  ProductTitle,
  ProductValue,
  CartItemFooter,
  AmountSelector,
  AmountInput,
  SubTotalCartValue,
  EmptyCartWrappper,
  EmptyCartText,
} from './styles'

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  const increaseItemAmount = (id, amount) => {
    updateAmountRequest(id, amount + 1)
  }

  const decreaseItemAmount = (id, amount) => {
    updateAmountRequest(id, amount - 1)
  }

  const renderCartItems = item => (
    <CartItem>
      <MainContent>
        <ProductImage source={{ uri: item.image }} />
        <Description>
          <ProductTitle>{item.title}</ProductTitle>
          <ProductValue>{item.priceFormated}</ProductValue>
        </Description>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Icon color='#7159c1' name='close' size={24} />
        </TouchableOpacity>
      </MainContent>
      <CartItemFooter>
        <AmountSelector>
          <TouchableOpacity
            onPress={() => decreaseItemAmount(item.id, item.amount)}
          >
            <Icon color='#7159c1' name='remove-circle-outline' size={24} />
          </TouchableOpacity>
          <AmountInput readOnly value={String(item.amount)} />
          <TouchableOpacity
            onPress={() => increaseItemAmount(item.id, item.amount)}
          >
            <Icon color='#7159c1' name='add-circle-outline' size={24} />
          </TouchableOpacity>
        </AmountSelector>
        <SubTotalCartValue>{item.subtotal}</SubTotalCartValue>
      </CartItemFooter>
    </CartItem>
  )

  function renderContent() {
    if (cart.length > 0) {
      return (
        <CartWrapper>
          <CartItemsList
            data={cart}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => renderCartItems(item)}
          />
          <View>
            <FooterTitle>Total</FooterTitle>
            <TotalValue>{total}</TotalValue>
            <FinishButton>
              <FinishButtonText>Finalizar pedido</FinishButtonText>
            </FinishButton>
          </View>
        </CartWrapper>
      )
    }

    return (
      <EmptyCartWrappper>
        <Icon name='remove-shopping-cart' color='#eee' size={64} />
        <EmptyCartText>Seu carrinho est?? vazio.</EmptyCartText>
      </EmptyCartWrappper>
    )
  }

  return <Container>{renderContent()}</Container>
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount
    }, 0)
  ),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
