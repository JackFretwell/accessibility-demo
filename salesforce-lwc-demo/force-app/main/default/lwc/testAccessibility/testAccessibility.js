import { LightningElement } from 'lwc';

export default class TestAccessibility extends LightningElement {
    
    handleEmptyButtonClick() {
        console.log('Empty button clicked - this should have accessible text');
        // This button has no accessible text/label
    }
    
    handleDivClick() {
        console.log('Div clicked - this should be a proper button with keyboard support');
        // This is a div acting as a button - accessibility violation
    }
    
    connectedCallback() {
        console.log('TestAccessibility component loaded - contains intentional accessibility violations');
    }
    
    renderedCallback() {
        // Example of programmatically adding content that would still be inaccessible
        const emptyHeading = this.template.querySelector('.empty-heading');
        if (emptyHeading && !emptyHeading.textContent) {
            // Even if we add content programmatically, the original empty heading
            // in the template would still trigger linting errors
            // emptyHeading.textContent = 'Now I have content';
        }
    }
}