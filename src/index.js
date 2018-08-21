import React, {Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import data from "./prodData.js";
import AddAuthorForm from "./AddAuthorForm.js";
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
										     
                          <div className="btn btn-primary btn-lg float-right" onClick={onContinue}> Continue </div>	
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
			<span className="btn-lg btn-success"><Link to="/add"> Add an Author</Link></span>
			<Footer />
			</div>
	);
}

function onAnswerSelected(answer){
				const isCorrect = state.mainData.author.books.some((book)=> book === answer);
				state.highlight= isCorrect ? 'green' : 'red';
				render();
		}

const AuthorWrapper = withRouter(({history}) =>
			<AddAuthorForm onAddAuthor = {(author) => { 
													
												authorData.push(author);
												history.push('/');
												} } />
);

function AppRender(){
			return (<App  {...state} onAnswerSelected= {onAnswerSelected} />);
}
		
//ReactDOM.render(<App/>, document.getElementById('root'));
function render(){
	ReactDOM.render(
	<BrowserRouter>
			<React.Fragment>
				< Route exact path = "/" component = {AppRender} />
				< Route path = "/add" component = {AuthorWrapper} />
			</React.Fragment>
		</BrowserRouter>, document.getElementById('root'));
		
		
}
render();
