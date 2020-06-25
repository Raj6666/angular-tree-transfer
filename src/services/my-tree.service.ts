/*
 * @Descripttion: 树结构服务
 * @version: 0.1.0
 * @Author: Husiyuan
 * @Date: 2020-06-19 11:45:50
 * @LastEditors: Husiyuan
 * @LastEditTime: 2020-06-19 19:55:40
 */
import { Injectable } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core';

@Injectable()
export class MyTreeService {

  treeNodeArray = [];
  treeData: NzTreeNodeOptions[] = [{
    title: '全部',
    key: '0',
    children: [
    ]
  }];
  matchKeyList = [];

  constructor() {}

  /**
   * @desc: 树结构数组转1维数组
   * @param： {nodes} 树结构数据
   * @return: Array
   */
  convertTreeToArr(nodes) {
    nodes.map(item => {
      // 若传进来的是 treeNode 数组，而不是treeData，循环需要使用item的origin属性
      if (item.origin) {
        item = item.origin;
      }
      if (item.parentKey) {
        // 不使用直接赋值或者 ...自动结构 是因为不能把children添加到一维数组里
        const node: any = {
          title: item.title,
          key: item.key,
          parentKey: item.parentKey,
          actionType: item.actionType
        };
        // 如果为叶子节点，则添加叶子节点属性；否则添加默认展开属性；
        if (item.isLeaf) {
          node.isLeaf = item.isLeaf;
        } else {
          node.expanded	= true;
        }
        // 添加节点
        this.treeNodeArray.push(node);
      }
      if (item.children) {
        this.convertTreeToArr(item.children);
      }
    });
  }
  /**
   * @desc: 循环读取1维数组所有数据，生成树
   * @param: {arr} 1维数组
   * @return: null
   */
  loadNodeList(arr) {
    if (arr.length) {
      arr.forEach(data => {
        this._addNode(this.treeData, data);
      });
      arr = arr.filter(item => this.matchKeyList.indexOf(item.key) < 0);
      this.loadNodeList(arr);
    }
  }

  /**
   * @desc: 生成树所用的内部函数
   * @param: {tree} 树结构数组
   * @param: {node} 树节点
   * @return: null
   */
  _addNode(tree, node) {
    tree.map(item => {
      if (item.key === node.parentKey) {
        // 若不存在children 则新增
        if (!item.children) {
          item.children = [];
        }
        item.children.push(node);
        // 记录成功添加节点的key到数组中
        this.matchKeyList.push(node.key);
      }
      if (item.children) {
        this._addNode(item.children, node);
      }
    });
  }
  /**
   * @desc: 刷新树状态，移除已选节点
   * @param： {nodes} 树节点
   * @return: null
   */
  treeRemoveChecked(nodes) {
    nodes.map(item => {
      if (item.isChecked) {
        item.remove();
      }
      if (item.children) {
        this.treeRemoveChecked(item.children);
      }
    });
  }
  /**
   * @desc: 刷新树状态，取消半选状态
   * @param： {nodes} 树节点
   * @return: null
   */
  treeRefreshHalfchecked(nodes) {
    nodes.map(item => {
      if (item.isHalfChecked) {
        item.isHalfChecked = false;
      }
      if (item.children) {
        this.treeRefreshHalfchecked(item.children);
      }
    });
  }
  /**
   * @desc: 刷新树状态，选中指定节点
   * @param： {nodes} 树节点
   * @param： {keys} 需要选中的树节点key
   * @return: null
   */
  treeChecked(nodes, keys) {
    nodes.map(item => {
      if (keys.includes(item.key)) {
        item.checked = true;
      }
      if (item.children) {
        this.treeChecked(item.children, keys);
      }
    });
  }
}
