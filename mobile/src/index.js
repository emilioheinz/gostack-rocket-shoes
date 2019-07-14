import React from 'react'
import { StatusBar } from 'react-native'

import Routes from './routes'

import './config/ReactotronConfig'

const App = () => {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#141419' />
      <Routes />
    </>
  )
}

export default App