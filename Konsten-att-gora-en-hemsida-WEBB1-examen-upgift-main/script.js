// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.getElementById('header');
    const startView = document.getElementById('startView');
    const guideContainer = document.getElementById('guideContainer');
    const headerButtons = document.getElementById('headerButtons');
    const startButtons = document.querySelectorAll('#startButtons .nav-btn');

    // Your guide content for each topic
    const guides = {
        html: {
            title: 'HTML Guide',
            content: '<p><strong>HTML</strong> (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p><p><code>&lt;div&gt;Hello World&lt;/div&gt;</code></p>'
        },
        css: {
            title: 'CSS Guide',
            content: '<p><strong>CSS</strong> (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.</p><p><code>body { background: blue; }</code></p>'
        },
        js: {
            title: 'JavaScript Guide',
            content: '<p><strong>JavaScript</strong> is a programming language that enables interactive web pages. It is an essential part of web applications.</p><p><code>console.log("Hello World");</code></p>'
        }
    };

    // Function to create a header button
    function createHeaderButton(topic) {
        const button = document.createElement('button');
        button.className = 'header-btn';
        button.textContent = topic.toUpperCase();
        button.dataset.topic = topic;
        
        button.addEventListener('click', function() {
            showGuide(topic);
        });
        
        return button;
    }

    // Function to show a guide
    function showGuide(topic) {
        // Hide start view, show header and guide
        startView.classList.add('hidden');
        header.classList.remove('hidden');
        guideContainer.classList.remove('hidden');

        // Clear and repopulate header buttons
        headerButtons.innerHTML = '';
        ['html', 'css', 'js'].forEach(t => {
            headerButtons.appendChild(createHeaderButton(t));
        });

        // Display the selected guide
        const guide = guides[topic];
        guideContainer.innerHTML = `
            <div class="guide-card">
                <h2>${guide.title}</h2>
                ${guide.content}
                <p style="margin-top: 20px; font-style: italic; color: #999;">
                    Buttons moved to header — click them to switch guides
                </p>
            </div>
        `;
    }

    // Add click handlers to start buttons
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.dataset.topic;
            showGuide(topic);
        });
    });
});