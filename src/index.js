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
	return(<div class="jumbotron center"><p><strong>Contact US</strong></p></div>);
}
function Header(mainData){
	return (<div class="jumbotron center"><h1>Author Quiz</h1><p>Select the books of author below</p></div>);
}
const state = {
			mainData : getData(authorData)
		 //mainData : 	{	
							//author :authorData[0].name,
							//books : authorData[0].books
					
			//}
		
	}
	
function Main({mainData}){
	
	

	//var data = props.data;
		return(
			
			<div className="container-fluid">
			<div className="authnamecss"><strong>{mainData.author.name}</strong></div>
			<div className= "row">
				<div className= "col-md-4 offset-1" >
					<img src={mainData.author.imageURL} className="authorimage"/>
			</div>
				<div className= "col-md-6 offset-1">
					{mainData.books.map(function(title){ return (<p>{title}</p>);})}
			</div>
			</div>
			</div>
		);
	
	
	
}

function App (mainData){

	return (
			<div>
			<Header />
			<Main {...mainData}/>
			<Footer />
			</div>
	);
}
//ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<App  {...state}/>, document.getElementById('root'));
