import React, {Component} from "react";

class App extends Component{

function Header(){
	return(<div><h1>Author Quiz</h1><p>Select the books of author below</p></div>);
}
function Footer(){
	return(<div><p>Contact US</p></div>);
}


render(){
	return (
			<div>
			<Header />
			<main{...mainData}/>
			<Continue/>
			<Footer/>
			</div>
	);
}
}

export default App;
