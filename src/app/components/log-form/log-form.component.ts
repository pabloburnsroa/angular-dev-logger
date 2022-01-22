import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  id!: string;
  text!: string;
  date: any;

  isNew: boolean = true;
  constructor(private logService: LogService) {}

  ngOnInit(): void {
    // Subscribe to selectedLog observable
    this.logService.selectedLog.subscribe((log) => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  // Submit new log
  onSubmit() {
    if (this.isNew) {
      const newLog = {
        id: uuidv4(),
        text: this.text,
        date: new Date(),
      };
      this.logService.addLog(newLog);
    } else {
      // Updated log to be updated
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date(),
      };
      this.logService.updateLog(updLog);
    }

    // Clear the input state
    this.clearState();
  }

  clearState() {
    (this.isNew = true),
      (this.id = ''),
      (this.text = ''),
      (this.date = ''),
      this.logService.clearState();
  }
}
