import React from 'react'

//Test Component... (starting with search-input custom element)

var items = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']; //todo: to props

class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.documentClickHandler = this.documentClickHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.state = {
            value: '', // todo: separate value from search text
            show: false
        };
    }
    componentDidMount(){
        document.addEventListener("click", this.documentClickHandler);
    }
    componentWillUnmount(){
        document.removeEventListener("click", this.documentClickHandler);
    }
    documentClickHandler(){
        if(this.state.show){
            this.setState({ show: false });
        }
    }
    onInputChange(e){
        this.setState({ value: e.target.value });
    }
    onInputClick(e){
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ show: true });
    }
    onItemClick(e){
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            value: e.target.innerText,
            show:false
        });
    }
    renderItems({show, value}){
        let styles = {
            display: 'block',
            width: 'inherit',
            maxHeight: '200px',
            overflow: 'auto'
        };

        return show? (
            <ul className="dropdown-menu" style={styles}>
                {items.filter(i=>i.includes(value)).map(i=><li key={i} onClick={this.onItemClick}>{i}</li>)}
            </ul>
        ): null;
        /*return (
            <ul className="dropdown-menu" style={{display:show?'block':'none', width:'inherit'}}>
                {items.filter(i=>i.includes(value)).map(i=><li key={i} onClick={this.onItemClick}><span>{i}</span></li>)}
            </ul>
        );*/
    }
    render(){
        return (
            <div className='input-group' style={{width:400}} tabIndex="0" >
                <input type="text" className="form-control" placeholder="search..."                    
                    onChange={this.onInputChange} value={this.state.value} 
                    onClick={this.onInputClick} onFocus={this.onInputClick} />
                <div className="input-group-addon" onClick={this.onInputClick}>
                    <span className="caret"/>
                </div>
                {this.renderItems(this.state)}
            </div>
        )
    }
}

export default SearchInput;