import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent {

  /**
   * The content of this array is displayed as lines in the terminal.
   */
  @Input() public lines: string[] = [];

  /** Limit displayed lines to this number (show newest/last lines). */
  @Input() public maxLines: number = 20;
  /** If true, the line order is reversed. */
  @Input() public reverseOrder: boolean = false;

  public get displayLines(): string[] {
    if (!this.lines) return [];
    let lines = this.lines;
    if (this.maxLines > 0 && lines.length > this.maxLines)
      lines = lines.slice(lines.length - this.maxLines);
    if (this.reverseOrder)
      lines = lines.slice().reverse();
    return lines;
  }

}
