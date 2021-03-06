import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import axios from 'axios'
import NavBar from '../NavBar.jsx'
import './Search.scss'
import '../Movie/Movie.scss'


class Search extends Component {



  constructor() {
    super();

    this.state = {
      value: '',
      movie: {},
      content: '',
      query: '',
      queryList: []
    };

    this.baseUrl = 'http://localhost:8000/search/movies/';
    this.inputChangeHandler_search = this.inputChangeHandler_search.bind(this);
    this.clickHandlerSearch = this.clickHandlerSearch.bind(this);
    this.imgClickHandler = this.imgClickHandler.bind(this);



  }

  inputChangeHandler_search(event) {
    this.setState({ query: event.target.value });
  }

  imgClickHandler(value) {
    this.props.history.push('/details/' + value)
  }


  clickHandlerSearch(event) {
    if(this.state.query || this.state.queryList) {
      axios.get(this.baseUrl + this.state.query).then((response) => {
      this.setState({
        queryList: response.data.map((review, idx) => {
          return (
            <div className="center-me medium-font">
              <br />
              <img key={review.id} onClick={() => {return this.imgClickHandler(review.id)}} src={"https://picsum.photos/200/"+ (300 + idx)}/>
              <br/>
                <Card>
                  Movie: {review.title}
                </Card>
              <br/>
              <br/>
            </div>
            )
        })
      });
    })
    }
  }

  render() {
    return (
      <div className="h-100">
        <NavBar />
        <div className="MovieCss">  
          <h1 >Let's Search for a Movie!</h1>
          <Input
            onChange={this.inputChangeHandler_search}
            label='Movie'
            placeholder='The name of movie here!'
            value={this.state.query}
          />
          <br/>
          <br/>
          {/*{window.sessionStorage.getItem('userId')}*/}
          <Button onClick={this.clickHandlerSearch}>
            Search
          </Button>
          <div className="here">
            {this.state.queryList}
          </div>
        </div>
        
      </div>
      )
  }
}

export default Search