import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

export default class SearchContainer extends Component {
 
  handleChange = (event, list) => {
    let shelf = event.target.value;
    this.props.changeStates(shelf, list);
  }
  
  updateQuery = (query) => {
    this.props.searchQuery(query);
  }

 
  render() {
    const { searchList, showSearch } = this.props;

    const shelfOptions = ({list}) => {
      return (
        <div className="book-shelf-changer">
          <select value={list.shelf} onChange={(event) => { this.handleChange(event, list) }} >
            <option value="" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      )
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" onClick={ showSearch }>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}  />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searchList.length > 0 && searchList.map((list) => {
                return (
                  <li key={list.id} >
                    <div className="book">
                      <div className="book-top">
                        {list.imageLinks != null &&
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${list.imageLinks.thumbnail})` }}></div>
                        }
                        {shelfOptions({list})}
                      </div>
                      <div className="book-title">{list.title}  </div>
                      <div className="book-authors">{list.authors}</div>
                    </div>
                  </li>
                )
              }
              )
             }
          </ol>
        </div>
      </div>
    )
  }
}

