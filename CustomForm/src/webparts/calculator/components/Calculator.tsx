import * as React from 'react';
import styles from './Calculator.module.scss';
import { ICalculatorProps } from './ICalculatorProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Calculator extends React.Component<ICalculatorProps, any> {

  constructor(props) {
    super(props)
  
    this.state = {
      initialState:0,
      previousState:null,
      result:'' 
    }
  }
  public  handleClick = (event)=>{
   let value = parseFloat(event.target.value);
   if (this.state.initialState === 0) {
    return this.setState({initialState:value});  // initial state = 5
   }else{
    return this.state.previousState; // previous state = 5
   }
  }
  public handleOperator = (event)=>{
    let operator = event.target.value;
   let finalResult = null;
      switch (operator) {
      case '+':
      finalResult = parseFloat(this.state.previousState + this.state.initialState);
      break;
      case '-':
      finalResult = parseFloat(this.state.previousState) - parseFloat(this.state.initialState);
      break;
      case '*':
      finalResult = parseFloat(this.state.previousState) * parseFloat(this.state.initialState);
      break;
      case '/':
      finalResult = parseFloat(this.state.previousState) / parseFloat(this.state.initialState);
      break;
    }
   return this.setState({result:finalResult});
  }
  public handleClear=(event)=>{
    let clear = event.target.value;
    this.setState({initialState:0})

  }
  public handleDelete = (event)=>{

  }
  public resultHandler=(event)=>{

  }
  public render(): React.ReactElement<ICalculatorProps> {
    return (
      <div className={ styles.calculator }>
        <div className={ styles.container }>
         <h1>Calculator</h1>
         <input value={this.state.initialState} onChange={this.resultHandler}></input><br/>
 
         <input type="button" value={'C'} className='button clear' onClick={this.handleClear}></input>
         {/* <input type="button" value={'Del'} className='button clear' onClick={this.handleDelete}></input> */}
         <input type="button" value={'%'} className='button operator' onClick={this.handleOperator}></input>
         <input type='button' value={'/'} className='button operator'onClick={this.handleOperator}></input><br></br>

         <input type='button' value={'7'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'8'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'9'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'*'} className='button operator' onClick={this.handleOperator}></input><br></br>

         <input type='button' value={'4'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'5'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'7'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'-'} className='button operator' onClick={this.handleOperator}></input><br></br>

         <input type='button' value={'1'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'2'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'3'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'+'} className='button operator' onClick={this.handleOperator}></input><br></br>

         <input type='button' value={'0'} className='button' onClick={this.handleClick}></input>
         <input type='button' value={'.'} className='button operator' onClick={this.handleClick}></input>
         <input type='button' value={'='} className='button operator' onClick={this.handleOperator}></input><br></br>
        </div>
      </div>
    );
  }
}
