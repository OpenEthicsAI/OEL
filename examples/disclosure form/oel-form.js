/* 
Open Ethics Label Form Integration
https://openethics.ai
(c) 2024 Open Ethics Initiative


Purpose:
This script allows integration of the Open Ethics Label Form into your community platform.

Example:
Make sure you substitute the partner key and partner alias that Open Ethics provided to you.
<body>

        <!-- CONTENT -->

        <div class="form"></div>

        <script src="https://openethics.ai/src/js/oel-form.js"></script>
        <script>
            // Call the initialization function with your key, alias, and target element selector
            initializeOpenEthicsLabelForm("2c810801-2dbe-4efd-9d08-0367c2b46420", "test", ".form");
        </script>
</body>


*/
function initializeOpenEthicsLabelForm(partner_key, partner_alias, selector) {

    // Get partner from query parameters or use default alias
    const alias = partner_alias || "test";
    const key = partner_key || "2c810801-2dbe-4efd-9d08-0367c2b46420";

    // Create div element
    var container = document.createElement('div');
    container.id = 'oel_container';

    // Create iframe element
    var iframe = document.createElement('iframe');
    iframe.setAttribute('seamless', '');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('src', `https://openethics.ai/label/generate-custom/?partner=${alias}&key=${key}`);
    iframe.setAttribute('frameborder', '0');
    iframe.id = 'oe_label_generator';
    iframe.title = 'Generate Open Ethics Label';
    iframe.style.border = 'none';
    iframe.style.width = '100%';

    // Add backup paragraph content
    iframe.innerHTML = `<p>Visit <a href="https://openethics.ai/label/generate/?partner=${alias}&key=${key}">this page</a> to generate the Open Ethics Label</p>`;

    // Append iframe to the container
    container.appendChild(iframe);

    // Append the container to the specified DOM element
    var targetElement = document.querySelector(selector);
    if (targetElement) {
        targetElement.appendChild(container);
    } else {
        console.error('Target element not found:', selector);
    }

    // Adjust the iframe height based on its content
    window.addEventListener('message', function(event) {
        if (event.data.height) {
            var oeGeneratorIframe = document.getElementById('oe_label_generator');
            if (oeGeneratorIframe) {
                oeGeneratorIframe.style.height = (event.data.height + 200) + 'px';
            }
        }
    });
}
