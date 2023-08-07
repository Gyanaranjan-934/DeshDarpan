import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 15
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
        />
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<News  setProgress={this.setProgress} pageSize={this.pageSize} key="general" category="general" country="in" />} />
            <Route exact path="/general" element={<News  setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general" country="in" />} />
            <Route exact path="/sports" element={<News  setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports" country="in" />} />
            <Route exact path="/business" element={<News  setProgress={this.setProgress} key="business" pageSize={this.pageSize} category="business" country="in" />} />
            <Route exact path="/technology" element={<News  setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology"country="in" />}/>
            <Route exact path="/science" element={<News  setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" country="in" />} />
            <Route exact path="/health" element={<News  setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health" country="in" />} />
            <Route exact path="/entertainment" element={<News  setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category="entertainment" country="in" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
