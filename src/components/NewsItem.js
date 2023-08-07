import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props

    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl?imageUrl:"https://camo.githubusercontent.com/62f7147b015014d86f38098373baccc2b542d6301dc12b40df69ea85db35bf2c/68747470733a2f2f73636f74742e65652f696d616765732f6e756c6c2e706e67"} className="card-img-top" alt="..."/>
            <div className="card-body">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noopener" target='_blank' className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  } 
}
