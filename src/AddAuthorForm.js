import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";

class AuthorForm extends Component{

		constructor(props){
			super(props);
			this.state = {
			
				name :'',
				imageURL : '',
				books: [],
				bookTemp: ''
			},
			
			this.onFieldChange = this.onFieldChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleAddBook = this.handleAddBook.bind(this);
		}
		
		handleSubmit(){
		
			event.preventDefault();
			this.props.onAddAuthor(this.state);
		}
		
		onFieldChange(event){
	
			this.setState({ 
				[event.target.name] : event.target.value		
			});
		}
		
		handleAddBook(event){
			this.setState({
				books: this.state.books.concat([this.state.bookTemp]),
				bookTemp: ''
			});
		}
		
		
	render(){
	
		return (
		<form onSubmit={this.handleSubmit}>
		
		<div className = "addauthorfield">
		<label htmlFor = "name"><strong> Name </strong>  </label>
		<input type="text" name = "name" className="mar" onChange={this.onFieldChange} value={this.state.name}/>
		</div>
		<div className = "addauthorfield">
		<label htmlFor = "imageURL"> <strong> Image</strong>  </label>
		<input type="text" name = "imageURL" className="mar" onChange={this.onFieldChange} value={this.state.imageURL}/>
		</div>
		<div className = "addauthorfield">
		<label htmlFor = "bookTemp"> <strong>Books</strong> </label>
		{this.state.books.map((book) => <p key= {book}>{book}</p>)}
		<input type="text" name = "bookTemp" className="mar" onChange={this.onFieldChange} value={this.state.bookTemp}/>
		<input type="button" className="btn btn-primary" onClick={this.handleAddBook} value="+"/>
		</div>
		<input type="Submit" className="btn btn-primary" value="Add"/>
		</form>
		);
}
}
function AddAuthorForm({onAddAuthor}){
		return <div>
		<div className="jumbotron center">
		<h1> Add Author</h1>
		</div>
		<AuthorForm onAddAuthor= {onAddAuthor}/>
		</div>
		
}

export default AddAuthorForm;
