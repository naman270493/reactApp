import React, {Component} from "react";
import Main from "./main.js";


function Footer(){
	return(<div><p>Contact US</p></div>);
}
function Header(){
	return (<div><h1>Author Quiz</h1><p>Select the books of author below</p></div>);
}


class App extends Component{

render(){

	return (
			<div>
			<Header/>
			//<Main {...state}/>
			<Main/>
			<Footer/>
			</div>
	);
}
}

export default App;
