import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccessibilityDemo extends LightningElement {
    @track clickCount = 0;

    handleClick() {
        this.clickCount++;
        
        // Show toast notification for button click
        const event = new ShowToastEvent({
            title: 'Button Clicked!',
            message: `You've clicked the accessible button ${this.clickCount} time(s)`,
            variant: 'success'
        });
        this.dispatchEvent(event);
        
        // Log for demo purposes
        console.log('Accessible button clicked:', this.clickCount);
    }

    connectedCallback() {
        // Log component initialization
        console.log('Accessibility Demo component loaded');
    }

    // Method to demonstrate programmatic focus management
    focusFirstButton() {
        const button = this.template.querySelector('lightning-button');
        if (button) {
            button.focus();
        }
    }
}