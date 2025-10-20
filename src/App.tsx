import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Components/routes/Routes";
import { Footer } from "./Components/layout/Footer.tsx";
import { Navbar } from "./components/layout/NavBar.tsx";

function App() {
		return (
				<Router>
          <Navbar/>
					{/* <Routes /> */}
					<Footer />
				</Router>
		);
}

export default App
