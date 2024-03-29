import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { ServicerService } from 'src/app/services/servicer/servicer.service';
import { ChatData } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  private subscribe: Subscription = new Subscription()
  messages!: ChatData[];
  id!: string;
  noMessage!: string;
  messageForm!: FormGroup
  usersList!: Array<any>
  Roomid!: string;
  servicerId!: string;
  userId!: string
  @ViewChild('chatContainer')
  private chatContainer!: ElementRef;
  myDetails!: any
  constructor(private _socketService: MessagingService, private _fb: FormBuilder, private _servicerServices: ServicerService) { }

  ngOnInit(): void {
    this.getMyDetails()
    this.recentUsersList()
  }

  recentUsersList() {
    this.subscribe.add(this._servicerServices.getRecentUsers().subscribe((res) => {
      if (res.message === 'No users available.') {
        this.noMessage = res.message
      } else {
        this.usersList = res.uniqueUserSenderTypes
      }
    }))
  }
  getMyDetails() {
    this.subscribe.add(this._servicerServices.getMyDetails().subscribe((res) => {
      this.myDetails = res.details
    }))
  }
  recentChat(id: string) {
    this.id = id
    this.messageForm = this._fb.group({
      message: ['', Validators.required],
    })
    this.subscribe.add(this._servicerServices.getRecentChats(id).subscribe({
      next: (res) => {
        this.Roomid = res.id
        this.servicerId = res.servicerId
        this.messages = res.message.messages
        this._socketService.setupSocketConnection(this.Roomid);
        this._socketService.join(this.id, this.Roomid)
      }
    }))
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  sendMessage() {
    const message = this.messageForm.getRawValue();
    if (this.messageForm.valid) {  
      this.scrollToBottom();
      this._socketService.sendMessage(this.Roomid, message.message, this.id, this.servicerId, 'servicer', 'User')
      this._socketService.subscribeToMessages((err, data) => this.handleMessage(data))
      this.messageForm.reset()
    }
  }
  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  handleMessage(data: any) {
    this.messages = data.messages
  }

  ngOnDestroy() {
    this._socketService.disconnect();
  }
}
