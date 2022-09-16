require('./bootstrap');

import React from "react";
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app") as HTMLDivElement;
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);