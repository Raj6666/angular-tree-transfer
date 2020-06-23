/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-06-16 10:55:25
 * @LastEditors: Husiyuan
 * @LastEditTime: 2020-06-23 21:18:27
 */
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd';
import { CommonService } from 'src/services/common.service';
import { MyTreeService } from 'src/services/my-tree.service';

@Component({
  selector: 'app-tree-nodes',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('waitSelectTreeCom', { static: true }) waitSelectTreeCom;
  @ViewChild('selectedTreeCom', { static: true }) selectedTreeCom;
  // 树形选择待选框的数据
  waitSelectTreeNodes: NzTreeNodeOptions[] = [
    {
      title: '全部',
      key: '0',
      children: [
        {
          title: '模块',
          key: '100',
          parentKey: '0',
          actionType: ['write', 'read'],
          children: [
            { title: '租户管理', key: '1000', parentKey: '100', actionType: ['write', 'read'], isLeaf: true },
            { title: '应用管理', key: '1001', parentKey: '100', actionType: ['write', 'read'], isLeaf: true },
            {
              title: '用户管理', key: '1002', parentKey: '100', actionType: ['write', 'read'], children: [
                { title: '大用户管理', key: '10021', parentKey: '1002', actionType: ['write', 'read'], isLeaf: true },
                { title: '小用户管理', key: '10022', parentKey: '1002', actionType: ['write', 'read'], isLeaf: true },
              ]
            },
          ]
        },
        {
          title: '按钮',
          key: '101',
          parentKey: '0',
          actionType: ['write'],
          children: [
            { title: '租户删除', key: '1010', parentKey: '101', actionType: ['write', 'read', 'read', 'read', 'read', 'read'], isLeaf: true },
            { title: '租户新增', key: '1011', parentKey: '101', actionType: ['write'], isLeaf: true }
          ]
        }
      ]
    }
  ];
  // 树形选择已选框的数据
  selectedTreeNodes: NzTreeNodeOptions[] = [];
  // 原始树结构数据
  originTreeNodes = [
    {
      title: '全部',
      key: '0',
      children: [
        {
          title: '模块',
          key: '100',
          parentKey: '0',
          actionType: ['write', 'read'],
          children: [
            { title: '租户管理', key: '1000', parentKey: '100', actionType: ['write', 'read'], isLeaf: true },
            { title: '应用管理', key: '1001', parentKey: '100', actionType: ['write', 'read'], isLeaf: true },
            {
              title: '用户管理', key: '1002', parentKey: '100', actionType: ['write', 'read'], children: [
                { title: '大用户管理', key: '10021', parentKey: '1002', actionType: ['write', 'read'], isLeaf: true },
                { title: '小用户管理', key: '10022', parentKey: '1002', actionType: ['write', 'read'], isLeaf: true },
              ]
            },
          ]
        },
        {
          title: '按钮',
          key: '101',
          parentKey: '0',
          actionType: ['write'],
          children: [
            { title: '租户删除', key: '1010', parentKey: '101', actionType: ['write', 'read', 'read', 'read', 'read', 'read'], isLeaf: true },
            { title: '租户新增', key: '1011', parentKey: '101', actionType: ['write'], isLeaf: true }
          ]
        }
      ]
    }
  ];
  // 已选框待选框的查询框模糊查找的变量
  waitSelectSearchValue;
  selectedSearchValue;



  constructor(
    private common: CommonService,
    private myTreeService: MyTreeService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() {
  }


  transfer(type) {
    const source = type === 'select' ? this.waitSelectTreeCom : this.selectedTreeCom;
    const target = type === 'select' ? this.selectedTreeCom : this.waitSelectTreeCom;
    // 拿到源树已选节点的一维数组
    this.myTreeService.convertTreeToArr(source.getCheckedNodeList());
    const sourceCheckedArr = [...this.myTreeService.treeNodeArray];
    this.myTreeService.treeNodeArray = [];
    // 拿到目标树中所有节点的一维数组
    this.myTreeService.convertTreeToArr(target.getTreeNodes());
    const targetArr = [...this.myTreeService.treeNodeArray];
    this.myTreeService.treeNodeArray = [];
    // 合并一维数组并在原始树中筛选节点
    const combineArray = this.common.uniqueArr(sourceCheckedArr.concat(targetArr));
    this.myTreeService.convertTreeToArr(this.originTreeNodes);
    const arr = this.myTreeService.treeNodeArray;
    for (let i = arr.length - 1; i >= 0; i --) {
      let need = false;
      combineArray.map(needItem => {
        if (needItem.key === arr[i].key || needItem.parentKey === arr[i].key) {
          need = true;
        }
      });
      if (!need) {
        this.myTreeService.treeNodeArray.splice(i, 1);
      }
    }
    // 生成目标树
    this.myTreeService.loadNodeList(this.myTreeService.treeNodeArray);
    if (type === 'select') {
      this.selectedTreeNodes = this.myTreeService.treeData;
    } else {
      this.waitSelectTreeNodes = this.myTreeService.treeData;
    }
    // 重置服务中的属性
    this.myTreeService.treeData = [{
      title: '全部',
      key: '0',
      children: [
      ]
    }];
    this.myTreeService.matchKeyList = [];
    this.myTreeService.treeNodeArray = [];
    // 移除源树中的已选节点
    this.myTreeService.treeRemoveChecked(source.getTreeNodes());
    this.myTreeService.treeRefreshHalfchecked(source.getTreeNodes());

    return false;
  }
}
