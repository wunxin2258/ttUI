/**
 * 弹窗组件示例
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-popus',
  templateUrl: './popus.component.html',
  styleUrls: ['./popus.component.css']
})
export class PopusComponent implements OnInit {
  private data: object = {};
  constructor(
  ) { }

  @Input()
  set popusData(data: object) {
    this.data = data;
  }
  get popusData(): object {
    return this.data;
  }
  @Output()
  closed = new EventEmitter();
  ngOnInit() {

  }
  public toClosed() {
    this.closed.next({isConfirm: true, data: {d: 1}});
  }
}
