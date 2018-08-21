import React, {Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import {connect} from 'react-redux';
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

function mapStateToProps(state){
		return {
			mainData: state.mainData,
			highlight: state.highlight
	};
}

function mapDispatchToProps(dispatch){
		return {
			onAnswerSelected : (answer) => { dispatch({ type: 'ANSWER_SELECTED', answer}); },
			onContinue : () => { dispatch({ type: 'CONTINUE'}); }
	};
}
	
const Main = connect( mapStateToProps, mapDispatchToProps)(
					
		function({mainData, highlight, onAnswerSelected, onContinue}){

		
		return(
			
			<div className="container-fluid">
			<div className="authnamecss"><strong>{mainData.author.name}</strong></div>
			
			<div className= "row" style={{backgroundColor: highlight}}>
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
});

function App (mainData, highlight, onAnswerSelected){

	return (
			<div>
			<Header />
			<Main {...mainData} highlight={highlight} onAnswerSelected= {onAnswerSelected}/>
			<div className="btn btn-success btn-lg center mar"><Link to="/add"> Add an Author</Link></div>
			<Footer />
			</div>
	);
}


// const AuthorWrapper = withRouter(({history}) =>
				// <AddAuthorForm onAddAuthor = {(author) => { 
													
												// authorData.push(author);
												// history.push('/');
												// } } />
// );
// function AuthorWrapper() {
	// return (<AddAuthorForm onAddAuthor ={(author) => authorData.push(author)} />);
// }

// function AppRender(){
					// return (
							// <ReactRedux.Provider store = {store}>
								// <App /> 
							// </ReactRedux.Provider>
							// );
// }

function AppRender(){
					return (<App /> );
}




function reducer( state = { authorData, mainData: getData(authorData), highlight: ''}, action ){

			switch (action.type){
						case  'ANSWER_SELECTED' : 
						
						const isCorrect = state.mainData.author.books.some((book)=> book === action.answer);
							return Object.assign( 
										{}, 
										state, {
											highlight : isCorrect ? 'green' : 'red'
										});
						case  'CONTINUE' : 
							return Object.assign( 
										{}, 
										state, {
											highlight : '',
											mainData  :  getData(authorData)
										});
										
						case 'ADD_AUTHOR' :
							return Object.assign(
										{},
										state,
										{ authorData : state.authorData.concat([action.author]) }						
								);
						default : return state;
			}
			
}			

let store= Redux.createStore(reducer);
		
//ReactDOM.render(<App/>, document.getElementById('root'));

	ReactDOM.render(
	<BrowserRouter>
		<ReactRedux.Provider store = {store}>
			<React.Fragment>
				< Route exact path = "/" component = {App} />
				< Route path = "/add" component = {AddAuthorForm} />
			</React.Fragment>
		</ReactRedux.Provider>
		</BrowserRouter>, document.getElementById('root'));
