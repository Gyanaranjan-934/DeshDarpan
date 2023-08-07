import React, { Component } from 'react';
import NewsItem from './NewsItem'; // Import your NewsItem component
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        };
    }
    async componentDidMount() {
        this.updateNews()
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f6238a8ae90247dfb6fce4b04be81a06&page=${this.state.page}${this.props.pageSize ? `&pageSize=${this.props.pageSize}` : ""}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        // console.log(parsedData);
        this.props.setProgress(70)
        this.setState({ articles: parsedData.articles, totalResults: Math.floor(parsedData.totalResults / this.props.pageSize) * this.props.pageSize, loading: false });
        this.props.setProgress(100)
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    handleNextClick = async () => {
        let newPage = this.state.page + 1
        // this.setState({page: newPage,articles: parsedData.articles,loading:false});
        if (this.props.pageSize * newPage <= this.state.totalResults) {
            this.setState({ page: newPage })
        } else {
            this.setState({ page: newPage })
        }
        this.updateNews()

    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        // this.updateNews()
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f6238a8ae90247dfb6fce4b04be81a06&page=${this.state.page}${this.props.pageSize ? `&pageSize=${this.props.pageSize}` : ""}`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: Math.floor(parsedData.totalResults / this.props.pageSize) * this.props.pageSize});
    };

    render() {
        return (
            <>
                    <div className="container">
                        <h1>Top Headlines</h1>
                        {this.state.loading && <Spinner/>}
                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length !== this.state.totalResults}
                            loader={<Spinner/>}
                        >
                        <div className="row">
                            {this.state.articles.map((element) => (
                                <div className="col-md-3 mx-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? (element.title.length > 50 ? element.title.slice(0, 50) + "..." : element.title) : ""}
                                        description={element.description ? element.description.substring(0, 100) : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                        </InfiniteScroll>
                    </div>
                    {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick} >&larr;</button>
                    <button type='button' disabled={(this.state.page+1) > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick} >&rarr;</button>
                </div> */}
            </>
        );
    }
}

export default News;
