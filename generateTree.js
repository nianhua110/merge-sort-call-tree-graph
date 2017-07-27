/**
 * Created by kyle on 17-7-27.
 */
export default function generateTree(a) {
  let count = 0;
  let tree = {name: '开始', children: [{}]};

  function merge(a, start, mid, end) {
    let b = [];
    let i = start;
    let j = mid + 1;
    let m = mid;
    let n = end;
    while (i <= m && j <= n) {
      if (a[i] > a[j]) {
        b.push(a[j])
        j++;
      } else {
        b.push(a[i])
        i++;
      }
    }

    while (i <= m) {
      b.push(a[i]);
      i++;
    }
    while (j < n) {
      b.push(a[j]);
      j++;
    }

    for (let i = 0; i < b.length; i++) {
      a[start + i] = b[i];
    }
  }

  function sort(a, start, end, currentNdoe) {
    count = count + 1;

    /*判断该节点是父节点的左节点还是右节点*/
    if (currentNdoe && currentNdoe.parent && currentNdoe.whichSideWhenChildNode) {
      if (currentNdoe.whichSideWhenChildNode === 'left') {
        currentNdoe.parent.attributes.step3 = '执行sort' + count
      } else {
        currentNdoe.parent.attributes.step4 = '执行sort' + count;
      }
    }

    const name = 'sort' + count + '( a, ' + start + ', ' + end + ' )'
    console.log(name);
    currentNdoe.name = name;
    currentNdoe.count = count;
    currentNdoe.attributes = {}

    /*step1, 判断递归结束*/
    if (start >= end) {
      console.log('1, 返回');
      currentNdoe.attributes.step1 = '返回';
      return;
    }
    console.log('1, 跳过')
    currentNdoe.attributes.step1 = '跳过';

    /*step２, 计算中位数*/
    const mid = Math.floor((start + end) / 2)
    console.log('2, mid =' + mid);
    currentNdoe.attributes.step2 = 'mid=' + mid;

    currentNdoe.children = [
      {parent: currentNdoe, whichSideWhenChildNode: 'left'},
      {parent: currentNdoe, whichSideWhenChildNode: 'right'}
    ]
    sort(a, start, mid, currentNdoe.children[0]);
    sort(a, mid + 1, end, currentNdoe.children[1]);
    currentNdoe.attributes.step5 = '执行merge(a, ' + ', ' + start + ', '
      + ', ' + mid + ', ' + end + ')'
    merge(a, start,mid, end);
    currentNdoe.attributes.end1='当前a=['+a.reduce((r,v)=>(v+', '+r))+']';
    if(currentNdoe.parent){
      currentNdoe.attributes.end2='返回 sort'+currentNdoe.parent.count+',step ' +
        (currentNdoe.whichSideWhenChildNode === 'left'?'3':'4');
    }
  }


  tree.attributes = {array: ''}
  for (let i = 0; i < a.length; i++) {
    tree.attributes.array += a[i] + ', ';
  }

  sort(a, 0, a.length - 1, tree.children[0])
  console.log(tree);
  return tree
}