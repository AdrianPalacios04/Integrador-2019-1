import React, { Component } from 'react'
import CardSearch from './CardSearch'
import CardAdd from './CardAdd';
// import { Login, LoginConsumer } from '../../Login';

export default class CardList extends Component {
  constructor(props){
    super(props)
    this.state={
        pubs : [],
        filter: {
          title: '',
          search: '',
      }
    }
    this.handleOnFilter = this.handleOnFilter.bind(this)
    this.handleOnSearch = this.handleOnSearch.bind(this)
  }

  handleOnSearch(e) {
    let newFilter = Object.assign( {}, this.state.filter, { [e.target.name]: [e.target.value] } )
    this.setState({
      filter: newFilter
    })
    // console.log(newFilter)
  }

  handleOnFilter(filter, data) {
    let regex = new RegExp(filter.search, 'i')
    // return data.filter(q => ( regex.test(q.name) || regex.test(q.teacher) || regex.test(q.categories) ))
    return data.filter(q=>(regex.test(q.title)))
  }

  //componentWillMount() {
    //axios.get('http://shareinfotecsup.herokuapp.com/api/publication/')
    //.then(res => {
      //this.setState({ pubs: res.data})
      //console.log(res)
    //});
  //}

  render() {
    return (
      <div>
          <CardAdd/>
          <CardSearch onSearch={this.handleOnSearch} />
          
      </div>
    )
  }
}
