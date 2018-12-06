import React, { Component } from 'react';
import axios from 'axios';
import ReactBootstrap, {Jumbotron, Button, FormControl, ListGroup, ListGroupItem, Form} from 'react-bootstrap';
class Counter extends Component{
     constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            posts: []
        };
        this.getListJSON = this.getListJSON.bind(this);
        this.sendAddResquest = this.sendAddResquest.bind(this);
    }
    render(){
        return (
        <React.Fragment>
            <div className="container">
                <Jumbotron>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"></link>
                    <h1>Todos</h1>
                    <Form inline>
                        <FormControl value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/> 
                        <Button type="submit" onClick={this.sendAddResquest}>Adicionar</Button>
                    </Form>
                    <ListGroup>{this.state.posts.map((post) => (
                                <ListGroupItem   key={post.id}>{post.titulo}</ListGroupItem>
                    ))}</ListGroup>
                </Jumbotron>
            </div>
        </React.Fragment>
        
        );
    }

  
    updateInputValue(evt) {
        this.setState({
        inputValue: evt.target.value
        });
    }

    sendAddResquest(){
        axios.get("http://localhost:8080/challenge/adicionar?titulo=" + this.state.inputValue);
        this.interval = setTimeout (() => this.getListJSON(), 1000);
    }

    getListJSON() {
        axios.get(`http://localhost:8080/challenge/getListJSON`).then(response => { 
            console.log(response)
            this.setState({posts: response.data.taskList})
            console.log(this.state.posts)
        })
        .catch(error => {
            console.log(error.response)
        });
    }
    componentDidMount (){
         this.getListJSON();
    }



}

 

export default Counter;