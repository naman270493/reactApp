import React, {Component} from "react";
import ReactDOM from "react-dom";
import data from "./prodData.js";
import "./bootstrap.min.css";
import "./app.css";

//import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

const authorData= data;

function getData(authorData){
	const bookData = authorData.reduce((p,c,i)=>p.concat(c.books),[]);
	const fourRandomBooks = shuffle(bookData).slice(0,4);
	const answer = sample(fourRandomBooks);
	
	return{
			books: fourRandomBooks,
			author: authorData.find((author)=>author.books.some((title)=>(title==answer)))
	};
	 }		
/*			var bookdata =[];
     authorData.forEach(x,function(){
    	 	var tempArr = x.books;
    	 	bookData.push(tempArr);
    	 
     });
     
     return bookdata;
	 
	//using map
			const bookData=authorData.map((x)=>(x.books));
			
	//using reduce
	const bookData = authorData.reduce(function(p,c,i){
			p.concat(c.books);
	 }
*/

function Footer(){
	return(<div className="jumbotron center"><p><strong>Contact US</strong></p></div>);
}
function Header(mainData){
	return (<div className="jumbotron center"><h1>Author Quiz</h1><p>Select the books of author below</p></div>);
}
const state = {
			mainData : getData(authorData),
		 //mainData : 	{	
							//author :authorData[0].name,
							//books : authorData[0].books
					
			//}
			highlight : ''
	}

	function Book({title, onClick}){
		return (<div className = "answer" onClick={()=>{onClick(title);}}>
				<h3>{title}</h3>
				</div>
		);

}
	
function Main({mainData, highlight}){

		
		return(
			
			<div className="container-fluid">
			<div className="authnamecss"><strong>{mainData.author.name}</strong></div>
			<div className= "row" style={{backgroundColor: state.highlight}}>
				<div className= "col-md-4 offset-1" >
					<img src={mainData.author.imageURL} className="authorimage"/>
			</div>
				<div className= "col-md-6 offset-1">
					{mainData.books.map(function(title){ return (<Book title={title} key={title} onClick={onAnswerSelected}/>);})}
			</div>
			</div>
			</div>
		);
}

function App (mainData, highlight, onAnswerSelected){

	return (
			<div>
			<Header />
			<Main {...mainData} highlight={highlight} onAnswerSelected= {onAnswerSelected}/>
			<Footer />
			</div>
	);
}

function onAnswerSelected(answer){
				const isCorrect = state.mainData.author.books.some((book)=> book === answer);
				state.highlight= isCorrect ? 'green' : 'red';
				render();
		}
		
//ReactDOM.render(<App/>, document.getElementById('root'));
function render(){
ReactDOM.render(<App  {...state} onAnswerSelected= {onAnswerSelected} />, document.getElementById('root'));
}
render();
