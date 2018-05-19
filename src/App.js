import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
//Import container
import CurrentReading from '../src/container/CurrentRead';
import WantToRead from '../src/container/WantToRead';
import Read from '../src/container/Read';
import SearchContainer from '../src/container/SearchContainer';
//Import of static files
import './App.css'


class BooksApp extends Component {
  state = {
    bookList: [],
    searchList : [],
    showSearchPage: false,
  }

 componentDidMount() {
    this.getBookList();
  }

 getBookList = () => {
    BooksAPI.getAll()
      .then((data) => {
          this.setState({ bookList: data });
        }
      );
  }

  changeStates = (shelf, book) => {
    BooksAPI.update(book,shelf)
    .then( (data) => { 
        book.shelf = shelf
        this.setState(state => ({
          bookList: state.bookList.filter(b => b.id !== book.id).concat(book)
        }))    
        //this.getBookList(); 
      } )
  }

  showSearch = () => {
    this.setState({ showSearchPage: false });
    //this.setState({ searchList: [] });
  }

  searchQuery = (query) => {
    query!== '' 
    ?  BooksAPI.search(query)
        .then((searchResults) => { 
          if (!searchResults || searchResults.error) {
            this.setState({ searchList: [] });
            return;
          }

          searchResults = searchResults.map((book) => {
            const bookOnShelf = this
              .state
              .bookList
              .find(b => b.id === book.id);
            book.shelf = bookOnShelf
              ? bookOnShelf.shelf
              : "none";
            return book;
          });

          this.setState({ searchList: searchResults });
          
        })
    : this.setState({ searchList : [] })  
    
  }

  render() {
    const { bookList, searchList } = this.state;
    return (
      <div className="app">
      <Route exact path="/search" render={() => (
        
            <SearchContainer
              showSearch={this.showSearch}
              booklist={bookList}
              searchList={searchList}
              searchQuery={(query) => this.searchQuery(query)} 
              changeStates={(shelf, list) => this.changeStates(shelf, list)} />
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentReading 
                  booklist={bookList} 
                  changeStates={(shelf, list) => this.changeStates(shelf, list)}  />
                <WantToRead 
                  booklist={bookList} 
                  changeStates={(shelf, list) => this.changeStates(shelf, list)} />
                <Read 
                  booklist={bookList} 
                  changeStates={(shelf, list) => this.changeStates(shelf, list)} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
          )} />
        </div>
    )
  }
}


export default BooksApp
