import React from "react";
import ReactDOM from "react-dom";
import Tree from "react-d3-tree";
import {Row, Col, Input, Button, message} from "antd";
import "./index.css";
import generateTree from "./generateTree";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    const array = [8, 2, 12, 6, 9, 7, 3, 88, 23];
    const beforeSortArray = [...array];
    const tree = generateTree(array);
    const afterSortArray = [...array];
    console.log('before', beforeSortArray);
    console.log('after', afterSortArray);
    console.log(JSON.stringify(afterSortArray));
    const val = JSON.stringify(beforeSortArray)
    this.state = {beforeSortArray, afterSortArray, inputVal: val.substring(1,val.length-1), tree}
  }

  onChange(e) {
    const val = this.state.inputVal;
    console.log(val);
    if(/^(\d+,\s*)+\d+$/.test(val)){
      const array = JSON.parse('['+val+']');
      const beforeSortArray = [...array];
      const tree = generateTree(array);
      const afterSortArray = [...array];
      console.log('before', beforeSortArray);
      console.log('after', afterSortArray);
      console.log(JSON.stringify(afterSortArray));
      this.setState({ beforeSortArray, afterSortArray, tree })
    }else {
      message.error('输入的数据格式错误')
    }
  }

  render() {

    const tree = this.state.tree;
    return (
      <div style={{ marginLeft: 10}}>
        <Row type="flex" style={{width: '2596px', height: '1024px'}}>
          <Col span={4}>
            请输入数组:
            <Input defaultValue={this.state.inputVal}
                   onChange={(e) => {
                     const val = e.target.value;
                     console.log(val);
                     this.setState({inputVal: val})
                   }}
            />
            <br/><br/>
            <Button type="primary" onClick={this.onChange}>归并排序</Button>
            <br/><br/>
            结果:{this.state.afterSortArray.reduce((v, r) => (v + ', ' + r))}
            <br/>
            void sort(int a[], int first, int last, int b[])
            <br/>
            {'{'}
              <br/>
            &nbsp;&nbsp;{'if (first >= last) return; //step1'}
              <br/>
              &nbsp;&nbsp;{'{'}
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'int mid = (first + last) / 2;//step2'} <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{' mergesort(a, first, mid, b);    //step3'} <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'mergesort(a, mid + 1, last, b); //step4'}  <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'mergearray(a, first, mid, last, b); //step5'}  <br/>
              &nbsp;&nbsp;{'}'} <br/>
            {'}'}
          </Col>
          <Col span={20}>
            <div style={{width: '100%', height: '1024pt', border: 'solid 1px black', fontSize: '24pt'}}>
              <Tree data={[tree]}
                    nodeSize={ {x: 400, y: 200}}
                    translate={ {x: 50, y: 500}}
                    scaleExtent={{min:0.1, max:10}}
                    separation={{siblings: 3, nonSiblings:2}}
              >

              </Tree>
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
