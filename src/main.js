import React,{Component} from "react";



class Main extends Component{
	
	
	render(){
	//var data = props.data;
		return(
			<div className= "row">
				<div className= "col-md-4">
					<img src={author.imageURL} className="authorimage"/>
			</div>
				<div className= "col-md-8">
					{books.map(function(title){ return (<p>title</p>);})}
			</div>
			</div>
		);
	
	
	}
}

export default Main;
