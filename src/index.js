import React from "react";
import ReactDOM from "react-dom";
import data from "./data.js";
import App from "./app.js";
//import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

const authorData= data;

function getData(){
	const bookData = authorData.reduce((p,c,i)=>p.books.concat(c.books));
	const fourRandomBooks = shuffle(bookData).slice(0,4);
	const answer = sample(fourRandomBooks);
	
	return{
			books: fourRandomBooks,
			author: authors.find((author)=>authors.books.some((title)=>(title==answer)))
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

const state = {
			//mainData : getData()
		 mainData : 	{	
							//author :authorData[0].name,
							//books : authorData[0].books
							author:"naman",
							books:"21 days in future"
			}
		
	}
ReactDOM.render(<App/>, document.getElementById('root'));
//React.render(<App {...state}/>, document.getElementById('root'));

