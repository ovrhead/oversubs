import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import Fluent UI stuff
import { 
  provideFluentDesignSystem, 
  fluentCard, 
  fluentButton,
  fluentSelect,
  fluentOption,
  fluentTextField
} from "@fluentui/web-components";
import { webDarkTheme } from "@fluentui/tokens";

// Apply Fluent tokens
const style = document.createElement('style');
const cssVars = Object.entries(webDarkTheme)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n');
style.textContent = `:root {\n${cssVars}\n}`;
document.head.appendChild(style);

provideFluentDesignSystem().register(
  fluentCard(),
  fluentButton(),
  fluentSelect(),
  fluentOption(),
  fluentTextField()
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
