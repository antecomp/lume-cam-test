/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App.tsx'
import "lume"

const root = document.getElementById('root')

render(() => <App />, root!)
