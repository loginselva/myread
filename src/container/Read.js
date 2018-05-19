import React, { Component } from 'react'
import '../App.css';

export default class Read extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, list) => {
    let shelf = event.target.value;
    this.props.changeStates(shelf, list);
  }

  _getfilter = (booklist) => {
    return booklist.shelf === 'read';
  }

  render() {
    const { booklist } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              booklist.filter(this._getfilter).map((list) => {
                return (
                  <li key={list.id} >
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${list.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value={list.shelf} onChange={(event) => this.handleChange(event, list)} >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read" >Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{list.title}</div>
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