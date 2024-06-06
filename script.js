const fonts = [
    'Archivo', 'Barlow', 'Cabin', 'Comfortaa', 'EB Garamond', 'Figtree', 'Fira Sans', 'Josefin Sans', 'Lato',
    'Montserrat', 'Nunito', 'Open Sans', 'Oswald', 'Playfair Display', 'Poppins', 'PT Sans', 'Quicksand',
    'Raleway', 'Red Hat Display', 'Roboto', 'Sora', 'Space Grotesk', 'Syne', 'Tenor Sans', 'Ubuntu', 'Urbanist', 'Work Sans'
];

document.addEventListener('DOMContentLoaded', function() {
    appendFontOptions();

    const form = document.getElementById('input-form');
    const resultContainer = document.getElementById('result-container');
    const codeBlock = document.getElementById('codeblock');
    const clearResults = document.getElementById('clear-buttons');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const resultBtn = generateButton();
        
        resultContainer.innerHTML = ''; // Clear previous buttons
        resultContainer.appendChild(resultBtn);
        clearResults.style.display = 'block';
    
        const htmlCode = generateButtonHTML(resultBtn);
        const cssCode = generateButtonCSS(resultBtn);
        
        codeBlock.innerHTML = `
           <div class="banner">
                <span><button class="html-tab" id="html-tab">HTML</button></span><span><button class="css-tab" id="css-tab">CSS</button></span>
            </div>
            <pre id="html-code" class="html"><code>${htmlCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            <pre id="css-code" style="display: none;" class="css"><code>${cssCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        `;
        codeBlock.style.display = 'block';
        const results = document.getElementById('results');
        results.style.display = 'flex';
    
        const htmlTab = document.getElementById('html-tab');
        const cssTab = document.getElementById('css-tab');
        const htmlCodeElement = document.getElementById('html-code');
        const cssCodeElement = document.getElementById('css-code');
    
        htmlTab.addEventListener('click', function() {
            cssCodeElement.style.display = 'none';
            htmlCodeElement.style.display = 'block';
        });
    
        cssTab.addEventListener('click', function() {
            codeBlock.style.paddingTop = '0';
            htmlCodeElement.style.display = 'none';
            cssCodeElement.style.display = 'block';
        });
    });

    clearResults.addEventListener('click', function() {
        resultContainer.innerHTML = '';
        codeBlock.style.display = 'none';
        clearResults.style.display = 'none';
    });
});

function appendFontOptions() {
    const fontField = document.getElementById('font');
    fonts.forEach(font => {
        const fontOption = document.createElement('option');
        fontOption.classList.add('font-option');
        fontOption.style.fontFamily = font;
        fontOption.value = font;
        fontOption.textContent = font;
        fontField.appendChild(fontOption);
    });
}

function generateButton() {
    const fillColor = document.getElementById('fill-color').value;
    const textColor = document.getElementById('text-color').value;
    const shape = document.getElementById('shape').value;
    const paddingSize = document.getElementById('padding').value;
    const font = document.getElementById('font').value;
    const fontSize = document.getElementById('font-size').value;
    const fontWeight = document.getElementById('font-weight').value;
    const borderWeight = document.getElementById('border-weight').value;
    const borderColor = document.getElementById('border-color').value;
    const label = document.getElementById('button-label').value;

    const resultBtn = document.createElement('button');
    resultBtn.style.backgroundColor = fillColor;
    resultBtn.style.color = textColor;
    resultBtn.style.fontFamily = font;
    resultBtn.style.fontSize = `${fontSize}px`;
    resultBtn.style.fontWeight = fontWeight;
    resultBtn.style.border = `${borderWeight}px solid ${borderColor}`;
    resultBtn.textContent = label;

    if (shape === 'pill') {
        const calculatedRadius = (fontSize * 3) / 2;
        resultBtn.style.borderRadius = `${calculatedRadius}px`;
    } else if (shape === 'round') {
        if (fontSize < 12) {
            resultBtn.style.borderRadius = '0.375rem';
        } else if (fontSize < 20) {
            resultBtn.style.borderRadius = '0.5rem';
        } else if (fontSize < 24) {
            resultBtn.style.borderRadius = '0.625rem';
        } else {
            resultBtn.style.borderRadius = '0.75rem';
        }
    } else {
        resultBtn.style.borderRadius = '0';
    }

    if (paddingSize === 'none') {
        resultBtn.style.padding = '0';
    } else if (paddingSize === 'small') {
        resultBtn.style.padding = '0.25rem 0.5rem';
    } else if (paddingSize === 'medium') {
        resultBtn.style.padding = '0.5rem 0.75rem';
    } else if (paddingSize === 'large') {
        resultBtn.style.padding = '0.75rem 1rem';
    } else {
        resultBtn.style.padding = '1rem 1.375rem';
    }

    if (font === "") {
        resultBtn.style.fontFamily = 'Inter';
    }

    return resultBtn;
}

function generateButtonHTML(button) {
    return button.outerHTML.replace(/ style="[^"]*"/g, ''); // Remove inline styles
}

function generateButtonCSS(button) {
    return `
button {
    background-color: ${button.style.backgroundColor};
    color: ${button.style.color};
    font-family: ${button.style.fontFamily};
    font-size: ${button.style.fontSize};
    font-weight: ${button.style.fontWeight};
    border: ${button.style.border};
    border-radius: ${button.style.borderRadius};
    padding: ${button.style.padding};
}`;
}
