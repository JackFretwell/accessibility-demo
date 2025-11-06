import { createElement } from 'lwc';
import AccessibilityDemo from 'c/accessibilityDemo';

describe('c-accessibility-demo', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders correctly', () => {
        // Create element
        const element = createElement('c-accessibility-demo', {
            is: AccessibilityDemo
        });
        document.body.appendChild(element);

        // Verify the component renders
        expect(element).toBeTruthy();
        
        // Check for the main heading
        const heading = element.shadowRoot.querySelector('h1');
        expect(heading).toBeTruthy();
        expect(heading.textContent).toContain('Accessibility Demo');
    });

    it('has accessible button with proper label', () => {
        const element = createElement('c-accessibility-demo', {
            is: AccessibilityDemo
        });
        document.body.appendChild(element);

        // Check for accessible button
        const button = element.shadowRoot.querySelector('lightning-button');
        expect(button).toBeTruthy();
        expect(button.label).toBeTruthy();
        expect(button.label.length).toBeGreaterThan(0);
    });

    it('has images with alt text', () => {
        const element = createElement('c-accessibility-demo', {
            is: AccessibilityDemo
        });
        document.body.appendChild(element);

        // Check that images have alt attributes
        const images = element.shadowRoot.querySelectorAll('img');
        images.forEach(img => {
            expect(img.alt).toBeTruthy();
            expect(img.alt.length).toBeGreaterThan(0);
        });
    });

    it('has properly labeled form inputs', () => {
        const element = createElement('c-accessibility-demo', {
            is: AccessibilityDemo
        });
        document.body.appendChild(element);

        // Check that inputs have associated labels
        const inputs = element.shadowRoot.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.id) {
                const label = element.shadowRoot.querySelector(`label[for="${input.id}"]`);
                expect(label).toBeTruthy();
            }
        });
    });

    it('handles button clicks correctly', () => {
        const element = createElement('c-accessibility-demo', {
            is: AccessibilityDemo
        });
        document.body.appendChild(element);

        // Mock the toast event
        const handler = jest.fn();
        element.addEventListener('lightning__showtoast', handler);

        // Click the button
        const button = element.shadowRoot.querySelector('lightning-button');
        button.click();

        // Return a promise to wait for any asynchronous DOM updates
        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
        });
    });

    it('includes test accessibility component', () => {
        const element = createElement('c-accessibility-demo', {
            is: AccessibilityDemo
        });
        document.body.appendChild(element);

        // Check that the test accessibility component is included
        const testComponent = element.shadowRoot.querySelector('c-test-accessibility');
        expect(testComponent).toBeTruthy();
    });
});