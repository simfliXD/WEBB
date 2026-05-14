// ===== TESTA HTML LIVE =====
const htmlEditor = document.querySelector("[data-html-editor]");
const htmlPreview = document.querySelector("[data-html-preview]");

if (htmlEditor && htmlPreview) {
	const syncHtmlPreview = () => {
		htmlPreview.srcdoc = htmlEditor.textContent.trim();
	};

	syncHtmlPreview();
	htmlEditor.addEventListener("input", syncHtmlPreview); // Synka på input
}