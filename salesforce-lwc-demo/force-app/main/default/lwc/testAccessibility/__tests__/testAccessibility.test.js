import { createElement } from 'lwc';
import TestAccessibility from 'c/testAccessibility';

describe('c-test-accessibility', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders correctly', () => {
        // Create element
        const element = createElement('c-test-accessibility', {
            is: TestAccessibility
        });
        document.body.appendChild(element);

        // Verify the component renders
        expect(element).toBeTruthy();
        
        // This component intentionally has accessibility violations
        // These tests verify the violations exist (for demo purposes)
    });

    it('contains image without alt text (accessibility violation)', () => {
        const element = createElement('c-test-accessibility', {
            is: TestAccessibility
        });
        document.body.appendChild(element);

        // Find images without alt text - this is intentionally a violation
        const images = element.shadowRoot.querySelectorAll('img');
        const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '');
        
        // We expect to find at least one image without alt text (this is the violation we're testing)
        expect(imagesWithoutAlt.length).toBeGreaterThan(0);
    });

    it('contains empty button (accessibility violation)', () => {
        const element = createElement('c-test-accessibility', {
            is: TestAccessibility
        });
        document.body.appendChild(element);

        // Find buttons without text content or accessible labels
        const buttons = element.shadowRoot.querySelectorAll('button');
        const emptyButtons = Array.from(buttons).filter(btn => 
            !btn.textContent.trim() && 
            !btn.getAttribute('aria-label') && 
            !btn.title
        );
        
        // We expect to find at least one empty button (this is the violation we're testing)
        expect(emptyButtons.length).toBeGreaterThan(0);
    });

    it('contains empty heading (accessibility violation)', () => {
        const element = createElement('c-test-accessibility', {
            is: TestAccessibility
        });
        document.body.appendChild(element);

        // Find headings without content
        const headings = element.shadowRoot.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const emptyHeadings = Array.from(headings).filter(heading => 
            !heading.textContent.trim()
        );
        
        // We expect to find at least one empty heading (this is the violation we're testing)
        expect(emptyHeadings.length).toBeGreaterThan(0);
    });

    it('handles click events for demonstration', () => {
        const element = createElement('c-test-accessibility', {
            is: TestAccessibility
        });
        document.body.appendChild(element);

        // Test the intentionally inaccessible div click
        const fakeButton = element.shadowRoot.querySelector('.fake-button');
        expect(fakeButton).toBeTruthy();
        
        // This element acts like a button but is not accessible
        // In a real application, this would be flagged as an accessibility violation
    });
});