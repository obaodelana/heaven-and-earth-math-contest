import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

/**
 * Main Entry Point
 * 
 * Mounts the top-level Svelte component (App.svelte) to the DOM element with id 'app'.
 */
const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
