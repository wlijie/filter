class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      open: false,
      currentIndex:null,
      key:null,
      data:props.data
    }
  }
  componentWillUnmount() {
    this.resetFilter()
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data){
      this.state={
        data:nextProps.data
      }
    }
  }
  tabsChange(index,key){
    if(index === this.state.currentIndex){
      this.resetFilter()
      return;
    }
    this.setState({
      currentIndex:index,
      open:true,
      key:key.type,
    })
  }
  closeModal(e){
    e.preventDefault();
    this.resetFilter();
  }
  resetFilter(){
    this.setState({
      currentIndex:null,
      open:false,
    })
  }
  //点击回调
  filterChange(val){
    const { data, key, currentIndex } = this.state;
    let obj = {
      attr:key,
      value:val.area_id
    };
    data[currentIndex].title = val.name
    this.setState({
      data:data,
    })
    this.props.onChange&&this.props.onChange(obj)
    this.resetFilter();
  }
  render() {
    const { data } = this.state;
    return (
      <div className="filter">
        <div className="filter-header">
          {
            data.map( (item,index)=>(
                <a href="javascript:"
                  key={index} 
                  className={this.state.currentIndex === index ? "filter-nav nav-active" : "filter-nav" } 
                  onClick={this.tabsChange.bind(this,index,item)}>
                    <span>{item.title}</span><i className="icon filter-screen-icon"></i>
                </a>
              ))
          }
        </div>
        <div>
          {
            data.map( (item,index)=>(
              <section key={index} 
                className={this.state.currentIndex === index ? "filter-extend open" : "filter-extend" }>
                <ul>
                  {
                    item.children.map((childrenItem,i)=>(
                      <li key={i} onClick={this.filterChange.bind(this,childrenItem)}>{childrenItem.name}</li>
                    ))
                  }
                </ul>
              </section>
            ))
          }
        </div>
        
        <section className={this.state.open ? "filter-modal open" : "filter-modal" } onClick={this.closeModal.bind(this)}></section>
      </div>
    )
  }
};

